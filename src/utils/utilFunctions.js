import { useRef, useEffect, useCallback } from "react"
import { Resizer } from "./resizeFile"

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

export function useTimeout(callback, delay) {
  const timeoutRef = useRef(null)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay)
      return () => window.clearTimeout(timeoutRef.current)
    }
  }, [delay])
  return timeoutRef
}

export const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = useRef(null)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    let isEnabled = typeof minDelay === "number" && typeof maxDelay === "number"
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }
    return () => window.clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])
  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current)
  }, [])
  return cancel
}

export const resizeFile = (file, width, height) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      "file"
    )
  })

export const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // validate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
) // validate fragment locator

export const getImageUrl = (image_id) => {
  return `${import.meta.env.VITE_PRODUCTIMG_URL}/${image_id}`
}

export const normaliseValue = (val, min, max) => {
  return (val - min) / (max - min)
}

export function b64toFile(dataURI, contentType) {
  var byteString = atob(dataURI.split(",")[1])

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // Convert the binary data to a Blob object
  var blob = new Blob([ab], { type: mimeString })

  // Create a new File object from the Blob object
  var file = new File([blob], "texture", { type: mimeString })

  return file
}
