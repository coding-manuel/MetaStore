import React, { useState } from "react";
import {
  Box,
  Group,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import produce from "immer";

const productSizes = {
  top: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"],
  bottom: ["28", "30", "32", "34", "36", "38", "40", "42"],
};

const productTypes = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
];

const sizeTemplateTop = [
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
];

const sizeTemplateBottom = [
  {
    sizeName: "28",
    sizeMeasurements: [28],
    available: 0,
  },
  {
    sizeName: "30",
    sizeMeasurements: [30],
    available: 0,
  },
  {
    sizeName: "32",
    sizeMeasurements: [32],
    available: 0,
  },
  {
    sizeName: "34",
    sizeMeasurements: [34],
    available: 0,
  },
  {
    sizeName: "36",
    sizeMeasurements: [36],
    available: 0,
  },
  {
    sizeName: "38",
    sizeMeasurements: [38],
    available: 0,
  },
  {
    sizeName: "40",
    sizeMeasurements: [40],
    available: 0,
  },
  {
    sizeName: "42",
    sizeMeasurements: [42],
    available: 0,
  },
];

const headerTemplate = {
  top: ["Size", "Chest", "Sleeves", "Length", "Quantity"],
  bottom: ["Size", "Waist", "Quantity"],
};
export default function SizeInput({ sizeData, setSizeData, editProduct }) {
  const [sizeMethod, setSizeMethod] = useState("top");

  const handleSizeMethodChange = (item) => {
    setSizeMethod(item);
    if (item === "top") {
      setSizeData(sizeTemplateTop);
    } else {
      setSizeData(sizeTemplateBottom);
    }
  };

  const handleQuantityChange = (val, idx) => {
    setSizeData(
      produce(sizeData, (draftData) => {
        draftData[idx].available = val;
      })
    );
  };

  return (
    sizeData.length != 0 && (
      <Stack>
        {!editProduct && (
          <Select
            required
            label="Sizing Method"
            value={sizeMethod}
            onChange={handleSizeMethodChange}
            data={productTypes}
          />
        )}
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 700 }} withBorder>
            <thead>
              <tr>
                <th>Size</th>
                {sizeData.map((colVal) => (
                  <th>{colVal.sizeName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quantity</td>
                {sizeData.map((colVal, index) => (
                  <td>
                    <NumberInput
                      hideControls
                      min={0}
                      step={1}
                      value={colVal.available}
                      sx={{ width: 80, padding: "0 8px" }}
                      onChange={(val) => handleQuantityChange(val, index)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Box>
      </Stack>
    )
  );
}

const TopInput = ({ sizeInfo, sizeMethod }) => {
  return (
    <tr key={sizeInfo.sizeName}>
      <td>{sizeInfo.sizeName}</td>
      {/* {sizeInfo.sizeMeasurements.map((meas) => (
        <td>
          <NumberInput value={meas} />
        </td>
      ))} */}
      <td>
        <NumberInput value={sizeInfo.available} />
      </td>
    </tr>
  );
};
