import React, { useEffect } from "react";
import Experience from "../components/Experience";
import Customisation from "../components/Customisation";
import { Group, Box, Button, Stack } from "@mantine/core";
import { DotsThree } from "phosphor-react";
import useMainStore from "../store/mainStore";
import { HeaderComp } from "../components/HeaderComp";

export default function Creator() {
  const isDesktop = useMainStore((state) => state.isDesktop);
  const onResize = useMainStore((state) => state.onResize);
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize()
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Stack spacing={0} sx={{ height: "100%" }}>
      <Stack spacing={0} sx={{ height: "100%" }}>
        <HeaderComp />
        <Group
          grow={isDesktop}
          noWrap
          spacing={0}
          sx={{ flexGrow: 1, overflow: "hidden" }}
        >
          <Customisation />
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Experience />
          </Box>
          {!isDesktop && (
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
          )}
        </Group>
      </Stack>
    </Stack>
  );
}
