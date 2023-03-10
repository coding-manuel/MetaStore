import React from "react"
import { Group, Text, Title } from "@mantine/core"
import OutfitCard from "./OutfitCard"
import useMainStore from "../../store/mainStore"

export default function OutfitSelector() {
  const cart = useMainStore((state) => state.cart)
  const addToCart = useMainStore((state) => state.addToCart)
  const removeFromCart = useMainStore((state) => state.removeFromCart)
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
      path: "https://f004.backblazeb2.com/file/metastore-product-images/ae755f9c-d3a8-40fd-64c4-733ad458a78a/c7ad437a-e16f-dff7-7907-77aef273dddb-texture-img",
      img: "https://f004.backblazeb2.com/file/metastore-product-images/ae755f9c-d3a8-40fd-64c4-733ad458a78a/c7ad437a-e16f-dff7-7907-77aef273dddb-texture-img",
    },
  ]
  return (
    <Group position="center" spacing={16}>
      {!cart.length && <Title order={4}>Nothing in Bag</Title>}
      {cart.map((item) => {
        return (
          <OutfitCard
            type="top"
            product_id={item}
            removeFromCart={removeFromCart}
          />
        )
      })}
    </Group>
  )
}
