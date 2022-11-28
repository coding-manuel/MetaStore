import React, { useEffect } from "react";
import Experience from "../components/Creator/Experience";
import Customisation from "../components/Creator/Customisation";
import { Group, Box, Button, Stack } from "@mantine/core";
import { DotsThree } from "phosphor-react";
import useMainStore from "../store/mainStore";
import { HeaderComp } from "../components/Layout/HeaderComp";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function Creator() {
  const isDesktop = useMainStore((state) => state.isDesktop);
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle);

  return (
    <Stack spacing={0} sx={{ height: "100vh" }}>
      <HeaderComp />
      <Group
        grow={isDesktop}
        noWrap
        spacing={0}
        sx={{ flexGrow: 1, overflow: "hidden" }}
      >
        {isDesktop ? (
          <Allotment>
            <Allotment.Pane minSize={450}>
              <Customisation />
            </Allotment.Pane>
            <Allotment.Pane minSize={450}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Experience />
              </Box>
            </Allotment.Pane>
          </Allotment>
        ) : (
          <>
            <Customisation />
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Experience />
            </Box>
            <Button
              onClick={handleMenuToggle}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "0 20px 20px 0",
                borderRadius: "200px",
              }}
            >
              <DotsThree size={32} weight="bold" />
            </Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
