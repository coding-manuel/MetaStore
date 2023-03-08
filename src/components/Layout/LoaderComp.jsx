import { Loader } from "@mantine/core"
import React from "react"

const LoaderComp = ({ children }, props) => {
  return !props ? <Loader /> : children
}

export default LoaderComp
