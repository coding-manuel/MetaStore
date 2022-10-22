import React, { useEffect } from "react"
import Experience from "../components/Experience"
import Customisation from "../components/Customisation"
import { Group, Box, Button } from "@mantine/core"
import { Leva } from "leva"
import { DotsThree } from "phosphor-react"
import useMainStore from "../store/mainStore"

export default function Creator() {
  const isDesktop = useMainStore((state) => state.isDesktop)
  const menuOpen = useMainStore((state) => state.menuOpen)
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle)

  return (
    <>
      <Group noWrap spacing={0} sx={{ height: "100%", overflow: "hidden" }}>
        <Customisation />
        <Box sx={{ width: isDesktop ? "400px" : "100%", height: "100%" }}>
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
      {/* <Leva /> */}
    </>
  )
}
