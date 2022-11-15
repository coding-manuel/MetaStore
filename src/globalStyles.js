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

  ActionIcon: {
    styles: (theme) => ({
      root: {
        width: "32px",
        height: "32px",
        padding: "5px",
        color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.white : theme.black
        }`,
        "&:hover": {
          color: theme.white,
          background: `${theme.colors.orange[5]}`,
        },
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
      item: {
        padding: "6px 8px",
        margin: "2px 0",
        color: theme.colors.gray[1],
        "&[data-hovered]": {
          backgroundColor: theme.colors.yellow[4],
          color: theme.white,
        },
      },
    }),
  },

  Tabs: {
    styles: (theme) => ({
      tabsList: { gap: 8, color: "green" },
      tab: {
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.white : theme.black
        }`,
      },
      tabLabel: {
        color: `${theme.white}!important`,
        fontWeight: 500,
      },
      body: { padding: "16px 0px" },
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
        backgroundColor: theme.colors.dark[7],
      },
    }),
  },

  Modal: {
    styles: (theme) => ({
      modal: {
        padding: "0px!important"
      },
      header: {
        width: '100%',
        borderBottom: "1px solid white",
        padding: '16px 20px',
        margin: 0
      },
      body: {
        padding: '16px 20px'
      }
    }),
  },

  Carousel: {
    styles: () => ({
      viewport: {
        padding: "8px 8px",
      }
    })
  },

  Button: {
    styles: (theme) => ({
      filled: {
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.white : theme.black
        } !important`,
        transition: ".2s ease",
        "&:hover": {
          background: `${theme.colors.orange[5]}!important`,
          transform: "translate(0px, -3px)",
        },
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
      body: { color: theme.white, backgroundColor: theme.black },
    }),
  },

  // MultiSelect: {
  //   styles: () => ({
  //     input: {
  //     },
  //   }),
  // },
};

export const notificationStyles = (theme) => ({
  root: {
    backgroundColor: `${
      theme.colorScheme === "dark" ? theme.black : theme.white
    }`,
    borderColor: theme.colors.orange[4],
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
    "&:hover": { backgroundColor: theme.colors.orange[4] },
  },
});

export const bodyStyles = () => ({
  // "::-moz-selection": { background: "#eea02b" },

  // "::selection": { background: "#eea02b" },

  "::-webkit-scrollbar-track": {
    webkitBoxShadow: "inset 0 0 6px #333333",
    backgroundColor: "#111111",
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

  body: {
    // overflow: 'hidden',
    backgroundColor: '#141517',
    height: "calc(100 * var(--vh) - 1px)",
  },

  "#root": {
    height: "inherit",
  },
});
