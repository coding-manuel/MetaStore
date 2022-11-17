import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Text,
  Group,
  Button,
  Stack,
  Slider,
  Loader,
  AspectRatio,
} from "@mantine/core";
import imageCompression from "browser-image-compression";
import AvatarEditor from "react-avatar-editor";
import { Dropzone } from "@mantine/dropzone";

import { Camera } from "phosphor-react";
import uuid from "react-uuid";

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

export function ProductPictureEditorComp({
  editor,
  artAccepted,
  setArtAccepted,
  type,
}) {
  const [coverDropLoad, setCoverDropLoad] = useState(false);
  const [scale, setScale] = useState(1);
  const asp = useRef(null);

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
    <Stack sx={{ width: "100%", heigth: "100%" }} mx="auto">
      <AspectRatio ratio={9 / 16} sx={{ minWidth: 150 }} ref={asp}>
        {artAccepted ? (
          <AvatarEditor
            style={{
              zIndex: 10000,
              borderRadius: 8,
              margin: "auto",
            }}
            image={artAccepted[1]}
            scale={scale}
            rotate={0}
            border={0}
            width={asp.current.scrollWidth}
            height={asp.current.scrollHeight}
            ref={editor}
          />
        ) : (
          <Dropzone
            padding={0}
            multiple={false}
            accept={["image/png", "image/jpeg"]}
            onDrop={(files) => handleDrop(files, "image")}
            onReject={(files) => handleReject(files, "image")}
            disabled={artAccepted}
            loading={coverDropLoad}
          >
            <Stack align="center" spacing="sm">
              <Camera size={18} weight="fill" />
              <Text size="sm" color="dimmed">
                Upload {type} Image
              </Text>
            </Stack>
          </Dropzone>
        )}
      </AspectRatio>
      {artAccepted && (
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
      )}
    </Stack>
  );
}

export function ProductPictureUploadComp({ handleUploadImage }) {
  const [coverDropLoad, setCoverDropLoad] = useState(false);
  const asp = useRef(null);
  const editor = useRef(null);

  const handleDrop = async (files, type) => {
    setCoverDropLoad(true);

    var uploadImage = await handleImage(files[0]);

    handleUploadImage(uploadImage);
    setCoverDropLoad(false);
  };

  return (
    <Stack>
      <AspectRatio
        ratio={9 / 16}
        sx={{ width: "100%", maxWidth: 250, margin: "auto" }}
        ref={asp}
      >
        <Dropzone
          padding={0}
          multiple={false}
          accept={["image/png", "image/jpeg"]}
          onDrop={(files) => handleDrop(files, "image")}
          onReject={(files) => handleReject(files, "image")}
          loading={coverDropLoad}
        >
          <Stack align="center" spacing="sm">
            <Camera size={18} weight="fill" />
            <Text size="sm" color="dimmed">
              Upload Image
            </Text>
          </Stack>
        </Dropzone>
      </AspectRatio>
    </Stack>
  );
}

export const handleImage = async (imgfile) => {
  var dataurl = URL.createObjectURL(imgfile);

  var blob = imgfile.slice(0, imgfile.size, "image/png");

  const file = new File([blob], `${uuid()}.jpg`, {
    type: "image/jpeg",
    lastModified: new Date(),
  });

  const options = {
    maxSizeMB: 3,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(file, options);

  const imageFile = [
    new File([compressedFile], compressedFile.name, {
      type: "image/jpeg",
      lastModified: new Date(),
    }),
  ];

  return [imageFile, dataurl, imageFile[0].name];
};
// export const handleImage = async (editor) => {
//   var dataurl = editor.current.getImage().toDataURL();

//   var arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   const blob = new Blob([u8arr], { type: mime });
//   const file = new File([blob], `path.jpg`, {
//     type: "image/jpeg",
//     lastModified: new Date(),
//   });

//   const options = {
//     maxSizeMB: 5,
//     useWebWorker: true,
//   };

//   const compressedFile = await imageCompression(file, options);

//   const avatarFile = [
//     new File([compressedFile], `${uuid()}.jpg`, {
//       type: "image/jpeg",
//       lastModified: new Date(),
//     }),
//   ];

//   return [avatarFile, dataurl, uuid()];
// };
