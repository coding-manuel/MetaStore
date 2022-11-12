import {
  Anchor,
  Box,
  Container,
  Group,
  LoadingOverlay,
  MediaQuery,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeadFootLayout } from "../components/Layout";
import useMainStore from "../store/mainStore";
import { supabase } from "../utils/supabaseClient";

export default function Dashboard() {
  let { shop_id } = useParams();
  const fetchShop = useMainStore((state) => state.fetchShop);
  const isDesktop = useMainStore((state) => state.isDesktop);
  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    fetchShop(shop_id).then((data) => setShopInfo(data.data));
  }, []);

  return (
    <HeadFootLayout>
      <LoadingOverlay
        visible={shopInfo === null}
        overlayBlur={2}
        radius="xs"
        transitionDuration={250}
      />
      {shopInfo !== null && (
        <Container size="lg" my={16}>
          <Group
            align={isDesktop ? "flex-start" : "center"}
            sx={{ flexDirection: !isDesktop && "column" }}
          >
            <img
              src={`https://iknmongsmzpgrwawsrei.supabase.co/storage/v1/object/public/avatars/${shopInfo.shop_avatar_url}`}
              alt="Shop Image"
              style={{ width: 200, height: "auto", borderRadius: 8 }}
            />
            <Stack spacing={0}>
              <Title order={4}>{shopInfo.shop_name}</Title>
              <Anchor href={shopInfo.shop_website} target="_blank">
                {shopInfo.shop_website}
              </Anchor>
            </Stack>
          </Group>
        </Container>
      )}
    </HeadFootLayout>
  );
}
