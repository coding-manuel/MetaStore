import React, { useEffect, useState } from "react"
import { Button, Stack, NumberInput, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import useCharacterStore from "../../store/characterStore"
import { supabase } from "../../utils/supabaseClient"
import useMainStore from "../../store/mainStore"
import { showNotification } from "@mantine/notifications"
import { notificationStyles } from "../../globalStyles"

const MeasurementsCreator = ({ desc, onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const measurement = useCharacterStore((state) => state.measurement)
  const setBodySize = useCharacterStore((state) => state.setMeasurement)
  const userId = useMainStore((state) => state.user)

  const form = useForm({
    initialValues: {
      waist: "",
      chest: "",
      shoulder: "",
      thighs: "",
      weight: "",
    },
    validate: {
      waist: (value) =>
        value > 25 && value < 50 ? null : "Value out of range",
      chest: (value) =>
        value > 38 && value < 50 ? null : "Value out of range",
      shoulder: (value) =>
        value > 10 && value < 22 ? null : "Value out of range",
      thighs: (value) =>
        value > 20 && value < 30 ? null : "Value out of range",
      weight: (value) =>
        value > 40 && value < 120 ? null : "Value out of range",
    },
    validateInputOnBlur: true,
  })

  const handleSubmit = async (measurement) => {
    const body_sizing = updateMeasurement(measurement)
    setLoading(true)

    try {
      const { err } = await supabase
        .from("profiles")
        .update({
          body_sizing: JSON.stringify(body_sizing),
          measurements: JSON.stringify(measurement),
        })
        .eq("id", userId)

      showNotification({
        title: "Updated Body Measurements",
        styles: notificationStyles,
      })
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
    onSubmit(false)
  }

  const updateMeasurement = async (measurement) => {
    const measurements = {
      chest: measurement.chest,
      shoulder: measurement.shoulder,
      waist: measurement.waist,
      thighs: measurement.thighs,
      weight: measurement.weight,
    }
    return setBodySize("custom", measurements)
  }

  useEffect(() => {
    if (measurement)
      form.setValues({
        waist: measurement.waist,
        chest: measurement.chest,
        shoulder: measurement.shoulder,
        thighs: measurement.thighs,
        weight: measurement.weight,
      })
  }, [])

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={8}>
        <Text>{desc}</Text>
        <NumberInput
          hideControls
          label={"Chest"}
          description={"Range between 38 to 50 inches"}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          {...form.getInputProps("chest")}
        />
        <NumberInput
          hideControls
          label={"Shoulder"}
          description={"Range between 10 to 22 inches"}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          {...form.getInputProps("shoulder")}
        />
        <NumberInput
          hideControls
          label={"Waist"}
          description={"Range between 25 to 50 inches"}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          {...form.getInputProps("waist")}
        />
        <NumberInput
          hideControls
          label={"Thigh"}
          description={"Range between 20 to 30 inches"}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          {...form.getInputProps("thighs")}
        />
        <NumberInput
          hideControls
          label={"Weight"}
          description={"Range between 40 to 120 Kg"}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          {...form.getInputProps("weight")}
        />
        <Button my={"md"} type="submit" fullWidth mt="xl" loading={loading}>
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default MeasurementsCreator
