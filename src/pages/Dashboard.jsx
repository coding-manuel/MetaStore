import { Container, Group, LoadingOverlay, Stack, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeadFootLayout } from "../components/Layout";
import useMainStore from "../store/mainStore";
import { supabase } from "../utils/supabaseClient";

export default function Dashboard() {
  let { shop_id } = useParams();
  const fetchShop = useMainStore((state) => state.fetchShop);
  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    fetchShop(shop_id).then((data) => setShopInfo(data.data));
    console.log(shopInfo);
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
          <Group align="flex-start" spacing={32}>
            <img
              src={`https://iknmongsmzpgrwawsrei.supabase.co/storage/v1/object/public/avatars/${shopInfo.shop_avatar_url}`}
              alt="Shop Image"
            />
            <Stack>
              <Title order={4}>{shopInfo.shop_name}</Title>
            </Stack>
          </Group>
        </Container>
      )}
    </HeadFootLayout>
  );
}
