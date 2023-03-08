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
} from "@mantine/core"
import useCharacterStore from "../../store/characterStore"
import { useTheme } from "@emotion/react"
import { Pencil, X } from "phosphor-react"
import MeasurementsCreator from "./MeasurementsCreator"

const ProfileEditor = () => {
  const shapeKeys = useCharacterStore((state) => state.shapeKeys)
  const shapeKeysAdd = useCharacterStore((state) => state.shapeKeysAdd)
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
        <MeasurementsCreator onSubmit={setEdit} />
      ) : (
        <Stack spacing="xs">
          <CustomMeasurement measurement="chest" value={measurement.chest} />
          <CustomMeasurement
            measurement="shoulder"
            value={measurement.shoulder}
          />
          <CustomMeasurement measurement="waist" value={measurement.waist} />
          <CustomMeasurement measurement="thighs" value={measurement.thighs} />
          <CustomMeasurement
            measurement="weight"
            value={measurement.weight}
            type="weight"
          />
        </Stack>
      )}
      <Divider />
      <CustomSlider shapeKey="stomach" value={shapeKeysAdd.stomach} />
      <CustomSlider shapeKey="butt" value={shapeKeysAdd.butt} />
      <CustomSlider shapeKey="thighs" value={shapeKeysAdd.thighs} />
      <CustomSlider shapeKey="hands" value={shapeKeysAdd.hands} />
    </>
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
  const updateShapeKey = useCharacterStore((state) => state.updateShapeKey)
  return (
    <Group align="center" sx={{ width: "100%" }}>
      <Stack py={8} spacing={8} sx={{ flexGrow: 1 }}>
        <Text>{shapeKey.charAt(0).toUpperCase() + shapeKey.slice(1)}</Text>
        <Slider
          sx={{ flexGrow: 1 }}
          value={value}
          onChange={(val) => updateShapeKey(shapeKey, val)}
          label={null}
          step={0.01}
          min={-1}
          max={1}
        />
      </Stack>
      <Paper
        sx={{
          padding: "8px 8px",
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        {value.toFixed(2)}
      </Paper>
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
