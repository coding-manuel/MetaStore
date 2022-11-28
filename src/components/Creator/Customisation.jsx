import React, { useEffect } from "react";
import { Tabs, Paper, Button, Title } from "@mantine/core";
import OutfitSelector from "./OutfitSelector";
import { X } from "phosphor-react";
import useMainStore from "../../store/mainStore";
import Outfit from "./Outfit";

export default function Customisation() {
  const menuOpen = useMainStore((state) => state.menuOpen);
  const isDesktop = useMainStore((state) => state.isDesktop);
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle);

  return (
    <Paper
      shadow="sm"
      p="md"
      sx={
        isDesktop
          ? {
              height: "100%",
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
      <TabComponent isDesktop={isDesktop} handleMenuToggle={handleMenuToggle} />
    </Paper>
  );
}

const TabComponent = ({ isDesktop, handleMenuToggle }) => {
  return (
    <Tabs
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      variant="pills"
      defaultValue="bag"
    >
      <Tabs.List grow position="center">
        <Tabs.Tab value="bag">Bag</Tabs.Tab>
        <Tabs.Tab value="outfit">Outfit</Tabs.Tab>
        {!isDesktop && (
          <Button onClick={handleMenuToggle}>
            <X size={16} weight="bold" />
          </Button>
        )}
      </Tabs.List>

      <Tabs.Panel
        sx={{ height: "100%", overflowY: "auto" }}
        value="bag"
        my={16}
      >
        <OutfitSelector />
      </Tabs.Panel>

      <Tabs.Panel
        sx={{ height: "100%", overflowY: "auto" }}
        my={16}
        value="outfit"
      >
        <Outfit />
      </Tabs.Panel>
    </Tabs>
  );
};
