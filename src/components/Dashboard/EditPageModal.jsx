import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useForm } from "@mantine/form";

export function EditPageModal({
  editPageModalOpen,
  setEditPageModalOpen,
  shopInfo,
  refreshShopInfo,
}) {
  const theme = useMantineTheme();
  const [characterCount, setCharacterCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      description: "",
      address: "",
      website: "",
      instagram: "",
      facebook: "",
      twitter: "",
    },
    validate: {
      website: (value) =>
        value.length === 0 || urlPattern.test(value) ? null : "Invalid URL",
      instagram: (value) =>
        value.length === 0 || urlPattern.test(value) ? null : "Invalid URL",
      twitter: (value) =>
        value.length === 0 || urlPattern.test(value) ? null : "Invalid URL",
      facebook: (value) =>
        value.length === 0 || urlPattern.test(value) ? null : "Invalid URL",
    },
  });

  const handleModalClose = () => {
    confirm(
      "Are you sure you want to close this modal? This action is permanent and cannot be undone?"
    ) && setEditPageModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("shops")
        .update({
          shop_description: values.description,
          shop_address: values.address,
          shop_website: values.website,
          shop_instagram: values.instagram,
          shop_twitter: values.twitter,
          shop_facebook: values.facebook,
        })
        .eq("shop_id", shopInfo.shop_id);
      refreshShopInfo();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setEditPageModalOpen(false);
  };

  useEffect(() => {
    form.setValues({
      description: shopInfo.shop_description,
      address: shopInfo.shop_address,
      website: shopInfo.shop_website,
      instagram: shopInfo.shop_instagram,
      facebook: shopInfo.shop_facebook,
      twitter: shopInfo.shop_twitter,
    });
    setCharacterCount(shopInfo.shop_description.length);
  }, []);

  return (
    <Modal
      title="Edit Shop"
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      closeOnEscape
      onClose={handleModalClose}
      opened={editPageModalOpen}
      exitTransitionDuration={250}
    >
      <Stack spacing={8}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <TextInput label="Instagram" {...form.getInputProps("instagram")} />
          <TextInput label="Twitter" {...form.getInputProps("twitter")} />
          <TextInput label="Facebook" {...form.getInputProps("facebook")} />
          <Group mt={16} position="right">
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
            <Button onClick={handleModalClose} variant="outline" color="red">
              Cancel
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
}
