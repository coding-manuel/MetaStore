import React, { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Container,
  Stack,
  Title,
  Text,
  TextInput,
  Textarea,
  Box,
  Paper,
  ActionIcon,
  Select,
  Radio,
  NumberInput,
  Popover,
  AspectRatio,
  Flex,
  SimpleGrid,
  Accordion,
  List,
} from "@mantine/core";
import { FootLayout } from "./Layout";
import {
  ProductPictureEditorComp,
  ProductPictureUploadComp,
} from "./AvatarEditorComp";
import { useForm } from "@mantine/form";
import { CurrencyInr, Info, Trash } from "phosphor-react";
import { useBeforeunload } from "react-beforeunload";
import { Carousel } from "@mantine/carousel";
import useMainStore from "../store/mainStore";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [active, setActive] = useState(0);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = () => {
    console.log("less go");
  };

  useBeforeunload(() => "Bruh");

  return (
    <FootLayout>
      <Container sx={{ width: "90%" }} size="sm" pb={16}>
        <Stepper active={active}>
          <Stepper.Step>
            <CreateProductStep1
              active={active}
              prevStep={prevStep}
              nextStep={nextStep}
              formData={stepOneData}
              setFormData={setStepOneData}
            />
          </Stepper.Step>
          <Stepper.Step>
            <CreateProductStep2
              active={active}
              prevStep={prevStep}
              nextStep={nextStep}
              formData={stepTwoData}
              setFormData={setStepTwoData}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          </Stepper.Step>
          <Stepper.Step>
            <CreateProductFinal
              productData={stepTwoData}
              productImages={uploadedImages}
              prevStep={prevStep}
              nextStep={handleSubmit}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </FootLayout>
  );
}

export function CreateProductStep1({
  prevStep,
  nextStep,
  active,
  formData,
  setFormData,
}) {
  const frontEditor = useRef(null);
  const backEditor = useRef(null);
  const [frontImage, setFrontImage] = useState(false);
  const [backImage, setBackImage] = useState(false);

  useEffect(() => {
    if (formData) {
      setFrontImage(formData.frontImage);
      setBackImage(formData.backImage);
    }
  }, []);

  const handleSubmit = () => {
    setFormData({ frontImage: frontImage, backImage: backImage });
    nextStep();
  };

  return (
    <Stack spacing={0}>
      <Text weight={700}>Step 1 of 3</Text>
      <Title order={4}>Upload Images</Title>
      <Group align="flex-start" grow noWrap my={16}>
        <ProductPictureEditorComp
          editor={frontEditor}
          artAccepted={frontImage}
          setArtAccepted={setFrontImage}
          type="Front"
        />
        <ProductPictureEditorComp
          editor={backEditor}
          artAccepted={backImage}
          setArtAccepted={setBackImage}
          type="Back"
        />
      </Group>
      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        <Button disabled={!frontImage || !backImage} onClick={handleSubmit}>
          Next step
        </Button>
      </Group>
    </Stack>
  );
}

export function CreateProductStep2({
  prevStep,
  nextStep,
  active,
  formData,
  setFormData,
  uploadedImages,
  setUploadedImages,
}) {
  const [characterCount, setCharacterCount] = useState(0);
  const [artAccepted, setArtAccepted] = useState(false);

  const productTypes = [
    { value: "tshirt", label: "T-Shirt" },
    { value: "shirt", label: "Shirt" },
    { value: "sweatshirts", label: "Sweatshirts" },
    { value: "jeans", label: "Jeans" },
    { value: "trouser", label: "Trouser" },
    { value: "joggers", label: "Joggers" },
    { value: "shorts", label: "Shorts" },
  ];

  const form = useForm({
    initialValues: {
      product_name: "",
      product_brand: "",
      product_description: "",
      product_type: "",
      product_gender: "",
      product_color: "",
      product_material: "",
      product_mrp: 0,
      product_price: 0,
    },
    validate: {
      product_price: (value, values) =>
        value > values.product_mrp ? "Price cannot be higher than MRP" : null,
    },
  });

  const handleSubmit = (value) => {
    setFormData(value);
    nextStep();
  };

  const handlePrevStep = () => {
    setFormData(form.values);
    prevStep();
  };

  const handleUploadImage = (data) => {
    setUploadedImages((prevState) => [...prevState, data]);
    setArtAccepted(false);
  };

  const handleDelete = (key) => {
    setUploadedImages((prevState) =>
      prevState.filter(function (item) {
        return item[2] !== key;
      })
    );
  };

  useEffect(() => {
    if (formData) {
      form.setValues({
        product_name: formData.product_name,
        product_brand: formData.product_brand,
        product_description: formData.product_description,
        product_type: formData.product_type,
        product_gender: formData.product_gender,
        product_color: formData.product_color,
        product_material: formData.product_material,
        product_mrp: formData.product_mrp,
        product_price: formData.product_price,
      });
    }
  }, []);

  return (
    <Stack spacing={0}>
      <Text weight={700}>Step 2 of 3</Text>
      <Title order={4}>Product Metadata</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing={8} my={16}>
          <Group spacing={4}>
            <Text weight={600}>Product Images</Text>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Info style={{ cursor: "pointer" }} size={16} />
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="sm">Upload upto 7 images</Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Stack>
            {uploadedImages.length <= 7 && (
              <ProductPictureUploadComp
                artAccepted={artAccepted}
                setArtAccepted={setArtAccepted}
                handleUploadImage={handleUploadImage}
              />
            )}
            {uploadedImages.length !== 0 && (
              <Paper
                shadow="sm"
                p="md"
                sx={{ overflowY: "hidden", width: "100%" }}
              >
                <Group noWrap>
                  {uploadedImages.map((img) => {
                    return (
                      <Box key={img[2]} sx={{ position: "relative" }}>
                        <img src={img[1]} style={{ height: 250 }} alt="" />
                        <ActionIcon
                          variant="filled"
                          color="red"
                          sx={{ position: "absolute", right: 0, top: 0 }}
                          onClick={() => handleDelete(img[2])}
                        >
                          <Trash size={16} />
                        </ActionIcon>
                      </Box>
                    );
                  })}
                </Group>
              </Paper>
            )}
          </Stack>
          <TextInput
            label="Product Name"
            required
            {...form.getInputProps("product_name")}
          />
          <TextInput
            label="Product Brand"
            required
            {...form.getInputProps("product_brand")}
          />
          <Stack spacing={8}>
            <Textarea
              label="Product Description"
              maxLength={400}
              onKeyUp={(e) => setCharacterCount(e.target.value.length)}
              autosize
              {...form.getInputProps("product_description")}
            />
            <Text align="right" size="sm" pt={8}>
              {characterCount}/400
            </Text>
          </Stack>
          <Select
            required
            label="Product Type"
            searchable
            data={productTypes}
            {...form.getInputProps("product_type")}
          />
          <Radio.Group
            name="Gender"
            label="Gender"
            required
            withAsterisk
            {...form.getInputProps("product_gender")}
          >
            <Radio value="Male" label="Male" />
            <Radio value="Female" label="Female" />
            <Radio value="Unisex" label="Unisex" />
          </Radio.Group>
          <TextInput
            required
            label="Product Color"
            {...form.getInputProps("product_color")}
          />
          <TextInput
            required
            label="Product Material"
            {...form.getInputProps("product_material")}
          />
          <Group align="flex-start" grow>
            <NumberInput
              required
              label="Product MRP"
              hideControls
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              icon={<CurrencyInr size={16} />}
              {...form.getInputProps("product_mrp")}
            />
            <NumberInput
              required
              label="Product Price"
              hideControls
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              icon={<CurrencyInr size={16} />}
              {...form.getInputProps("product_price")}
            />
          </Group>
        </Stack>
        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button type="none" variant="default" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button type="submit">Finalise Listing</Button>
        </Group>
      </form>
    </Stack>
  );
}

export function CreateProductFinal({
  productData,
  productImages,
  prevStep,
  nextStep,
}) {
  const [loading, setLoading] = useState(false);
  const shopId = useMainStore((state) => state.shopName);

  const navigate = useNavigate();

  const calculateDiscount = () => {
    const x = Math.floor(
      ((productData.product_mrp - productData.product_price) /
        productData.product_mrp) *
        100
    );
    return x;
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      //create shop page
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
                  <img src={productImage[1]} alt="" />
                </AspectRatio>
              </Carousel.Slide>
            );
          })}
        </Carousel>
        <Stack spacing={0}>
          <Title order={5}>{productData.product_name}</Title>
          <Text>{productData.product_brand}</Text>
          <Text mt={16} size={28} weight={700}>
            ₹{productData.product_price}
          </Text>
          <Group spacing={4} align="center">
            <Text size="lg" strikethrough color="dimmed">
              ₹{productData.product_mrp}
            </Text>
            <Text size={16} color="orange">
              {calculateDiscount()}% off
            </Text>
          </Group>
          <Accordion
            radius={8}
            my={16}
            variant="contained"
            defaultValue="customization"
          >
            <Accordion.Item value="customization">
              <Accordion.Control>Product Details</Accordion.Control>
              <Accordion.Panel>
                <Stack spacing={4}>
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
        <Button type="none" variant="default" onClick={prevStep}>
          Edit Listing
        </Button>
        <Button loading={loading} onClick={handleSubmit}>
          Submit Product
        </Button>
      </Group>
    </Stack>
  );
}
