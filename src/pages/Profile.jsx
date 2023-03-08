import React from "react"
import BodyCustomise from "../components/Profile/BodyCustomise"
import { SplitLayout } from "../components/Layout/Layout"
import { useDocumentTitle } from "@mantine/hooks"

export default function Profile() {
  useDocumentTitle("Home page | Metastore")

  return (
    <SplitLayout>
      <BodyCustomise />
    </SplitLayout>
  )
}
