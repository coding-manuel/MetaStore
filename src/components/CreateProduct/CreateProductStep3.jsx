import React, { useState } from "react";
import {
  Button,
  Group,
  Stack,
  Title,
  Text,
  AspectRatio,
  SimpleGrid,
  Accordion,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import axios from "axios";
import * as CryptoJS from "crypto-js";

import useMainStore from "../../store/mainStore";
import { supabase } from "../../utils/supabaseClient";
import { Keyboard } from "phosphor-react";

export function CreateProductStep3({ productData, productImages, prevStep }) {
  const [loading, setLoading] = useState(false);
  const shopId = useMainStore((state) => state.shopName);

  const navigate = useNavigate();

  const getUploadDetails = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API_ADDRESS}/uploadurl`);
    return res.data;
  };

  const uploadFile = async (file, product_id, path, data) => {
    const reader = new FileReader();
    reader.onload = function () {
      const hash = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(reader.result));
      // Data hashed. Now perform upload.

      // console.log(`${product_id}/product-img${index}`);

      axios({
        method: "post",
        url: data.uploadUrl,
        headers: {
          "Content-Type": "image/png",
          Authorization: data.authorizationToken,
          "X-Bz-File-Name": path,
          "X-Bz-Content-Sha1": hash,
        },
        data: file,
      });
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const product_id = uuid();
      let imagesPath = [];

      const promises = await productImages.map(async (image, index) => {
        let data = await getUploadDetails();
        let path = `${product_id}/product-img-${index}`;
        imagesPath.push(path);
        await uploadFile(image[0][0], product_id, path, data);
      });

      await Promise.all(promises);

      // create shop page
      const { error } = await supabase.from("products").insert({
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
      });
      navigate(`/dashboard/${shopId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
              <Carousel.Slide>
                <AspectRatio sx={{ minWidth: 250 }} ratio={720 / 1080}>
                  <img
                    style={{ objectFit: "contain" }}
                    src={productImage[1]}
                    alt=""
                  />
                </AspectRatio>
              </Carousel.Slide>
            );
          })}
        </Carousel>
        <Stack spacing={2}>
          <Title order={5}>{productData.product_name}</Title>
          <Text size="xl">{productData.product_brand}</Text>
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
          <Accordion
            radius={8}
            my={16}
            variant="contained"
            defaultValue="customization"
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <Group spacing={8} align="center">
                  Product Details <Keyboard size={18} />
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
  );
}
