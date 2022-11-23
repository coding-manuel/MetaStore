import { Button, Group, Modal, Stack, useMantineTheme } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AvatarEditorComp from "../../components/AvatarEditorComp";
import { supabase } from "../../utils/supabaseClient";
import { resizeFile } from "../../utils/utilFunctions";

export function EditImageModal({
  editImageModalOpen,
  setEditImageModalOpen,
  refreshShopInfo,
  shopInfo,
}) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [artAccepted, setArtAccepted] = useState(false);
  const editor = useRef();

  const handleModalClose = () => {
    if (!artAccepted) setEditImageModalOpen(false);
    else {
      if (
        confirm(
          "Are you sure you want to close this modal? This action is permanent and cannot be undone?"
        )
      ) {
        setEditImageModalOpen(false);
        setArtAccepted(false);
      }
    }
  };

  const handleSubmit = async () => {
    const pf = await handleCrop();
    const name = shopInfo.shop_name.replace(/\s+/g, "").concat("-picture");
    const avatarFile = [
      new File([pf], `${name}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date(),
      }),
    ];

    try {
      setLoading(true);

      // upload image
      const { data, strerror } = await supabase.storage
        .from("avatars")
        .update(`${name}`, avatarFile[0], {
          cacheControl: "360",
          upsert: true,
        });

      const { error } = await supabase
        .from("shops")
        .update({
          shop_avatar_url: name,
        })
        .eq("shop_id", shopInfo.shop_id);

      setEditImageModalOpen(false);
      setArtAccepted(false);
      refreshShopInfo();
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

  return (
    <Modal
      title="Edit Shop Image"
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      closeOnEscape
      onClose={handleModalClose}
      opened={editImageModalOpen}
      exitTransitionDuration={250}
    >
      <Stack align="flex-end">
        <AvatarEditorComp
          editor={editor}
          artAccepted={artAccepted}
          setArtAccepted={setArtAccepted}
        />
        <Group>
          <Button
            loading={loading}
            onClick={handleSubmit}
            disabled={!artAccepted}
          >
            Save Changes
          </Button>
          <Button onClick={handleModalClose} variant="outline" color="red">
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
