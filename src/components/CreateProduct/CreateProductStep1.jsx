import React, { useEffect, useRef, useState } from "react"
import { Button, Group, Stack, Title, Text, Paper } from "@mantine/core"

import { ProductPictureEditorComp } from "../AvatarEditorComp"
import useMainStore from "../../store/mainStore"
import { Link } from "react-router-dom"
import { axiosInst } from "../../utils/axios"
import axios from "axios"
import PreviewProduct from "./PreviewProduct"

export function CreateProductStep1({ nextStep, formData, setFormData }) {
  const shop_id = useMainStore((state) => state.shopName)

  const frontEditor = useRef(null)
  const backEditor = useRef(null)
  const [frontImage, setFrontImage] = useState(false)
  const [backImage, setBackImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [frontMask, setFrontMask] = useState("")
  const [backMask, setBackMask] = useState("")
  const [selectedColor, setSelectedColor] = useState(null)
  const [previewed, setPreviewed] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (formData) {
      setFrontImage(formData.frontImage)
      setBackImage(formData.backImage)
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      const frontImg = new Image()
      frontImg.src = frontImage[1]

      frontImg.onload = () => {
        const desiredHeightFront = 300

        const aspectRatioFront = frontImg.naturalWidth / frontImg.naturalHeight
        const newWidthFront = desiredHeightFront * aspectRatioFront

        canvas.width = newWidthFront
        canvas.height = 300
        ctx.drawImage(frontImg, 0, 0, newWidthFront, desiredHeightFront)
      }
    }
  }, [frontImage])

  const handleCanvasClick = (event) => {
    const canvas = event.target
    const context = canvas.getContext("2d")
    const pixelData = context.getImageData(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      1,
      1
    ).data
    const [r, g, b] = pixelData.slice(0, 3)
    const color = `rgb(${r}, ${g}, ${b})`

    setSelectedColor(color)
  }

  const handlePreview = async () => {
    setLoading(true)
    let formData = new FormData()
    formData.append("front", frontImage[0][0])
    formData.append("back", backImage[0][0])
    formData.append("color", "#ffffff")

    axios
      .post("https://flask-api.themetastore.tech/api/create-texture", formData)
      .then((response) => {
        // Handle the response
        setFrontMask(response.data.front)
        setBackMask(response.data.back)
      })
      .catch((error) => {
        // Handle the error
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        setPreviewed(true)
      })
  }

  const handleSubmit = () => {
    nextStep()
  }

  return (
    <Stack spacing={0}>
      <Text weight={700}>Step 1 of 3</Text>
      <Title order={4}>Upload Images</Title>
      <Group align="flex-start" grow noWrap my={16}>
        <ProductPictureEditorComp
          editor={frontEditor}
          artAccepted={frontImage}
          setArtAccepted={setFrontImage}
          type="Front"
        />
        <ProductPictureEditorComp
          editor={backEditor}
          artAccepted={backImage}
          setArtAccepted={setBackImage}
          type="Back"
        />
      </Group>
      {frontImage && (
        <>
          <Title order={5} pb={12}>
            Select Majority Color
          </Title>
          <Paper>
            <Group>
              <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>

              {selectedColor && (
                <div
                  style={{
                    backgroundColor: selectedColor,
                    width: "50px",
                    height: "50px",
                  }}
                ></div>
              )}
            </Group>
          </Paper>
        </>
      )}
      {previewed && (
        <>
          <Title order={5} pb={12}>
            Generated Texture
          </Title>
          <PreviewProduct
            selectedColor={selectedColor}
            frontMask={frontMask}
            backMask={backMask}
            setFormData={setFormData}
          />
        </>
      )}
      <Group position="right" mt="xl">
        <Button component={Link} to={`/dashboard/${shop_id}`} variant="default">
          Back
        </Button>
        <Button
          loading={loading}
          disabled={!frontImage || !backImage}
          onClick={previewed ? handleSubmit : handlePreview}
        >
          {previewed ? "Next Step" : "Preview"}
        </Button>
      </Group>
    </Stack>
  )
}
