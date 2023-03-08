import React, { useRef, useEffect } from "react"
import { b64toFile } from "../../utils/utilFunctions"

const PreviewProduct = ({
  frontMask,
  backMask,
  selectedColor,
  setFormData,
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const frontImg = new Image()
    frontImg.src = "data:image/png;base64," + frontMask

    const backImg = new Image()
    backImg.src = "data:image/png;base64," + backMask

    const textureImage = new Image()

    textureImage.src = "/assets/tex.png"

    Promise.all(
      [frontImg, backImg, textureImage].map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve
          })
      )
    ).then(() => {
      // Set the canvas width and height to match the image dimensions
      canvas.width = textureImage.width
      canvas.height = textureImage.height

      ctx.fillStyle = selectedColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // // Draw the image on the canvas
      // ctx.drawImage(textureImage, 0, 0)

      const desiredHeightFront = 400

      const aspectRatioFront = frontImg.naturalWidth / frontImg.naturalHeight
      const newWidthFront = desiredHeightFront * aspectRatioFront

      ctx.drawImage(frontImg, 30, -65, newWidthFront, desiredHeightFront)

      const desiredHeightBack = 400

      const aspectRatioBack = backImg.naturalWidth / backImg.naturalHeight
      const newWidthBack = desiredHeightBack * aspectRatioBack

      ctx.drawImage(backImg, 0, 180, newWidthBack, desiredHeightBack)

      let uri = canvas.toDataURL("image/png")

      let tex = b64toFile(uri, "image/png")

      setFormData(tex)
    })
  }, [frontMask, backMask])

  return <canvas ref={canvasRef} />
}

export default PreviewProduct
