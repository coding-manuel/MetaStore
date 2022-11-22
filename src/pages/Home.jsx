import {
  Button,
  Group,
  Stack,
  Title,
  Skeleton,
  Container,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeadFootLayout } from "../components/Layout/Layout";
import { ShopCard } from "../components/ShopCard";
import { Carousel } from "@mantine/carousel";
import useMainStore from "../store/mainStore";

export default function Home() {
  return (
    <HeadFootLayout>
      <Container size="lg" my={16}>
        <Stack>
          <Group>
            <Button component={Link} to="/creator">
              Style Yourself
            </Button>
          </Group>
          <PopularShopsComp />
        </Stack>
      </Container>
    </HeadFootLayout>
  );
}

export function PopularShopsComp() {
  const fetchPopularShops = useMainStore((state) => state.fetchPopularShops);
  const [shops, setShops] = useState(null);
  useEffect(() => {
    fetchPopularShops().then((data) => setShops(data.data));
  }, []);
  return (
    <Stack sx={{ width: "100%", heigth: "100%" }}>
      <Title color="white" order={5}>
        Popular Shops
      </Title>
      <Carousel
        styles={{ viewport: { padding: 12 } }}
        slideSize="10%"
        slideGap="md"
        align="start"
      >
        {shops !== null ? (
          <>
            {shops.map((shop) => {
              return <ShopCard shopInfo={shop} />;
            })}
          </>
        ) : (
          <Skeleton visible={shops === null} height={150} />
        )}
      </Carousel>
    </Stack>
  );
}
