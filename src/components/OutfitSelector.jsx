import React from "react";
import { Group } from "@mantine/core";
import OutfitCard from "./OutfitCard";

export default function OutfitSelector() {
  const items = [
    {
      name: "Black T-shirt",
      path: "/assets/black.png",
      img: "/assets/black-product.jpg",
    },
    {
      name: "Green T-shirt",
      path: "/assets/green.png",
      img: "/assets/green-product.jpg",
    },
    {
      name: "Orange T-shirt",
      path: "/assets/orange.png",
      img: "/assets/orange-product.jpg",
    },
    {
      name: "Red T-shirt",
      path: "/assets/red.png",
      img: "/assets/red-product.jpg",
    },
    {
      name: "New Energy T-shirt",
      path: "/assets/newenergy.png",
      img: "/assets/newenergy-product.png",
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
