import React from "react";
import { Card, Image, Text } from "@mantine/core";
import useCharacterStore from "../store/characterStore";

export default function OutfitCard({ type, name, path, img }) {
  const updateTexture = useCharacterStore((state) => state.updateTexture);
  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "0.1s ease-out",
        border: "1px solid #5e5e5e5e",
        "&:hover": {
          border: "1px solid transparent",
          transform: "translate(0px, -2px)",
          boxShadow: "0 2px 8px rgb(0 0 0 / 32%)",
        },
      }}
      shadow="sm"
      radius="md"
      onClick={() => updateTexture(type, path)}
    >
      <Card.Section>
        <Image src={img} fit="cover" height={160} width={140} alt="Norway" />
      </Card.Section>

      <Text weight={500} mt="md" size="sm">
        {name}
      </Text>
    </Card>
  );
}
