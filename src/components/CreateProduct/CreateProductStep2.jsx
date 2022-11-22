import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  Stack,
  Title,
  Text,
  TextInput,
  Textarea,
  Select,
  Radio,
  NumberInput,
  Popover,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrencyInr, Info } from "phosphor-react";
import { showNotification } from "@mantine/notifications";

import ImageDragDrop from "./ImageDragDrop";
import { ProductPictureUploadComp } from "../AvatarEditorComp";
import { notificationStyles } from "../../globalStyles";

export function CreateProductStep2({
  prevStep,
  nextStep,
  formData,
  setFormData,
  uploadedImages,
  setUploadedImages,
  editProduct,
  handleEditSubmit,
  setDeletedImages,
  finalLoading,
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
      product_sku: "",
      product_brand: "",
      product_description: "",
      product_type: "",
      product_gender: "",
      product_color: "",
      product_material: "",
      product_mrp: "",
      product_price: "",
      product_discount: "",
    },
    validateInputOnChange: ["product_price", "product_mrp"],
    validate: {
      product_price: (value, values) =>
        value > values.product_mrp ? "Price cannot be higher than MRP" : null,
      product_mrp: (value, values) =>
        value < values.product_price ? "Price cannot be higher than MRP" : null,
    },
  });

  const handleSubmit = (value) => {
    value.product_discount = calculateDiscount();
    if (uploadedImages.length === 0) {
      showNotification({
        title: "Whoops, you forgot to put the pictures",
        message: "Customers would love to see the products!",
        styles: notificationStyles,
      });
      return;
    }
    if (editProduct) {
      handleEditSubmit(value);
    } else {
      setFormData(value);
      nextStep(value);
    }
  };

  const handlePrevStep = () => {
    setFormData(form.values);
    prevStep();
  };

  const handleUploadImage = (data) => {
    if (data.length + uploadedImages.length > 7) {
      showNotification({
        title: "More than 7 files are not allowed",
        styles: notificationStyles,
      });
    } else {
      setUploadedImages((prevState) => [...prevState, ...data]);
      setArtAccepted(false);
    }
  };

  const calculateDiscount = () => {
    const x = Math.ceil(
      ((form.values.product_mrp - form.values.product_price) /
        form.values.product_mrp) *
        100
    );
    return x;
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
        product_discount: formData.product_discount,
        product_sku: formData.product_sku,
      });
    }
  }, []);

  return (
    <Stack spacing={0}>
      {!editProduct && (
        <>
          <Text weight={700}>Step 2 of 3</Text>
          <Title order={4}>Product Metadata</Title>
        </>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing={16} my={16}>
          <Group spacing={4}>
            <Text weight={600}>Product Images</Text>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Info style={{ cursor: "pointer" }} size={16} />
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="sm">
                  Upload upto 7 images
                  <br /> First Image will be used as the thumbnail
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Stack>
            {uploadedImages.length < 7 && (
              <ProductPictureUploadComp
                artAccepted={artAccepted}
                setArtAccepted={setArtAccepted}
                handleUploadImage={handleUploadImage}
              />
            )}
            <ImageDragDrop
              setDeletedImages={setDeletedImages}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          </Stack>
          <TextInput
            label="Product SKU"
            {...form.getInputProps("product_sku")}
          />
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
            <TextInput
              required
              label="Discount"
              value={calculateDiscount() + "%"}
              disabled
            />
          </Group>
        </Stack>
        <Group position="right" mt="xl">
          {!editProduct ? (
            <>
              <Button type="none" variant="default" onClick={handlePrevStep}>
                Back
              </Button>
              <Button type="submit">Finalise Listing</Button>
            </>
          ) : (
            <Button type="submit" loading={finalLoading}>
              Finalise Edit
            </Button>
          )}
        </Group>
      </form>
    </Stack>
  );
}
