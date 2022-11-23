import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Textarea,
  MediaQuery,
  Loader,
} from "@mantine/core";

import { Check } from "phosphor-react";
import { notificationStyles } from "../globalStyles";
import { supabase } from "../utils/supabaseClient";
import { showNotification } from "@mantine/notifications";
import useMainStore from "../store/mainStore";
import { useNavigate } from "react-router-dom";
import AvatarEditorComp from "../components/AvatarEditorComp";
import { resizeFile } from "../utils/utilFunctions";
import { FootLayout, HeadFootLayout } from "../components/Layout/Layout";

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
  const userId = useMainStore((state) => state.user);
  const role = useMainStore((state) => state.role);
  const refreshUserData = useMainStore((state) => state.refreshUserData);

  const [loading, setLoading] = useState(false);
  const [artAccepted, setArtAccepted] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

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
    const name = shopName.replace(/\s+/g, "").concat("-picture");
    const avatarFile = [
      new File([pf], `${name}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date(),
      }),
    ];

    try {
      //upload image
      const { data, strerror } = await supabase.storage
        .from("avatars")
        .upload(`${name}`, avatarFile[0], {
          cacheControl: "3600",
        });

      //create shop page
      const { error } = await supabase.from("shops").insert({
        id: userId,
        shop_name: shopName,
        shop_description: values.description,
        shop_address: values.address,
        shop_avatar_url: data.path,
        shop_website: values.website,
      });

      //get shop id
      const shop_id = await supabase
        .from("shops")
        .select("shop_id")
        .eq("shop_name", shopName);

      //making user a owner
      const { err } = await supabase
        .from("profiles")
        .update({
          role: "owner",
          shop_id: shop_id.data[0].shop_id,
        })
        .eq("id", userId);

      await refreshUserData();

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

    const compressedFile = await resizeFile(file, 250, 250);

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

  useEffect(() => {
    if (userId === null) navigate("/signup");
    if (role === "owner") {
      showNotification({
        title: "Only one shop per account",
        styles: notificationStyles,
      });
      navigate(-1);
    }
  });

  return (
    <FootLayout>
      <Container size={600}>
        <MediaQuery
          query="(min-width: 800px)"
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
                <AvatarEditorComp
                  editor={editor}
                  artAccepted={artAccepted}
                  setArtAccepted={setArtAccepted}
                />
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
                <Stack spacing={0}>
                  <Textarea
                    label="Shop Description"
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
                <Textarea
                  label="Shop Address"
                  autosize
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
    </FootLayout>
  );
}
