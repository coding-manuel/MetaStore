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
} from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import { useNavigate } from "react-router-dom"
import uuid from "react-uuid"
import { Article } from "phosphor-react"

import useMainStore from "../../store/mainStore"
import { supabase } from "../../utils/supabaseClient"
import { getUploadDetails, uploadFile } from "../../utils/ImageFunctions"

export function CreateProductStep3({
  productData,
  productImages,
  sizeData,
  prevStep,
  productTexture,
}) {
  const [loading, setLoading] = useState(false)
  const shopId = useMainStore((state) => state.shopName)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const product_id = uuid()
      let imagesPath = []

      const promises = await productImages.map(async (image, index) => {
        let path = `${product_id}/${uuid()}-product-img`
        imagesPath.push(path)
        let data = await getUploadDetails()
        await uploadFile(image[0][0], product_id, path, data)
      })

      await Promise.all(promises)

      let texpath = `${product_id}/${uuid()}-texture-img`
      let data = await getUploadDetails()
      await uploadFile(productTexture, product_id, texpath, data)

      // create shop page
      const { error } = await supabase.from("products").insert({
        product_id: product_id,
        shop_id: shopId,
        product_name: productData.product_name,
        product_brand: productData.product_brand,
        product_description: productData.product_description,
        product_type: productData.product_type,
        product_gender: productData.product_gender,
        product_color: productData.product_color,
        product_material: productData.product_material,
        product_mrp: productData.product_mrp,
        product_price: productData.product_price,
        product_discount: productData.product_discount,
        product_sku: productData.product_sku,
        product_images: imagesPath,
        product_size_available: sizeData,
        product_thumbnail: imagesPath[0],
        product_texture: texpath,
      })

      navigate(`/dashboard/${shopId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Stack spacing={0}>
      <Text weight={700}>Step 3 of 3</Text>
      <Title order={4}>Confirm Listing</Title>
      <SimpleGrid
        my={16}
        cols={2}
        breakpoints={[{ maxWidth: "xs", cols: 1, spacing: "sm" }]}
      >
        <Carousel slideSize="100%" withIndicators align="start" slideGap="md">
          {productImages.map((productImage) => {
            return (
              <Carousel.Slide key={productImage[2]}>
                <AspectRatio sx={{ minWidth: 250 }} ratio={720 / 1080}>
                  <img
                    style={{ objectFit: "contain" }}
                    src={productImage[1]}
                    alt=""
                  />
                </AspectRatio>
              </Carousel.Slide>
            )
          })}
        </Carousel>
        <Stack spacing={2}>
          <Text size="lg" weight={600}>
            {productData.product_brand}
          </Text>
          <Title order={4}>{productData.product_name}</Title>
          <Title mt={{ base: 16, md: 32 }} order={3} weight={700}>
            ₹{productData.product_price}
          </Title>
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
              {sizeData.map((size) => {
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
      <Group position="right" mt="xl">
        <Button
          disabled={loading}
          type="none"
          variant="default"
          onClick={prevStep}
        >
          Edit Listing
        </Button>
        <Button loading={loading} onClick={handleSubmit}>
          Submit Product
        </Button>
      </Group>
    </Stack>
  )
}
