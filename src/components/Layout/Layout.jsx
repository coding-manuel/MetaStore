import { Button, Box, Group, Stack, useMantineColorScheme } from "@mantine/core"
import React from "react"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { HeaderComp } from "./HeaderComp"
import LogoLight from "/assets/type-logo-light.svg"
import LogoDark from "/assets/type-logo-dark.svg"
import useMainStore from "../../store/mainStore"
import { DotsThree } from "phosphor-react"
import { Allotment } from "allotment"
import "allotment/dist/style.css"
import Experience from "../Creator/Experience"

export function HeadFootLayout({ children }) {
  return (
    <div style={{ overflow: "auto" }}>
      <HeaderComp />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Footer />
    </div>
  )
}

export function FootLayout({ children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const navigate = useNavigate()
  return (
    <Stack py={40} sx={{ minHeight: "100vh" }} justify="space-between">
      {children}
      <img
        src={colorScheme === "dark" ? LogoLight : LogoDark}
        onClick={() => navigate("/")}
        style={{ height: 20, cursor: "pointer" }}
      />
    </Stack>
  )
}

export function SplitLayout({ children }) {
  const isDesktop = useMainStore((state) => state.isDesktop)
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle)

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
            <Allotment.Pane minSize={450}>{children}</Allotment.Pane>
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
            {children}
            <Experience />
            <Button
              onClick={handleMenuToggle}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "0 20px 20px 0",
                borderRadius: "200px",
                zIndex: "200",
              }}
            >
              <DotsThree size={32} weight="bold" />
            </Button>
          </>
        )}
      </Group>
    </Stack>
  )
}
