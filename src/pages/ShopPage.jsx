import {
  ActionIcon,
  Container,
  Group,
  LoadingOverlay,
  Tooltip,
  Paper,
  Stack,
  Text,
  Title,
  Skeleton,
  CopyButton,
} from "@mantine/core";
import {
  Check,
  FacebookLogo,
  Globe,
  InstagramLogo,
  ShareNetwork,
  TwitterLogo,
} from "phosphor-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CustomLink } from "../components/CustomActionIcon";
import { HeadFootLayout } from "../components/Layout/Layout";
import useMainStore from "../store/mainStore";

export default function ShopPage() {
  let { shop_id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchShop = useMainStore((state) => state.fetchShopByID);
  const isDesktop = useMainStore((state) => state.isDesktop);
  const userId = useMainStore((state) => state.user);

  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    refreshShopInfo();
  }, []);

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
                  shopInfo.updated_at
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
            <Group spacing={8} position="right">
              <CustomLink website={shopInfo.shop_website} tooltip="Website">
                <Globe size={16} />
              </CustomLink>
              <CustomLink website={shopInfo.shop_instagram} tooltip="Instagram">
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
                    position="bottom"
                    label={copied ? "Copied" : "Copy"}
                    withArrow
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
          </Paper>
        </Container>
      )}
    </HeadFootLayout>
  );
}
