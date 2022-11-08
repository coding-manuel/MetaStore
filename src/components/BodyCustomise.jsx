import React, { useEffect, useState } from "react";
import {
  Group,
  Slider,
  Text,
  Stack,
  Box,
  Paper,
  Title,
  Button,
} from "@mantine/core";
import useCharacterStore from "../store/characterStore";
import { useTheme } from "@emotion/react";
import useMainStore from "../store/mainStore";
import { X } from "phosphor-react";

export default function BodyCustomise() {
  const shapeKeys = useCharacterStore((state) => state.shapeKeys);
  const isDesktop = useMainStore((state) => state.isDesktop);
  const menuOpen = useMainStore((state) => state.menuOpen);
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle);

  const theme = useTheme();
  return (
    <Paper
      shadow="sm"
      p="md"
      sx={
        isDesktop
          ? {
              height: "100%",
              maxWidth: 900,
            }
          : {
              position: "absolute",
              top: 0,
              right: !menuOpen ? "100%" : "0%",
              width: "100%",
              zIndex: 100,
              height: "100%",
              transition: ".25s ease",
            }
      }
    >
      <Stack px={16} sx={{ height: "inherit", overflow: "auto" }}>
        <Group position="apart">
          <Text>Profile</Text>
          {!isDesktop && (
            <Button onClick={handleMenuToggle}>
              <X size={16} weight="bold" />
            </Button>
          )}
        </Group>
        <Group grow>
          <CustomSizeButton size="S" />
          <CustomSizeButton size="M" />
          <CustomSizeButton size="L" />
          <CustomSizeButton size="XL" />
        </Group>
        <CustomSlider shapeKey="stomach" value={shapeKeys.stomach} />
        <CustomSlider shapeKey="chest" value={shapeKeys.chest} />
        <CustomSlider shapeKey="waist" value={shapeKeys.waist} />
        <CustomSlider shapeKey="butt" value={shapeKeys.butt} />
        <CustomSlider shapeKey="thighs" value={shapeKeys.thighs} />
        <CustomSlider shapeKey="calves" value={shapeKeys.calves} />
        <CustomSlider shapeKey="hands" value={shapeKeys.hands} />
      </Stack>
    </Paper>
  );
}

const CustomSizeButton = ({ size }) => {
  const preset = useCharacterStore((state) => state.preset);
  const setPreset = useCharacterStore((state) => state.setPreset);

  const [active, setActive] = useState(preset === size);

  useEffect(() => {
    setActive(preset === size);
  }, [preset]);

  const theme = useTheme();
  return (
    <Paper
      shadow="xs"
      sx={{
        cursor: "pointer",
        padding: "8px 8px",
        textAlign: "center",
        backgroundColor: active ? theme.colors.yellow[4] : theme.colors.dark[5],
        color: active && theme.white,
      }}
      onClick={() => setPreset(size)}
    >
      <Title order={3}>{size}</Title>
    </Paper>
  );
};

function CustomSlider({ shapeKey, value }) {
  const updateShapeKey = useCharacterStore((state) => state.updateShapeKey);
  const theme = useTheme();
  return (
    <Group align="center" sx={{ width: "100%" }}>
      <Stack py={8} spacing={8} sx={{ flexGrow: 1 }}>
        <Text>{shapeKey.charAt(0).toUpperCase() + shapeKey.slice(1)}</Text>
        <Slider
          sx={{ flexGrow: 1 }}
          value={value}
          onChange={(val) => updateShapeKey(shapeKey, val)}
          label={null}
          step={0.01}
          min={0}
          max={1}
        />
      </Stack>
      <Box
        sx={{
          background: theme.colors.dark[6],
          padding: "8px 8px",
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        {value.toFixed(2)}
      </Box>
    </Group>
  );
}
