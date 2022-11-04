import React from "react";
import { Group } from "@mantine/core";
import OutfitCard from "./OutfitCard";

export default function OutfitSelector() {
  const items = [
    {
      name: "Black T-shirt",
      path: "/src/assets/black.png",
    },
    {
      name: "Green T-shirt",
      path: "/src/assets/green.png",
    },
    {
      name: "Orange T-shirt",
      path: "/src/assets/orange.png",
    },
    {
      name: "Red T-shirt",
      path: "/src/assets/red.png",
    },
  ];
  return (
    <Group position="center" spacing={16}>
      {items.map((item) => {
        return <OutfitCard type="top" name={item.name} path={item.path} />;
      })}
    </Group>
  );
}
