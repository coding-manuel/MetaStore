import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, ActionIcon, Button, Image, Skeleton, Paper } from "@mantine/core";
import { DotsSix, Trash } from "phosphor-react";
import CustomActionIcon from "../CustomActionIcon";
import useMainStore from "../../store/mainStore";
import { useToggle } from "@mantine/hooks";

export default function SortableItem({ uploadedImage, id, handleDelete }) {
  const [loading, toggleLoading] = useToggle([true, false]);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Paper withBorder shadow="md">
        <Box h={{ base: 150, sm: 250 }} style={{ position: "relative" }}>
          <Skeleton
            sx={{ height: "inherit" }}
            width={loading && 200}
            visible={loading}
            radius={0}
          >
            <img
              onLoad={() => toggleLoading(false)}
              src={uploadedImage[1]}
              style={{ height: "inherit" }}
              alt=""
            />
          </Skeleton>

          <CustomActionIcon
            variant="filled"
            color="red"
            tooltip="Delete"
            sx={{ position: "absolute", right: 5, top: 5 }}
            onClick={() => handleDelete(uploadedImage[2])}
          >
            <Trash size={16} />
          </CustomActionIcon>
        </Box>

        <Box
          sx={(theme) => ({
            borderRadius: 0,
            cursor: "grab",
            textAlign: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.white,
            color:
              theme.colorScheme === "dark" ? theme.colors.white : theme.dark,
          })}
          h={24}
          w={"100%"}
          {...listeners}
        >
          <DotsSix size={20} weight="bold" />
        </Box>
      </Paper>
    </div>
  );
}
