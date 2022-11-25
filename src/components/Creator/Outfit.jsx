import { Button, Group } from "@mantine/core";
import React from "react";
import useCharacterStore from "../../store/characterStore";

export default function Outfit() {
  const updateMaterial = useCharacterStore((state) => state.updateMaterial);
  return (
    <Group>
      <Button onClick={() => updateMaterial("shoe", "Shoes-White-01")}>
        White
      </Button>
      <Button onClick={() => updateMaterial("shoe", "Shoes-Black-01")}>
        Black
      </Button>
    </Group>
  );
}
