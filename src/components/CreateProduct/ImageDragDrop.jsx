import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {} from "@dnd-kit/modifiers";
import SortableItem from "./SortableItem";
import { Group, Paper } from "@mantine/core";

export default function ImageDragDrop({ uploadedImages, setUploadedImages }) {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDelete = (key) => {
    setUploadedImages((prevState) =>
      prevState.filter(function (item) {
        return item[2] !== key;
      })
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id != over.id) {
      setUploadedImages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={uploadedImages}>
        <Paper shadow="sm" p="md" sx={{ overflowY: "hidden", width: "100%" }}>
          <Group position="center">
            {uploadedImages.map((img) => (
              <SortableItem
                handleDelete={handleDelete}
                key={img}
                id={img}
                uploadedImage={img}
              />
            ))}
          </Group>
        </Paper>
      </SortableContext>
    </DndContext>
  );
}
