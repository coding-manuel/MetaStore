import React, { useState, useRef } from "react";
import {
  Text,
  Group,
  Button,
  Stack,
  Slider,
  Loader,
  AspectRatio,
} from "@mantine/core";
import AvatarEditor from "react-avatar-editor";
import { Dropzone } from "@mantine/dropzone";

import { Camera } from "phosphor-react";
import uuid from "react-uuid";
import { showNotification } from "@mantine/notifications";
import { notificationStyles } from "../globalStyles";
import { resizeFile } from "../utils/utilFunctions";

export const handleReject = (files, size) => {
  let title, message;
  if (files[0].errors[0].code === "file-too-large") {
    title = "File uploaded is too large";
    message = "Image uploaded is above " + size;
  } else if (files[0].errors[0].code === "file-invalid-type") {
    title = "File uploaded is not an image";
    message = "Are you a dumbo?";
  }
  showNotification({
    title: title,
    message: message,
    styles: notificationStyles,
  });
};

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
          maxSize={5000000}
          padding={0}
          multiple={false}
          accept={["image/png", "image/jpeg"]}
          onDrop={(files) => handleDrop(files, "image")}
          onReject={(files) => handleReject(files, "5MB")}
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
            maxSize={10000000}
            padding={0}
            multiple={false}
            accept={["image/png", "image/jpeg"]}
            onDrop={(files) => handleDrop(files, "image")}
            onReject={(files) => handleReject(files, "10MB")}
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

    if (files.length > 7) {
      showNotification({
        title: "More than 7 files are not allowed",
        styles: notificationStyles,
      });
      setCoverDropLoad(false);
      return;
    }

    let uploadImage = [];
    let promises = await files.map(async (file) => {
      uploadImage.push(await handleImage(file));
    });

    await Promise.all(promises);

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
          maxSize={5000000}
          padding={0}
          multiple
          accept={["image/png", "image/jpeg"]}
          onDrop={(files) => handleDrop(files, "image")}
          onReject={(files) => handleReject(files, "5MB")}
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

  const compressedFile = await resizeFile(file, 720, 720);

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
