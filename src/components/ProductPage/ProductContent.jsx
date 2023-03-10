import React, { useState } from "react"
import {
  Button,
  Group,
  Stack,
  Title,
  Text,
  AspectRatio,
  SimpleGrid,
  Accordion,
  Paper,
  ActionIcon,
} from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import { Article } from "phosphor-react"
import useMainStore from "../../store/mainStore"
import { Link } from "react-router-dom"
import { Bag } from "phosphor-react/dist"

export default function ProductContent({ productImages, productData }) {
  const cart = useMainStore((state) => state.cart)
  const addToCart = useMainStore((state) => state.addToCart)
  const removeFromCart = useMainStore((state) => state.removeFromCart)
  const [loading, setLoading] = useState(false)
  const [inCart, setInCart] = useState(cart.includes(productData.product_id))

  const handleAddToBag = async () => {
    setLoading(true)
    inCart
      ? await removeFromCart(productData.product_id)
      : await addToCart(productData.product_id)
    setInCart(!inCart)
    setLoading(false)
  }

  return (
    <SimpleGrid
      my={16}
      breakpoints={[
        { maxWidth: "xs", cols: 1, spacing: 16 },
        { minWidth: "xs", cols: 2, spacing: 36 },
      ]}
    >
      <Carousel slideSize="100%" withIndicators align="start" slideGap="md">
        {productImages.map((productImage) => {
          return (
            <Carousel.Slide key={productImage}>
              <AspectRatio sx={{ minWidth: 250 }} ratio={720 / 1080}>
                <img
                  style={{ objectFit: "contain" }}
                  src={`${import.meta.env.VITE_PRODUCTIMG_URL}/${productImage}`}
                  alt=""
                />
              </AspectRatio>
            </Carousel.Slide>
          )
        })}
      </Carousel>
      <Stack spacing={2}>
        <Text size="xl" weight={600}>
          {productData.product_brand}
        </Text>
        <Title order={5}>{productData.product_name}</Title>
        <Text mt={{ base: 16, md: 32 }} size={32} weight={700}>
          ₹{productData.product_price}
        </Text>
        {productData.product_discount !== 0 && (
          <Group spacing={4} align="center">
            <Text size="lg" strikethrough color="dimmed">
              ₹{productData.product_mrp}
            </Text>
            <Text size={16} color="orange">
              {productData.product_discount}% off
            </Text>
          </Group>
        )}
        <Stack my={16}>
          <Text size="sm">Sizes Available</Text>
          <Group>
            {productData.product_size_available.map((size) => {
              if (size.available !== 0)
                return (
                  <Paper w={50} shadow="xs" p="md">
                    <Text fw={700} ta="center">
                      {size.sizeName}
                    </Text>
                  </Paper>
                )
            })}
          </Group>
        </Stack>
        <Group grow>
          <Button loading={loading} onClick={handleAddToBag}>
            <Text>{inCart ? "Already in Bag" : "Add to Bag"}</Text>
          </Button>
          <ActionIcon
            variant="filled"
            sx={{ width: 36, height: 36, transition: "0.15s ease" }}
            tooltip="Share"
            component={Link}
            to="/creator"
          >
            <Bag size={16} />
          </ActionIcon>
        </Group>
        <Accordion
          radius={8}
          my={16}
          variant="contained"
          defaultValue="customization"
        >
          <Accordion.Item value="customization">
            <Accordion.Control>
              <Group spacing={8} align="center">
                Product Details <Article size={18} />
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack spacing={8}>
                {productData.product_description && (
                  <Stack spacing={4}>
                    <Text weight={600}>Description:</Text>
                    <Text>{productData.product_description}</Text>
                  </Stack>
                )}
                {productData.product_color && (
                  <Group spacing={4}>
                    <Text weight={600}>Color:</Text>
                    <Text>{productData.product_color}</Text>
                  </Group>
                )}
                {productData.product_gender && (
                  <Group spacing={4}>
                    <Text weight={600}>Gender:</Text>
                    <Text>{productData.product_gender}</Text>
                  </Group>
                )}
                {productData.product_material && (
                  <Group spacing={4}>
                    <Text weight={600}>Material:</Text>
                    <Text>{productData.product_material}</Text>
                  </Group>
                )}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </SimpleGrid>
  )
}
