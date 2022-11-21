import {
  ActionIcon,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Tooltip,
  Paper,
  Stack,
  Text,
  Title,
  Select,
  Skeleton,
  CopyButton,
} from "@mantine/core";
import {
  Check,
  DeviceTablet,
  FacebookLogo,
  Globe,
  InstagramLogo,
  Plus,
  Rows,
  ShareNetwork,
  TwitterLogo,
} from "phosphor-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HeadFootLayout } from "../components/Layout";
import useMainStore from "../store/mainStore";
import DashboardTable from "../components/Dashboard/DashboardTable";
import { EditImageModal } from "../components/Dashboard/EditImageModal";
import { EditPageModal } from "../components/Dashboard/EditPageModal";
import { useToggle } from "@mantine/hooks";
import CustomActionIcon from "../components/CustomActionIcon";
import EditProductModal from "../components/Dashboard/EditProductModal";

export default function Dashboard() {
  let { shop_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [avatarLast, setAvatarLast] = useState("");
  const [editImageModalOpen, setEditImageModalOpen] = useState(false);
  const [editPageModalOpen, setEditPageModalOpen] = useState(false);
  const [refreshProductList, setRefreshProductList] = useState(false);

  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [tableView, setTableView] = useToggle(["compact", "expand"]);

  const fetchShop = useMainStore((state) => state.fetchShop);
  const isDesktop = useMainStore((state) => state.isDesktop);
  const userId = useMainStore((state) => state.user);

  const [shopInfo, setShopInfo] = useState(null);

  const handleEditProductModalOpen = (product) => {
    setActiveProduct(product);
    setEditProductModalOpen(true);
  };

  useEffect(() => {
    refreshShopInfo();
  }, []);

  useEffect(() => {
    if (shopInfo) {
      var date_test = dateToTicks(new Date(Date.parse(shopInfo.updated_at)));
      setAvatarLast(date_test);
    }
  }, [shopInfo]);

  function dateToTicks(date) {
    const epochOffset = 621355968000000000;
    const ticksPerMillisecond = 10000;

    const ticks = date.getTime() * ticksPerMillisecond + epochOffset;

    return ticks;
  }

  const refreshShopInfo = () => {
    setLoading(true);
    fetchShop(shop_id).then((data) => {
      setShopInfo(data.data);
      setLoading(false);
    });
  };

  return (
    <HeadFootLayout>
      <LoadingOverlay
        visible={loading}
        overlayBlur={2}
        radius="xs"
        transitionDuration={250}
      />
      {shopInfo !== null && (
        <Container size="lg" my={16}>
          <Group
            align={isDesktop ? "flex-start" : "center"}
            sx={{ flexDirection: !isDesktop && "column" }}
            noWrap
          >
            <Skeleton width={200} height={200} visible={loading}>
              <img
                src={
                  import.meta.env.VITE_SUPABASE_PUBLIC_URL +
                  "/" +
                  shopInfo.shop_avatar_url +
                  "?lastmod=" +
                  avatarLast
                }
                alt="Shop Image"
                style={{
                  width: 200,
                  height: "auto",
                  borderRadius: 8,
                }}
              />
            </Skeleton>
            <Stack spacing={4} align={!isDesktop && "center"}>
              <Title order={4}>{shopInfo.shop_name}</Title>
              <Text sx={{ maxWidth: 500 }} align={!isDesktop && "center"}>
                {shopInfo.shop_description}
              </Text>
            </Stack>
          </Group>
          <Paper shadow="sm" p="md" mt="md">
            <Group position={isDesktop ? "apart" : "center"}>
              <Group>
                <Button onClick={() => setEditPageModalOpen(true)}>
                  Edit Shop
                </Button>
                <Button onClick={() => setEditImageModalOpen(true)}>
                  Edit Image
                </Button>
              </Group>
              <Group spacing={8}>
                <CustomLink website={shopInfo.shop_website} tooltip="Website">
                  <Globe size={16} />
                </CustomLink>
                <CustomLink
                  website={shopInfo.shop_instagram}
                  tooltip="Instagram"
                >
                  <InstagramLogo size={16} />
                </CustomLink>
                <CustomLink website={shopInfo.shop_facebook} tooltip="Facebook">
                  <FacebookLogo size={16} />
                </CustomLink>
                <CustomLink website={shopInfo.shop_twitter} tooltip="Twitter">
                  <TwitterLogo size={16} />
                </CustomLink>
                <CopyButton
                  value={`${import.meta.env.VITE_APP_ADDRESS}/shop/${shop_id}`}
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="right"
                    >
                      <ActionIcon
                        variant="filled"
                        sx={{ width: 32, height: 32, transition: "0.15s ease" }}
                        color={copied ? "green" : "yellow"}
                        onClick={copy}
                        tooltip="Share"
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <ShareNetwork size={16} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
          </Paper>
          <Paper shadow="sm" p="md" mt="md">
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
              </Group>
              <Group>
                <Tooltip
                  position="bottom"
                  label={
                    tableView === "compact" ? "Expaned View" : "Compact View"
                  }
                  offset={8}
                >
                  <CustomActionIcon onClick={() => setTableView()}>
                    {tableView === "compact" ? (
                      <DeviceTablet size={16} />
                    ) : (
                      <Rows size={16} />
                    )}
                  </CustomActionIcon>
                </Tooltip>
              </Group>
              <DashboardTable
                refreshProductList={refreshProductList}
                tableView={tableView}
                shopId={shop_id}
                handleEditProductModalOpen={handleEditProductModalOpen}
              />
            </Stack>
          </Paper>
          <EditImageModal
            editImageModalOpen={editImageModalOpen}
            setEditImageModalOpen={setEditImageModalOpen}
            shopInfo={shopInfo}
            refreshShopInfo={refreshShopInfo}
          />
          <EditPageModal
            editPageModalOpen={editPageModalOpen}
            setEditPageModalOpen={setEditPageModalOpen}
            shopInfo={shopInfo}
            refreshShopInfo={refreshShopInfo}
          />
          <EditProductModal
            editProductModalOpen={editProductModalOpen}
            setEditProductModalOpen={setEditProductModalOpen}
            productInfo={activeProduct}
            setRefreshProductList={setRefreshProductList}
          />
        </Container>
      )}
    </HeadFootLayout>
  );
}

export function CustomLink({ website, tooltip, children }) {
  return (
    website !== null &&
    website !== "" && (
      <Tooltip position="bottom" label={tooltip} offset={8}>
        <CustomActionIcon
          variant="outline"
          component="a"
          href={website}
          target="_blank"
        >
          {children}
        </CustomActionIcon>
      </Tooltip>
    )
  );
}
