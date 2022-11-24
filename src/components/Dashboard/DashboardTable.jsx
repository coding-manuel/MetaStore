import React, { useEffect, useState } from "react";
import { Stack, Button, Group, Text, Paper, AspectRatio } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import {
  ArrowSquareOut,
  NotePencil,
  DeviceTablet,
  Plus,
  Rows,
  TrashSimple,
} from "phosphor-react";
import { supabase } from "../../utils/supabaseClient";

import { Link, useNavigate } from "react-router-dom";
import { useToggle } from "@mantine/hooks";
import CustomActionIcon from "../CustomActionIcon";
import { showNotification } from "@mantine/notifications";
import { notificationStyles } from "../../globalStyles";
import { deleteFile } from "../../utils/ImageFunctions";
import { openConfirmModal } from "@mantine/modals";
import { getImageUrl } from "../../utils/utilFunctions";

export default function DashboardTable({
  shopInfo,
  refreshProductList,
  handleEditProductModalOpen,
}) {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [productsList, setProductsList] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(null);

  const [tableView, setTableView] = useToggle(["compact", "expand"]);

  const PAGE_SIZE = 10;

  const navigate = useNavigate();

  const setNewPage = async (page) => {
    setPage(page);
    await getProductsList(page);
  };

  const handleDelete = async () => {
    setFetching(true);
    try {
      const deletePromises = selectedRecords.map(async (rec) => {
        const promises = rec.product_images.map(async (imageUrl) => {
          await deleteFile(imageUrl);
        });

        await Promise.all(promises);
      });

      await Promise.all(deletePromises);

      const promises = selectedRecords.map(async (rec) => {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("product_id", rec.product_id);
      });

      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    } finally {
      await getProductsList(page);
      setSelectedRecords([]);
      showNotification({
        title: "Deleted Succesfully",
        styles: notificationStyles,
      });
      setFetching(false);
    }
  };

  const getProductsList = async (page) => {
    try {
      setFetching(true);

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;

      const { data, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("shop_id", shopInfo.shop_id)
        .range(from, to);

      setProductsList(data);
      setTotalRecords(count);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getProductsList(page);
  }, [refreshProductList]);

  return totalRecords === 0 ? (
    <Stack align="center">
      <Text size={18}>Looks empty Right?</Text>
      <Button
        component={Link}
        to="/dashboard/create_product"
        variant="outline"
        leftIcon={<Plus size={16} />}
      >
        New Product
      </Button>
    </Stack>
  ) : (
    <Stack>
      <Group position="apart">
        <Button
          component={Link}
          to="/dashboard/create_product"
          variant="outline"
          leftIcon={<Plus size={16} />}
        >
          Add Product
        </Button>
        <Button
          variant="outline"
          hidden={selectedRecords.length === 0}
          color="red"
          leftIcon={<TrashSimple size={16} />}
          onClick={() => {
            openConfirmModal({
              title: "Deleting Products",
              children: (
                <Stack>
                  <Text size="sm">Are you sure you want to delete?</Text>
                  <Paper shadow="lg" p="sm" withBorder>
                    {selectedRecords.map((rec) => {
                      return (
                        <Text size="sm" py={2}>
                          {rec.product_brand} - {rec.product_name}
                        </Text>
                      );
                    })}
                  </Paper>
                </Stack>
              ),
              labels: { confirm: "Delete Products", cancel: "Cancel" },
              onConfirm: () => handleDelete(),
            });
          }}
        >
          Delete {selectedRecords.length} Products
        </Button>
      </Group>
      <Group>
        <CustomActionIcon
          tooltip={tableView === "compact" ? "Expanded View" : "Compact View"}
          onClick={() => setTableView()}
        >
          {tableView === "compact" ? (
            <DeviceTablet size={16} />
          ) : (
            <Rows size={16} />
          )}
        </CustomActionIcon>
      </Group>
      <DataTable
        withBorder
        withColumnBorders
        highlightOnHover
        borderRadius={8}
        shadow="xl"
        horizontalSpacing="sm"
        noRecordsText="Nothing to see here"
        records={productsList}
        fetching={fetching}
        totalRecords={totalRecords}
        recordsPerPage={PAGE_SIZE}
        page={totalRecords ? page : null}
        onPageChange={(p) => setNewPage(p)}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        idAccessor="product_id"
        paginationWrapBreakpoint="sm"
        columns={[
          {
            accessor: "product_images",
            title: "Image",
            textAlignment: "center",
            render: (record) => (
              <AspectRatio
                ratio={9 / 16}
                sx={{ width: tableView === "compact" ? 50 : 150 }}
              >
                <img
                  style={{ objectFit: "contain" }}
                  src={getImageUrl(record.product_thumbnail)}
                />
              </AspectRatio>
            ),
          },
          { accessor: "product_name", title: "Name" },
          { accessor: "product_brand", title: "Brand" },
          { accessor: "product_type", title: "Type" },
          { accessor: "product_mrp", title: "MRP" },
          { accessor: "product_price", title: "Price" },
          {
            accessor: "actions",
            title: "Row actions",
            render: (product) => (
              <Group spacing={4} position="center" noWrap>
                <CustomActionIcon
                  onClick={() =>
                    navigate(
                      `/product/${shopInfo.shop_name}/${product.product_id}`
                    )
                  }
                  tooltip="View Product"
                >
                  <ArrowSquareOut size={16} />
                </CustomActionIcon>
                <CustomActionIcon
                  tooltip="Edit Product"
                  onClick={() => handleEditProductModalOpen(product)}
                >
                  <NotePencil size={16} />
                </CustomActionIcon>
              </Group>
            ),
          },
        ]}
      />
    </Stack>
  );
}
