import React, { useEffect, useState } from "react"
import {
  Card,
  Image,
  Skeleton,
  Text,
  Title,
  Group,
  ActionIcon,
  Stack,
  Button,
} from "@mantine/core"
import { getImageUrl } from "../../utils/utilFunctions"
import useCharacterStore from "../../store/characterStore"
import { supabase } from "../../utils/supabaseClient"
import { Trash } from "phosphor-react"

export default function OutfitCard({ product_id, removeFromCart }) {
  const updateTexture = useCharacterStore((state) => state.updateTexture)
  const [productDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = async () => {
    let pd = await supabase
      .from("products")
      .select("*")
      .eq("product_id", product_id)
    setProductDetails(pd.data[0])
  }
  return (
    <Skeleton
      sx={{ height: loading && 275, width: 200 }}
      p={{ base: 4, sm: 8 }}
      radius={4}
      visible={loading}
    >
      <Stack>
        <Card
          sx={{
            width: 200,
            height: 400,
            cursor: "pointer",
            transition: "0.1s ease-out",
            "&:hover": {
              transform: "translate(0px, -2px)",
              boxShadow: "0 2px 8px rgb(0 0 0 / 32%)",
            },
          }}
          onClick={() =>
            updateTexture("top", getImageUrl(productDetails.product_texture))
          }
          withBorder
          shadow="sm"
          radius={4}
        >
          <Card.Section>
            <Image
              src={getImageUrl(productDetails?.product_thumbnail)}
              onLoad={() => setLoading(false)}
              fit="cover"
              alt={productDetails?.product_name}
            />
          </Card.Section>

          <Text weight={500} mt="sm" size="xs">
            {productDetails?.product_brand}
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
            {productDetails?.product_name}
          </Title>

          <Group spacing="xs" mt="sm" noWrap align="center">
            <Text size="md" weight={700}>
              ₹{productDetails?.product_price}
            </Text>
            {productDetails?.product_discount !== 0 && (
              <Group spacing={4} align="center">
                <Text strikethrough color="dimmed">
                  ₹{productDetails?.product_mrp}
                </Text>
                <Text color="orange">
                  {productDetails?.product_discount}% off
                </Text>
              </Group>
            )}
          </Group>
        </Card>
        <Button
          variant="filled"
          color="red"
          sx={{
            transition: "0.15s ease",
          }}
          tooltip="Remove"
          onClick={() => removeFromCart(product_id)}
        >
          <Trash size={16} />
        </Button>
      </Stack>
    </Skeleton>
  )
}
