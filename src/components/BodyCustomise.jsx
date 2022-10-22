import React, { useEffect } from "react"
import { Group, Slider, Text, Stack } from "@mantine/core"
import useCharacterStore from "../store/characterStore"

const BodyCustomise = () => {
  const updateShapeKey = useCharacterStore((state) => state.updateShapeKey)
  const shapeKeys = useCharacterStore((state) => state.shapeKeys)

  return (
    <Stack spacing={16} mx={48}>
      <Stack spacing={8} sx={{ width: "100%" }}>
        <Text>Stomach</Text>
        <Slider
          value={shapeKeys.top.stomach}
          onChange={(val) => updateShapeKey("top", "stomach", val)}
          label={null}
          step={0.01}
          sx={{ width: "100%" }}
          min={0}
          max={1}
        />
      </Stack>
      <Stack spacing={8} sx={{ width: "100%" }}>
        <Text>Chest</Text>
        <Slider
          value={shapeKeys.top.chest}
          onChange={(val) => updateShapeKey("top", "chest", val)}
          label={null}
          step={0.01}
          sx={{ width: "100%" }}
          min={0}
          max={1}
        />
      </Stack>
      <Stack spacing={8} sx={{ width: "100%" }}>
        <Text>Waist</Text>
        <Slider
          value={shapeKeys.top.waist}
          onChange={(val) => updateShapeKey("top", "waist", val)}
          label={null}
          step={0.01}
          sx={{ width: "100%" }}
          min={0}
          max={1}
        />
      </Stack>
      <Stack spacing={8} sx={{ width: "100%" }}>
        <Text>Butt</Text>
        <Slider
          value={shapeKeys.top.butt}
          onChange={(val) => updateShapeKey("top", "butt", val)}
          label={null}
          step={0.01}
          sx={{ width: "100%" }}
          min={0}
          max={1}
        />
      </Stack>
    </Stack>
  )
}

export default BodyCustomise
