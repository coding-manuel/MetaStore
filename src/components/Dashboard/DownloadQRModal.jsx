import React, { useEffect, useState } from "react"
import { Button, Modal, Stack, useMantineTheme } from "@mantine/core"
import { QRCode } from "react-qrcode-logo"
import LogoDark from "/assets/type-logo-dark.svg"

export default function DownloadQRModal({
  downloadQRModalOpen,
  setDownloadQRModalOpen,
  setRefreshProductList,
  shopInfo,
  productInfo,
}) {
  const theme = useMantineTheme()
  const [loading, setLoading] = useState(false)

  const handleModalClose = () => {
    if (!loading) {
      setDownloadQRModalOpen(false)
    }
  }

  const handleDownload = () => {
    const qrCodeCanvas = document.getElementById("qr-code")

    var link = document.createElement("a")
    link.download = productInfo.product_sku
    link.href = qrCodeCanvas.toDataURL()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Modal
      title="Download QR"
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      closeOnEscape
      onClose={handleModalClose}
      opened={downloadQRModalOpen}
      exitTransitionDuration={250}
    >
      <Stack align="center">
        <QRCode
          id="qr-code"
          size={256}
          value={`https://www.themetastore.tech/product/${shopInfo.shop_name}/${productInfo?.product_id}`}
        />
        <Button onClick={handleDownload}>Download</Button>
      </Stack>
    </Modal>
  )
}
