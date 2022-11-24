import React, { useState } from "react";
import { Stepper, Container } from "@mantine/core";
import { useBeforeunload } from "react-beforeunload";

import { FootLayout } from "../Layout/Layout";
import { CreateProductStep1 } from "./CreateProductStep1";
import { CreateProductStep2 } from "./CreateProductStep2";
import { CreateProductStep3 } from "./CreateProductStep3";

export default function CreateProduct() {
  const [active, setActive] = useState(1);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [sizeData, setSizeData] = useState([
    {
      sizeName: "XS",
      sizeMeasurements: [39, 26, 7],
      available: 0,
    },
    {
      sizeName: "S",
      sizeMeasurements: [40, 7.5, 27],
      available: 0,
    },
    {
      sizeName: "M",
      sizeMeasurements: [42, 28, 8],
      available: 0,
    },
    {
      sizeName: "L",
      sizeMeasurements: [44, 29, 8.5],
      available: 0,
    },
    {
      sizeName: "XL",
      sizeMeasurements: [],
      available: 0,
    },
    {
      sizeName: "XXL",
      sizeMeasurements: ["", "", ""],
      available: 0,
    },
  ]);

  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useBeforeunload(() => "Bruh");

  return (
    <FootLayout>
      <Container sx={{ width: "90%" }} size="md" pb={16}>
        <Stepper active={active}>
          <Stepper.Step>
            <CreateProductStep1
              active={active}
              prevStep={prevStep}
              nextStep={nextStep}
              formData={stepOneData}
              setFormData={setStepOneData}
            />
          </Stepper.Step>
          <Stepper.Step>
            <CreateProductStep2
              active={active}
              prevStep={prevStep}
              nextStep={nextStep}
              formData={stepTwoData}
              setFormData={setStepTwoData}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
              sizeData={sizeData}
              setSizeData={setSizeData}
            />
          </Stepper.Step>
          <Stepper.Step>
            <CreateProductStep3
              productData={stepTwoData}
              productImages={uploadedImages}
              sizeData={sizeData}
              prevStep={prevStep}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </FootLayout>
  );
}
