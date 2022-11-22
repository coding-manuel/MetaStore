import { Stack } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { HeaderComp } from "./HeaderComp";
import Logo from "/assets/type-logo.svg";

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
  const navigate = useNavigate();
  return (
    <Stack py={40} sx={{ minHeight: "100%" }} justify="space-between">
      {children}
      <img
        src={Logo}
        onClick={() => navigate("/")}
        style={{ height: 20, cursor: "pointer" }}
      />
    </Stack>
  );
}
