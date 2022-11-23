import React, { useState } from "react";
import { Card, Group, Image, Skeleton, Text, Title } from "@mantine/core";
import { getImageUrl } from "../utils/utilFunctions";
import { Link } from "react-router-dom";

export default function ProductCard({ product, shopData }) {
  const [loading, setLoading] = useState(true);

  return (
    <Skeleton
      sx={{ minHeight: loading && 350 }}
      p={{ base: 4, sm: 8 }}
      radius={4}
      visible={loading}
    >
      <Card
        sx={{
          cursor: "pointer",
          transition: "0.1s ease-out",
          "&:hover": {
            transform: "translate(0px, -2px)",
            boxShadow:
              "0 3px 12px rgb(0 0 0 / 19%), 0 3px 4px rgb(0 0 0 / 22%)",
          },
        }}
        withBorder
        component={Link}
        to={`/product/${shopData.shop_name}/${product.product_id}`}
        shadow="sm"
        maxWidth={{ base: "100%", xs: 250 }}
        radius={4}
      >
        <Card.Section>
          <Image
            src={getImageUrl(product.product_thumbnail)}
            onLoad={() => setLoading(false)}
            fit="cover"
            alt={product.product_name}
          />
        </Card.Section>

        <Text weight={500} mt="sm" size="xs">
          {product.product_brand}
        </Text>
        <Title
          order={6}
          sx={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.product_name}
        </Title>

        <Group spacing="xs" mt="sm" noWrap align="center">
          <Text size="md" weight={700}>
            ₹{product.product_price}
          </Text>
          {product.product_discount !== 0 && (
            <Group spacing={4} align="center">
              <Text strikethrough color="dimmed">
                ₹{product.product_mrp}
              </Text>
              <Text color="orange">{product.product_discount}% off</Text>
            </Group>
          )}
        </Group>
      </Card>
    </Skeleton>
  );
}
