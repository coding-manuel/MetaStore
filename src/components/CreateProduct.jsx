import React, { useRef, useState } from "react";
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
} from "@mantine/core";
import { FootLayout } from "./Layout";
import {
  ProductPictureEditorComp,
  ProductPictureUploadComp,
} from "./AvatarEditorComp";
import { useForm } from "@mantine/form";
import { Carousel } from "@mantine/carousel";
import { Trash } from "phosphor-react";

export default function CreateProduct() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <FootLayout>
      <Container sx={{ width: "90%" }} size="sm">
        <Stepper active={active}>
          <Stepper.Step>
            <CreateProductStep1
              active={active}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step>
            <CreateProductStep2
              active={active}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step>Step 3 content: Get full access</Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </FootLayout>
  );
}

export function CreateProductStep1({ prevStep, nextStep, active }) {
  const frontEditor = useRef(null);
  const backEditor = useRef(null);
  const [frontImage, setFrontImage] = useState(false);
  const [backImage, setBackImage] = useState(false);

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
        <Button disabled={!frontImage && !backImage} onClick={nextStep}>
          Next step
        </Button>
      </Group>
    </Stack>
  );
}

export function CreateProductStep2({ prevStep, nextStep, active }) {
  const [characterCount, setCharacterCount] = useState(0);
  const [artAccepted, setArtAccepted] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const form = useForm({
    initialValues: {
      description: "",
      address: "",
      website: "",
    },
    validate: {
      website: (value) =>
        value.length === 0 || urlPattern.test(value) ? null : "Invalid URL",
    },
  });

  const handleSubmit = (value) => {};

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

  return (
    <Stack spacing={0}>
      <Text weight={700}>Step 2 of 3</Text>
      <Title order={4}>Product Metadata</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing={8} my={16}>
          <Stack>
            <ProductPictureUploadComp
              artAccepted={artAccepted}
              setArtAccepted={setArtAccepted}
              handleUploadImage={handleUploadImage}
            />
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
            required
            label="Product Name"
            {...form.getInputProps("name")}
          />
          <Stack my={16} spacing={8}>
            <Textarea
              label="Product Description"
              maxLength={200}
              onKeyUp={(e) => setCharacterCount(e.target.value.length)}
              required
              autosize
              withAsterisk
              {...form.getInputProps("description")}
            />
            <Text align="right" size="sm" p={8}>
              {characterCount}/200
            </Text>
          </Stack>
        </Stack>
        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </form>
    </Stack>
  );
}
