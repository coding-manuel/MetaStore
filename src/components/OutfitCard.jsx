import React from "react";
import { Card, Image, Text } from "@mantine/core";
import useCharacterStore from "../store/characterStore";

export default function OutfitCard({ type, name, path }) {
  const updateTexture = useCharacterStore((state) => state.updateTexture);
  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "0.1s ease-out",
        "&:hover": {
          transform: "translate(0px, -2px)",
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.5), 0 10px 10px rgba(0,0,0,0.22)",
        },
      }}
      shadow="sm"
      radius="md"
      withBorder
      onClick={() => updateTexture(type, path)}
    >
      <Card.Section>
        <Image
          src="https://cdn.shopify.com/s/files/1/1002/7150/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1639657077"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Text weight={500} mt="md" size="sm">
        {name}
      </Text>
    </Card>
  );
}
