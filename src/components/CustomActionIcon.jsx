import React from "react";
import { ActionIcon } from "@mantine/core";

export default function CustomActionIcon(props) {
  return (
    <ActionIcon
      sx={(theme) => ({
        width: "32px",
        height: "32px",
        padding: "4px",
        color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.black
        }`,
        "&:hover": {
          color: theme.white,
          background: `${
            props.color ? theme.colors[props.color][5] : theme.colors.yellow[5]
          }`,
          border: `1px solid transparent`,
          transition: "0.15s ease",
        },
      })}
      {...props}
    >
      {props.children}
    </ActionIcon>
  );
}
