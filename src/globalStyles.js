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
      body: {
        padding: 0,
        background: "transparent",
        border: "none",
        boxShadow: "none",
      },
      item: {
        padding: "6px 8px",
        background:
          theme.colorScheme !== "dark"
            ? theme.colors.gray[0]
            : theme.colors.dark[6],
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.white : theme.black
        }`,
        margin: "2px 0",
      },
      itemHovered: {
        backgroundColor: `${
          theme.colorScheme !== "dark"
            ? theme.colors.orange[3]
            : theme.colors.dark[5]
        }!important`,
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
        fontWeight: 500
      },
      body: { padding: "16px 0px" },
    }),
  },

  TextInput: {
    styles: (theme) => ({
      label: { fontWeight: 600 },
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

  Textarea: {
    styles: () => ({
      input: {
        paddingTop: "8px !important",
        paddingBottom: "4px !important",
        height: "35px",
      },
    }),
  },
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
    fontSize: 12,
    fontWeight: 600,
  },
  description: {
    color: `${theme.colorScheme === "dark" ? theme.white : theme.black}`,
    fontSize: 10,
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

  '::-webkit-scrollbar-track':
  {
    webkitBoxShadow: 'inset 0 0 6px #333333',
    backgroundColor: '#111111',
  },

  '::-webkit-scrollbar':
  {
    width: 8,
    borderRadius: 20,
    backgroundColor: '#555555',
  },

  '::-webkit-scrollbar-thumb':
  {
    borderRadius: 20,
    backgroundColor: '#eea02b',
	  border: 'none',
  },

  "#root": { height: "100vh" },
});
