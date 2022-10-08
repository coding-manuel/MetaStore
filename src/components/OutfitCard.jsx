import React from "react";
import { Box, Card, Image, Text, Grid } from "@mantine/core";

export default function OutfitCard() {
  return (
    <Grid.Col span={6}>
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://cdn.shopify.com/s/files/1/1002/7150/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1639657077"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Text weight={500} mt="md" size="sm">
          RRR T-shirt
        </Text>
      </Card>
    </Grid.Col>
  );
}
