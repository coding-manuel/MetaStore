import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Text, Group, Button, Stack, Slider, Loader } from "@mantine/core";
import imageCompression from "browser-image-compression";
import AvatarEditor from "react-avatar-editor";
import { Dropzone } from "@mantine/dropzone";

import { Camera } from "phosphor-react";

export default function AvatarEditorComp({
  editor,
  artAccepted,
  setArtAccepted,
}) {
  const [coverDropLoad, setCoverDropLoad] = useState(false);
  const [scale, setScale] = useState(1);

  const handleDrop = (files, type) => {
    setCoverDropLoad(true);
    var reader = new FileReader();
    reader.onload = (e) => {
      setArtAccepted([files, e.target.result]);
      setCoverDropLoad(false);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      {artAccepted ? (
        <>
          <AvatarEditor
            style={{ zIndex: 10000, borderRadius: 8, margin: "auto" }}
            image={artAccepted[1]}
            width={200}
            height={200}
            scale={scale}
            rotate={0}
            border={0}
            ref={editor}
          />
          <Stack sx={{ width: "50%", margin: "auto" }} pt={16}>
            <Slider
              color="red"
              size="xs"
              radius="xs"
              value={scale}
              label={null}
              min={1}
              max={2.1}
              step={0.01}
              onChange={setScale}
            />
            <Button
              color="gray"
              size="xs"
              variant="outline"
              compact
              onClick={() => setArtAccepted(false)}
            >
              Remove Image
            </Button>
          </Stack>
        </>
      ) : (
        <Dropzone
          padding={0}
          multiple={false}
          accept={["image/png", "image/jpeg"]}
          onDrop={(files) => handleDrop(files, "image")}
          onReject={(files) => handleReject(files, "image")}
          disabled={artAccepted}
          loading={coverDropLoad}
          style={{ width: 200, height: 200, margin: "auto" }}
        >
          <PictureTemplate />
        </Dropzone>
      )}
    </>
  );
}

export function PictureTemplate() {
  return (
    <Group position="center" spacing="sm" style={{ height: 200, width: 200 }}>
      <Camera size={18} weight="fill" />
      <Text size="sm" color="dimmed">
        Upload Image
      </Text>
    </Group>
  );
}
