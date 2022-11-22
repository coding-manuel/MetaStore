import { Container, LoadingOverlay } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeadFootLayout } from "../components/Layout/Layout";
import ProductContent from "../components/ProductPage/ProductContent";
import useMainStore from "../store/mainStore";

export default function ProductPage() {
  const [loading, setLoading] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchShopByName = useMainStore((state) => state.fetchShopByName);
  const fetchProductByID = useMainStore((state) => state.fetchProductByID);

  const { shop_name, product_id } = useParams();

  const getData = async () => {
    setLoading(true);
    let shopdata = await fetchShopByName(shop_name);
    setShopData(shopdata.data);
    let productdata = await fetchProductByID(product_id);
    setProductData(productdata.data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <HeadFootLayout>
      <LoadingOverlay
        visible={loading}
        overlayBlur={2}
        radius="xs"
        transitionDuration={250}
      />
      {productData !== null && (
        <Container size="md">
          <ProductContent
            productData={productData}
            productImages={productData.product_images}
          />
        </Container>
      )}
    </HeadFootLayout>
  );
}
