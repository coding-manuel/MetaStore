import React, { useEffect, useRef, useState } from "react";
import { Button, Group, Stack, Title, Text } from "@mantine/core";

import { ProductPictureEditorComp } from "../AvatarEditorComp";
import useMainStore from "../../store/mainStore";
import { Link } from "react-router-dom";

export function CreateProductStep1({ nextStep, formData, setFormData }) {
  const shop_id = useMainStore((state) => state.shopName);

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
        <Button component={Link} to={`/dashboard/${shop_id}`} variant="default">
          Back
        </Button>
        <Button disabled={!frontImage || !backImage} onClick={handleSubmit}>
          Next step
        </Button>
      </Group>
    </Stack>
  );
}
