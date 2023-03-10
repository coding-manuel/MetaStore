import { useTheme } from "@emotion/react"
import {
  Box,
  Button,
  ColorPicker,
  Group,
  Image,
  Paper,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core"
import React from "react"
import useCharacterStore from "../../store/characterStore"

export default function Outfit() {
  const updateMaterial = useCharacterStore((state) => state.updateMaterial)
  const hairColor = useCharacterStore((state) => state.texture.hair)
  const updateHairColor = useCharacterStore((state) => state.updateHairColor)
  const updateSkin = useCharacterStore((state) => state.updateSkin)
  const textureData = useCharacterStore((state) => state.texture)

  return (
    <Stack p={8}>
      <Title order={5}>Shoes</Title>
      <Group>
        <Button onClick={() => updateMaterial("shoe", "Shoes-White-01")}>
          White
        </Button>
        <Button onClick={() => updateMaterial("shoe", "Shoes-Black-01")}>
          Black
        </Button>
      </Group>
      <Title order={5}>Glasses</Title>
      <Group>
        <Button onClick={() => updateMaterial("glasses", "none")}>None</Button>
        <Button onClick={() => updateMaterial("glasses", "Glasses-01")}>
          01
        </Button>
        <Button onClick={() => updateMaterial("glasses", "Glasses-02")}>
          02
        </Button>
        <Button onClick={() => updateMaterial("glasses", "Glasses-03")}>
          03
        </Button>
      </Group>
    </Stack>
  )
}
