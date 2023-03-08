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

const skinShades = [
  "pale",
  "white",
  "sand",
  "darksand",
  "almond",
  "bronze",
  "ember",
  "chocolate",
  "darkchocolate",
]

export default function Outfit() {
  const updateMaterial = useCharacterStore((state) => state.updateMaterial)
  const hairColor = useCharacterStore((state) => state.texture.hair)
  const updateHairColor = useCharacterStore((state) => state.updateHairColor)
  const updateSkin = useCharacterStore((state) => state.updateSkin)
  const materialData = useCharacterStore((state) => state.material)
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
      <Title order={5}>Hair</Title>
      <Group>
        <Button onClick={() => updateMaterial("hairMesh", "Hair-01")}>
          Hair 1
        </Button>
        <Button onClick={() => updateMaterial("hairMesh", "Hair-02")}>
          Hair 2
        </Button>
      </Group>
      <Group>
        <ColorPicker value={hairColor} onChange={updateHairColor} />
      </Group>
      <Title order={5}>Skin Tone</Title>
      <Group>
        {skinShades.map((skin) => {
          return (
            <CustomSkinButton
              key={skin}
              id={skin}
              active={textureData.skin}
              onClick={() => updateSkin(skin)}
              src={`/assets/skin_shades/skintone_${skin}.png`}
            />
          )
        })}
      </Group>
    </Stack>
  )
}

function CustomSkinButton(props) {
  const theme = useTheme()
  return (
    <Paper
      sx={(theme) => ({
        cursor: "pointer",
        border:
          props.id === props.active &&
          `3px solid ${theme.colorScheme === "dark" ? "#fff" : theme.black}`,
        transition: "box-shadow 150ms ease, transform 150ms ease",

        backgroundImage: `url(${props.src})`,

        "&:hover": {
          boxShadow: `${theme.shadows.md} !important`,
          transform: "scale(1.05)",
        },
      })}
      shadow="md"
      w={50}
      h={50}
      {...props}
    ></Paper>
  )
}
