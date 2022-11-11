import React from "react";
import Footer from "../components/Footer";
import { HeaderComp } from "../components/HeaderComp";

export default function Layout({ children }) {
  return (
    <div style={{ overflow: "auto" }}>
      <HeaderComp />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Footer />
    </div>
  );
}
