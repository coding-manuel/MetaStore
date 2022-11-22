import { Stack, Group, Box, Button } from "@mantine/core";
import React from "react";
import useMainStore from "../store/mainStore";
import { HeaderComp } from "../components/Layout/HeaderComp";
import Experience from "../components/Experience";
import BodyCustomise from "../components/BodyCustomise";
import { DotsThree } from "phosphor-react";

export default function Profile() {
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
        <BodyCustomise />
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
  );
}
