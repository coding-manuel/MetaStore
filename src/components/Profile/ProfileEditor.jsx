import React, { useEffect, useState } from "react"
import {
  Group,
  Paper,
  Title,
  Stack,
  Slider,
  Text,
  Divider,
  NumberInput,
  Button,
  ColorPicker,
} from "@mantine/core"
import useCharacterStore from "../../store/characterStore"
import { useTheme } from "@emotion/react"
import { Pencil, X } from "phosphor-react"
import MeasurementsCreator from "./MeasurementsCreator"

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

const ProfileEditor = () => {
  const shapeKeys = useCharacterStore((state) => state.shapeKeys)
  const updateMaterial = useCharacterStore((state) => state.updateMaterial)
  const hairColor = useCharacterStore((state) => state.texture.hair)
  const updateHairColor = useCharacterStore((state) => state.updateHairColor)
  const updateSkin = useCharacterStore((state) => state.updateSkin)
  const textureData = useCharacterStore((state) => state.texture)
  const measurement = useCharacterStore((state) => state.measurement)
  const [edit, setEdit] = useState(false)

  return (
    <>
      {/* <Group grow>
        <CustomSizeButton size="S" />
        <CustomSizeButton size="M" />
        <CustomSizeButton size="L" />
        <CustomSizeButton size="XL" />
      </Group> */}
      <Group align="center" position="apart" w="100%">
        <Title order={6}>Body Measurements</Title>
        {edit ? (
          <Button
            onClick={() => setEdit(false)}
            leftIcon={<X size={16} />}
            color="red"
            compact
            variant="outline"
          >
            <Text size="xs">Cancel</Text>
          </Button>
        ) : (
          <Button
            onClick={() => setEdit(true)}
            leftIcon={<Pencil size={16} />}
            compact
            variant="outline"
          >
            <Text size="xs">Edit</Text>
          </Button>
        )}
      </Group>
      {edit ? (
        <MeasurementsCreator onSubmit={setEdit} withShapeKey={true} />
      ) : (
        <Stack spacing="xs">
          <CustomMeasurement measurement="chest" value={measurement?.chest} />
          <CustomMeasurement
            measurement="shoulder"
            value={measurement?.shoulder}
          />
          <CustomMeasurement measurement="waist" value={measurement?.waist} />
          <CustomMeasurement measurement="thighs" value={measurement?.thighs} />
          <CustomMeasurement
            measurement="weight"
            value={measurement?.weight}
            type="weight"
          />
        </Stack>
      )}
      <Divider />
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
        <ColorPicker
          value={hairColor}
          onChange={updateHairColor}
          swatches={[
            "#090806",
            "#2c222b",
            "#664f3c",
            "#8c684a",
            "#332a22",
            "#d8c078",
            "#f2e1ae",
            "#3b3c24",
            "#b56239",
          ]}
        />
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
    </>
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

const CustomSizeButton = ({ size }) => {
  const preset = useCharacterStore((state) => state.preset)
  const setPreset = useCharacterStore((state) => state.setPreset)

  const [active, setActive] = useState(preset === size)

  useEffect(() => {
    setActive(preset === size)
  }, [preset])

  const theme = useTheme()
  return (
    <Paper
      shadow="xs"
      sx={{
        cursor: "pointer",
        padding: "8px 8px",
        textAlign: "center",
        backgroundColor: active && theme.colors.yellow[4],
        color: active && theme.white,
      }}
      onClick={() => setPreset(size)}
    >
      <Title order={3}>{size}</Title>
    </Paper>
  )
}

function CustomSlider({ shapeKey, value }) {
  const updateShapeKeyAdd = useCharacterStore(
    (state) => state.updateShapeKeyAdd
  )
  return (
    <Group align="center" sx={{ width: "100%" }}>
      <Stack py={8} spacing={8} sx={{ flexGrow: 1 }}>
        <Text>{shapeKey.charAt(0).toUpperCase() + shapeKey.slice(1)}</Text>
        <Slider
          sx={{ flexGrow: 1 }}
          value={value}
          onChange={(val) => updateShapeKeyAdd(shapeKey, val)}
          label={null}
          step={0.01}
          min={-0.2}
          max={0.2}
        />
      </Stack>
      {/* <Paper
        sx={{
          padding: "8px 8px",
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        {value.toFixed(2)}
      </Paper> */}
    </Group>
  )
}

function CustomMeasurement({ measurement, value, type }) {
  return (
    <Group position="apart" align="center" sx={{ width: "100%" }}>
      <Text>{measurement.charAt(0).toUpperCase() + measurement.slice(1)}</Text>
      <Paper
        m={0}
        p={8}
        sx={{
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <Text weight={500}>
          {value}
          {type === "weight" ? "Kg" : "in"}
        </Text>
      </Paper>
    </Group>
  )
}

export default ProfileEditor
