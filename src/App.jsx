import React from "react";
import { MantineProvider, ColorSchemeProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

import { globalStyles, bodyStyles } from "./globalStyles";
import Creator from "./pages/Creator";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const theme = {
    components: globalStyles,
    colorScheme,
    primaryColor: "yellow",
    primaryShade: 4,

    black: "#323232",

    colors: {
      yellow: [
        "#fff3dc",
        "#fbdfb3",
        "#f6ca86",
        "#f1b559",
        "#eea02b",
        "#d48611",
        "#a5690b",
        "#774b06",
        "#482c00",
        "#1d0e00",
      ],
      gray: [
        "#F2F2F2",
        "#DBDBDB",
        "#C4C4C4",
        "#ADADAD",
        "#969696",
        "#808080",
        "#666666",
        "#4D4D4D",
        "#333333",
        "#1A1A1A",
      ],
    },

    lineHeight: 1.3,
    headings: {
      fontFamily: "IBM Plex Sans, sans-serif",
      fontWeight: 500,
      sizes: {
        h1: { fontSize: "5.653rem" },
        h2: { fontSize: "3.998rem" },
        h3: { fontSize: "2.827rem" },
        h4: { fontSize: "1.999rem" },
        h5: { fontSize: "1.414rem" },
        h6: { fontSize: "0.707rem" },
      },
    },
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <Global styles={bodyStyles} />
          <Creator />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
