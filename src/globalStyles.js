import { TextAlignJustify } from "phosphor-react";

export const globalStyles = {
  Header: {
    styles: (theme) => ({
      root: {
        borderBottom: `1px solid ${
          theme.colorScheme === "dark" ? theme.white : theme.black
        }`,
      },
    }),
  },

  Avatar: {
    styles: () => ({
      placeholder: { backgroundColor: "transparent" },
    }),
  },

  Menu: {
    styles: (theme) => ({
      dropdown: {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
      item: {
        padding: "6px 8px",
        margin: "2px 0",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        transition: ".1s ease",
        "&[data-hovered]": {
          backgroundColor: theme.colors.yellow[5],
          color: theme.white,
        },
      },
    }),
  },

  Switch: {
    styles: (theme) => ({
      label: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    }),
  },

  Tabs: {
    styles: (theme) => ({
      tab: {
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.white : theme.black
        }`,
        '&[aria-selected="true"]': {
          color: theme.white,
        },
      },
      tabLabel: {
        fontWeight: 500,
      },
    }),
  },

  InputWrapper: {
    styles: (theme) => ({
      label: { fontWeight: 600, marginBottom: 4 },
    }),
  },

  TextInput: {
    styles: (theme) => ({
      filledVariant: {
        border: `1px solid ${
          theme.colorScheme === "dark" ? "#8e8e8e" : "#bbbbbb"
        }`,
        background: `${theme.colors.dark[6]}!important`,
        "&:hover, &:focus": { background: `${theme.colors.dark[5]}!important` },
        transition: ".1s ease-in",
      },
      defaultVariant: {
        border: `1px solid ${
          theme.colorScheme === "dark" ? "#8e8e8e" : "#bbbbbb"
        }`,
        background: `${theme.colors.gray[0]}!important`,
        "&:hover, &:focus": { background: `${theme.colors.gray[1]}!important` },
        transition: ".1s ease-in",
      },
      error: { fontSize: 12 },
    }),
  },

  Paper: {
    styles: (theme) => ({
      root: {
        backgroundColor: `${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0]
        }`,
      },
    }),
  },

  Modal: {
    styles: (theme) => ({
      modal: {
        padding: "0px!important",
      },
      header: {
        width: "100%",
        borderBottom: "1px solid white",
        padding: "16px 20px",
        margin: 0,
      },
      body: {
        padding: "16px 20px",
      },
      close: {
        width: 32,
        height: 32,
        color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.black
        }`,
        transition: "0.1s ease",
        "&:hover": {
          color: theme.white,
          background: theme.colors.yellow[5],
          border: `1px solid transparent`,
        },
      },
    }),
  },

  Carousel: {
    styles: () => ({
      viewport: {
        padding: "8px 8px",
      },
    }),
  },

  Dropzone: {
    styles: () => ({
      root: { padding: 0, borderStyle: "solid" },
    }),
  },

  Tooltip: {
    styles: (theme) => ({
      tooltip: {
        color: `${theme.colorScheme === "dark" ? theme.black : theme.white}`,
        backgroundColor: `${
          theme.colorScheme === "dark" ? theme.white : theme.black
        }`,
      },
    }),
  },

  Button: {
    styles: (theme) => ({
      root: { transition: "0.15s ease" },
    }),
  },

  Carousel: {
    styles: (theme) => ({
      indicator: {
        backgroundColor: theme.colors.yellow[5],
      },
    }),
  },
};

export const notificationStyles = (theme) => ({
  root: {
    backgroundColor: `${
      theme.colorScheme === "dark" ? theme.black : theme.white
    }`,
    borderColor: theme.colors.yellow[4],
    borderWidth: 2,
    paddingLeft: 12,

    "::before": {
      width: 0,
    },
  },
  title: {
    color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
    fontWeight: 600,
  },
  message: {
    color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
  },
  closeButton: {
    color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
    transition: "0.1s ease-out",
    "&:hover": { backgroundColor: theme.colors.yellow[4] },
  },
});

export const bodyStyles = (theme) => ({
  html: {
    [theme.fn.smallerThan('sm')]: {
      fontSize: 12,
    },

    [theme.fn.largerThan("sm")]: {
      fontSize: 14,
    },
  },

  "--separator-border": "rgb(225 146 28)",

  "::-moz-selection": { color: "white", background: "#eea02b" },

  "::selection": { color: "white", background: "#eea02b" },

  "::-webkit-scrollbar-track": {
    webkitBoxShadow: "inset 0 0 6px #333333",
    backgroundColor: "#212121",
  },

  "::-webkit-scrollbar": {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: "#555555",
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: 20,
    backgroundColor: "#eea02b",
    border: "none",
  },

  "#root": {
    height: "inherit",
    fontSize: "1rem!important",
  },
});
