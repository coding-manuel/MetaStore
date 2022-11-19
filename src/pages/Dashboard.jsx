import {
  ActionIcon,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  Tooltip,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  FacebookLogo,
  Globe,
  InstagramLogo,
  Link as LinkIcon,
  Plus,
  ShareNetwork,
  TwitterLogo,
} from "phosphor-react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import AvatarEditorComp from "../components/AvatarEditorComp";
import { HeadFootLayout } from "../components/Layout";
import useMainStore from "../store/mainStore";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";
import { useForm } from "@mantine/form";
import { DataTable } from "mantine-datatable";
import DashboardTable from "../components/DashboardTable";

export default function Dashboard() {
  let { shop_id } = useParams();
  const fetchShop = useMainStore((state) => state.fetchShop);
  const isDesktop = useMainStore((state) => state.isDesktop);
  const userId = useMainStore((state) => state.user);

  const [editImageModalOpen, setEditImageModalOpen] = useState(false);
  const [editPageModalOpen, setEditPageModalOpen] = useState(false);
  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    refreshShopInfo();
  }, []);

  const refreshShopInfo = () => {
    fetchShop(shop_id).then((data) => setShopInfo(data.data));
  };

  return (
    <HeadFootLayout>
      <LoadingOverlay
        visible={shopInfo === null}
        overlayBlur={2}
        radius="xs"
        transitionDuration={250}
      />
      {shopInfo !== null && (
        <Container size="lg" my={16}>
          <Group
            align={isDesktop ? "flex-start" : "center"}
            sx={{ flexDirection: !isDesktop && "column" }}
            noWrap
          >
            <img
              src={
                import.meta.env.VITE_SUPABASE_PUBLIC_URL +
                "/" +
                shopInfo.shop_avatar_url +
                "?" +
                shopInfo.updated_at
              }
              alt="Shop Image"
              style={{
                width: 200,
                height: "auto",
                borderRadius: 8,
              }}
            />
            <Stack spacing={4} align={!isDesktop && "center"}>
              <Title order={4}>{shopInfo.shop_name}</Title>
              <Text sx={{ maxWidth: 500 }} align={!isDesktop && "center"}>
                {shopInfo.shop_description}
              </Text>
            </Stack>
          </Group>
          <Paper shadow="sm" p="md" mt="md">
            <Group position={isDesktop ? "apart" : "center"}>
              <Group>
                <Button onClick={() => setEditPageModalOpen(true)}>
                  Edit Shop
                </Button>
                <Button onClick={() => setEditImageModalOpen(true)}>
                  Edit Image
                </Button>
              </Group>
              <Group>
                <CustomLink website={shopInfo.shop_website} tooltip="Website">
                  <Globe size={24} />
                </CustomLink>
                <CustomLink
                  website={shopInfo.shop_instagram}
                  tooltip="Instagram"
                >
                  <InstagramLogo size={24} />
                </CustomLink>
                <CustomLink website={shopInfo.shop_facebook} tooltip="Facebook">
                  <FacebookLogo size={24} />
                </CustomLink>
                <CustomLink website={shopInfo.shop_twitter} tooltip="Twitter">
                  <TwitterLogo size={24} />
                </CustomLink>
                <CustomLink website={shopInfo.shop_website} tooltip="Share">
                  <ShareNetwork size={24} />
                </CustomLink>
              </Group>
            </Group>
          </Paper>
          <Paper shadow="sm" p="md" mt="md">
            <Stack>
              <Button
                component={Link}
                to="/dashboard/create_product"
                variant="outline"
                leftIcon={<Plus size={16} />}
              >
                Add Product
              </Button>
              <DashboardTable shopId={shop_id} />
            </Stack>
          </Paper>
          <EditImageModal
            editImageModalOpen={editImageModalOpen}
            setEditImageModalOpen={setEditImageModalOpen}
            shopInfo={shopInfo}
            refreshShopInfo={refreshShopInfo}
          />
          <EditPageModal
            editPageModalOpen={editPageModalOpen}
            setEditPageModalOpen={setEditPageModalOpen}
            shopInfo={shopInfo}
            refreshShopInfo={refreshShopInfo}
          />
        </Container>
      )}
    </HeadFootLayout>
  );
}

export function CustomLink({ website, tooltip, children }) {
  return (
    website !== null &&
    website !== "" && (
      <Tooltip position="bottom" label={tooltip} offset={8}>
        <ActionIcon component="a" href={website} target="_blank">
          {children}
        </ActionIcon>
      </Tooltip>
    )
  );
}

export function EditImageModal({
  editImageModalOpen,
  setEditImageModalOpen,
  shopInfo,
}) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [artAccepted, setArtAccepted] = useState(false);
  const editor = useRef();

  const handleModalClose = () => {
    if (!artAccepted) setEditImageModalOpen(false);
    else {
      confirm(
        "Are you sure you want to close this modal? This action is permanent and cannot be undone?"
      ) && setEditImageModalOpen(false);
      setArtAccepted(false);
    }
  };

  const handleSubmit = async () => {
    const pf = await handleCrop();
    const name = shopInfo.shop_name.concat("-picture");
    const avatarFile = [
      new File([pf], `${name}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date(),
      }),
    ];

    try {
      setLoading(true);

      //upload image
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

var urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // validate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
); // validate fragment locator

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
