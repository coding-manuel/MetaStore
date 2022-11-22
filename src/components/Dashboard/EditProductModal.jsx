import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import uuid from "react-uuid";

import { supabase } from "../../utils/supabaseClient";
import { CreateProductStep2 } from "../CreateProduct/CreateProductStep2";
import { axiosInst } from "../../utils/axios";
import {
  deleteFile,
  getUploadDetails,
  uploadFile,
} from "../../utils/ImageFunctions";

export default function EditProductModal({
  editProductModalOpen,
  setEditProductModalOpen,
  setRefreshProductList,
  productInfo,
}) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const handleModalClose = () => {
    if (!loading) {
      setEditProductModalOpen(false);
      setProductImages();
    }
  };

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const product_id = productInfo.product_id;
      let imagesPath = [];

      let path = uploadedImages[0][0];

      const deletePromises = await deletedImages.map(async (image) => {
        await deleteFile(image[0]);
      });

      await Promise.all(deletePromises);

      const promises = await uploadedImages.map(async (image, index) => {
        if (typeof image[0] === "object") {
          let path = `${product_id}/${uuid()}-product-img`;
          imagesPath.push(path);
          let data = await getUploadDetails();
          await uploadFile(image[0][0], product_id, path, data);
        } else {
          imagesPath.push(image[0]);
        }
      });

      await Promise.all(promises);

      // create shop page
      const { error } = await supabase
        .from("products")
        .update({
          product_name: value.product_name,
          product_brand: value.product_brand,
          product_description: value.product_description,
          product_type: value.product_type,
          product_gender: value.product_gender,
          product_color: value.product_color,
          product_material: value.product_material,
          product_mrp: value.product_mrp,
          product_price: value.product_price,
          product_discount: value.product_discount,
          product_sku: value.product_sku,
          product_images: imagesPath,
          product_thumbnail: imagesPath[0],
        })
        .eq("product_id", productInfo.product_id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEditProductModalOpen(false);
      setRefreshProductList((prev) => !prev);
    }
  };

  const setProductImages = () => {
    setUploadedImages(
      productInfo.product_images.map((img) => {
        return [img, import.meta.env.VITE_PRODUCTIMG_URL + "/" + img, img];
      })
    );
  };

  useEffect(() => {
    if (productInfo) {
      setProductImages();
    }
  }, [productInfo]);

  return (
    <Modal
      title="Edit Product"
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      closeOnEscape
      onClose={handleModalClose}
      opened={editProductModalOpen}
      exitTransitionDuration={250}
      size="xl"
    >
      <CreateProductStep2
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        formData={productInfo}
        editProduct={true}
        handleEditSubmit={handleSubmit}
        setDeletedImages={setDeletedImages}
        finalLoading={loading}
      />
    </Modal>
  );
}
