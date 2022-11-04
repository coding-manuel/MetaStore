import React from "react";
import { Group } from "@mantine/core";
import OutfitCard from "./OutfitCard";

export default function OutfitSelector() {
  const items = [
    {
      name: "Black T-shirt",
      path: "/src/assets/black.png",
      img: "src/assets/black-product.jpg",
    },
    {
      name: "Green T-shirt",
      path: "/src/assets/green.png",
      img: "src/assets/green-product.jpg",
    },
    {
      name: "Orange T-shirt",
      path: "/src/assets/orange.png",
      img: "src/assets/orange-product.jpg",
    },
    {
      name: "Red T-shirt",
      path: "/src/assets/red.png",
      img: "src/assets/red-product.jpg",
    },
    {
      name: "New Energy T-shirt",
      path: "/src/assets/newenergy.png",
      img: "src/assets/newenergy-product.png",
    },
  ];
  return (
    <Group position="center" spacing={16}>
      {items.map((item) => {
        return (
          <OutfitCard
            type="top"
            name={item.name}
            path={item.path}
            img={item.img}
          />
        );
      })}
    </Group>
  );
}
