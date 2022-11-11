import React, { useState, useRef } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
  Slider,
  Textarea,
  MediaQuery,
  Loader,
} from "@mantine/core";
import imageCompression from "browser-image-compression";
import AvatarEditor from "react-avatar-editor";
import { Dropzone } from "@mantine/dropzone";

import Logo from "/assets/type-logo.svg";
import { Camera, Check } from "phosphor-react";
import { notificationStyles } from "../globalStyles";
import { supabase } from "../utils/supabaseClient";
import { showNotification } from "@mantine/notifications";
import useMainStore from "../store/mainStore";
import { useNavigate } from "react-router-dom";

var urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // validate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
); // validate fragment locator

export default function CreateShop() {
  const [loading, setLoading] = useState(false);
  const [coverDropLoad, setCoverDropLoad] = useState(false);
  const [artAccepted, setArtAccepted] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [scale, setScale] = useState(1);
  const userId = useMainStore((state) => state.user);

  const navigate = useNavigate();

  const editor = useRef();

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

  const handleDrop = (files, type) => {
    setCoverDropLoad(true);
    var reader = new FileReader();
    reader.onload = (e) => {
      setArtAccepted([files, e.target.result]);
      setCoverDropLoad(false);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    if (!artAccepted) {
      showNotification({
        title: "Oops, You forgot to add your shop picture",
        styles: notificationStyles,
      });
      setLoading(false);
      return;
    }
    const pf = await handleCrop();
    const name = shopName.concat("-picture");
    const avatarFile = [
      new File([pf], `${name}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date(),
      }),
    ];

    try {
      const { data, strerror } = await supabase.storage
        .from("avatars")
        .upload(`${name}`, avatarFile[0], {
          cacheControl: "3600",
        });

      const { error } = await supabase.from("shops").insert({
        id: userId,
        shop_name: shopName,
        shop_description: values.description,
        shop_address: values.address,
        shop_avatar_url: data.path,
        shop_website: values.website,
      });

      const shop_id = await supabase
        .from("shops")
        .select("shop_id")
        .eq("shop_name", shopName);

      const { err } = await supabase
        .from("profiles")
        .update({
          role: "owner",
          shop_id: shop_id.data[0].shop_id,
        })
        .eq("id", userId);

      navigate(`/dashboard/${shop_id.data[0].shop_id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrop = async () => {
    // const img =
    var dataurl = editor.current.getImage().toDataURL();

    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    const file = new File([blob], `path.jpg`, {
      type: "image/jpeg",
      lastModified: new Date(),
    });

    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  };

  const handleShopName = async (event) => {
    setShopName(event.currentTarget.value);

    if (event.currentTarget.value.length === 0)
      setShopNameError("Shop Name cannot be empty");
    else {
      const data = await supabase
        .from("shops")
        .select()
        .eq("shop_name", event.currentTarget.value);

      data.data.length === 0
        ? setShopNameError(false)
        : setShopNameError("Name Already Exists");
    }
  };

  return (
    <Stack
      py={40}
      spacing={42}
      justify="space-between"
      sx={{ minHeight: "100%" }}
    >
      <Container size={600}>
        <MediaQuery
          query="(min-width: 700px)"
          styles={{
            width: 600,
          }}
        >
          <Paper
            withBorder
            shadow="md"
            p={24}
            radius="md"
            sx={{ minWidth: 300 }}
          >
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack sx={{ width: "100%" }}>
                <Title order={5}>Create a Shop</Title>
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
                <TextInput
                  label="Shop Name"
                  required
                  error={shopNameError}
                  value={shopName}
                  rightSection={
                    shopNameError === null ? (
                      <Loader size="xs" />
                    ) : shopNameError === false ? (
                      <Check size={16} color="#1dde2a" />
                    ) : (
                      <></>
                    )
                  }
                  onChange={(event) => handleShopName(event)}
                  onBlur={handleShopName}
                />
                <Textarea
                  label="Shop Description"
                  required
                  withAsterisk
                  {...form.getInputProps("description")}
                />
                <Textarea
                  label="Shop Address"
                  {...form.getInputProps("address")}
                />
                <TextInput label="Website" {...form.getInputProps("website")} />
                <Button type="submit" fullWidth loading={loading}>
                  Create
                </Button>
              </Stack>
            </form>
          </Paper>
        </MediaQuery>
      </Container>
      <img src={Logo} style={{ height: 20 }} />
    </Stack>
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
