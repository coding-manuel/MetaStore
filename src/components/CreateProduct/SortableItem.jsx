import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, ActionIcon, Button } from "@mantine/core";
import { DotsSix, Trash } from "phosphor-react";

export default function SortableItem({ uploadedImage, id, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Box mb={24} h={{ base: 150, sm: 250 }} style={{ position: "relative" }}>
        <img src={uploadedImage[1]} style={{ height: "inherit" }} alt="" />
        <ActionIcon
          variant="filled"
          color="red"
          sx={{ position: "absolute", right: 0, top: 0 }}
          onClick={() => handleDelete(uploadedImage[2])}
        >
          <Trash size={16} />
        </ActionIcon>
        <Button
          sx={{ position: "absolute", right: 0, bottom: -24, borderRadius: 0 }}
          variant="default"
          h={24}
          w={"100%"}
          {...listeners}
        >
          <DotsSix size={16} weight="bold" />
        </Button>
      </Box>
    </div>
  );
}
