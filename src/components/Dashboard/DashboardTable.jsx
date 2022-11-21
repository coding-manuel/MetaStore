import { ActionIcon, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { ArrowSquareOut, NotePencil, Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import CustomActionIcon from "../CustomActionIcon";

export default function DashboardTable({
  shopId,
  refreshProductList,
  tableView,
  handleEditProductModalOpen,
}) {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [productsList, setProductsList] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    getProductsList(page);
  }, [refreshProductList]);

  const setNewPage = async (page) => {
    setPage(page);
    await getProductsList(page);
  };

  const getProductsList = async (page) => {
    try {
      setFetching(true);

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;

      const { data, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("shop_id", shopId)
        .range(from, to);

      setProductsList(data);
      setTotalRecords(count);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <DataTable
      withBorder
      borderRadius="md"
      shadow="sm"
      withColumnBorders
      highlightOnHover
      horizontalSpacing="sm"
      noRecordsText="No Products to show"
      records={productsList}
      fetching={fetching}
      totalRecords={totalRecords}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setNewPage(p)}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      idAccessor="product_id"
      columns={[
        {
          accessor: "product_images",
          title: "Image",
          textAlignment: "center",
          render: (record) => (
            <img
              style={{ height: tableView === "compact" ? 50 : 150 }}
              src={
                import.meta.env.VITE_PRODUCTIMG_URL + record.product_images[0]
              }
            />
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
              <CustomActionIcon>
                <ArrowSquareOut size={16} />
              </CustomActionIcon>
              <CustomActionIcon
                onClick={() => handleEditProductModalOpen(product)}
              >
                <NotePencil size={16} />
              </CustomActionIcon>
            </Group>
          ),
        },
      ]}
    />
  );
}
