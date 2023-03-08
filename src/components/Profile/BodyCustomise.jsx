import React, { useEffect, useState } from "react"
import {
  Group,
  LoadingOverlay,
  Stack,
  Paper,
  Button,
  Title,
} from "@mantine/core"
import useMainStore from "../../store/mainStore"
import { X } from "phosphor-react"
import ProfileEditor from "./ProfileEditor"
import ProfileCreator from "./ProfileCreator"

export default function BodyCustomise() {
  const isDesktop = useMainStore((state) => state.isDesktop)
  const menuOpen = useMainStore((state) => state.menuOpen)
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle)
  const userDetails = useMainStore((state) => state.userDetails)
  const registered = useMainStore((state) => state.registered)

  return (
    <Paper
      shadow="sm"
      p="md"
      sx={(theme) =>
        isDesktop
          ? {
              height: "100%",
              maxWidth: 900,
              zIndex: 250,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
            }
          : {
              position: "absolute",
              top: 0,
              right: !menuOpen ? "100%" : "0%",
              width: "100%",
              zIndex: 250,
              height: "100%",
              transition: ".25s ease",
            }
      }
    >
      <LoadingOverlay
        transitionDuration={500}
        overlayOpacity={1}
        visible={!userDetails}
      />
      <Stack px={16} sx={{ height: "inherit", overflow: "auto" }}>
        <Group position="apart">
          <Title order={5}>
            Welcome {userDetails?.full_name.split(" ")[0]}!
          </Title>
          {!isDesktop && (
            <Button onClick={handleMenuToggle}>
              <X size={16} weight="bold" />
            </Button>
          )}
        </Group>
        {!registered && <Title order={6}>Create your avatar</Title>}
        {registered ? <ProfileEditor /> : <ProfileCreator />}
      </Stack>
    </Paper>
  )
}
