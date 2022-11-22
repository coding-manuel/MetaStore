import { Stack, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { HeaderComp } from "./HeaderComp";
import LogoLight from "/assets/type-logo-light.svg";
import LogoDark from "/assets/type-logo-dark.svg";

export function HeadFootLayout({ children }) {
  return (
    <div style={{ overflow: "auto" }}>
      <HeaderComp />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Footer />
    </div>
  );
}

export function FootLayout({ children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
  return (
    <Stack py={40} sx={{ minHeight: "100vh" }} justify="space-between">
      {children}
      <img
        src={colorScheme === "dark" ? LogoLight : LogoDark}
        onClick={() => navigate("/")}
        style={{ height: 20, cursor: "pointer" }}
      />
    </Stack>
  );
}
