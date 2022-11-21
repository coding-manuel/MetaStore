import React, { useEffect } from "react";
import { MantineProvider, ColorSchemeProvider, Global } from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { supabase } from "./utils/supabaseClient";
import { Navigate, Route, Routes } from "react-router-dom";

import { globalStyles, bodyStyles, notificationStyles } from "./globalStyles";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Creator from "./pages/Creator";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import useMainStore from "./store/mainStore";
import CreateShop from "./pages/CreateShop";
import Dashboard from "./pages/Dashboard";
import { ModalsProvider } from "@mantine/modals";
import CreateProduct from "./components/CreateProduct/CreateProduct";

function App() {
  const setUserData = useMainStore((state) => state.setUserData);
  const userId = useMainStore((state) => state.user);
  const onResize = useMainStore((state) => state.onResize);
  const setRole = useMainStore((state) => state.setRole);
  const role = useMainStore((state) => state.role);

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
    primaryShade: 5,

    black: "#323232",

    colors: {
      red: [
        "#ffe3e3",
        "#feb6b6",
        "#f78888",
        "#f25959",
        "#d41212",
        "#ed2b2b",
        "#a60b0d",
        "#770608",
        "#4a0203",
        "#200000",
      ],
      yellow: [
        "#fff3dc",
        "#fbdfb3",
        "#f6ca86",
        "#f1b559",
        "#eea02b",
        "#e1921c",
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
        h5: { fontSize: "1.614rem" },
        h6: { fontSize: "0.707rem" },
      },
    },
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserData(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUserData(session);
    });
  }, []);

  useEffect(() => {
    document
      .querySelector(":root")
      .style.setProperty("--vh", window.innerHeight / 100 + "px");

    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <ModalsProvider>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <Global styles={bodyStyles} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/creator" element={<Creator />} />
              <Route
                path="/createshop"
                element={
                  <PrivateRoute user={userId}>
                    <CreateShop />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/:shop_id"
                element={
                  <PrivateRoute user={userId}>
                    <AdminRoute role={role}>
                      <Dashboard />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/create_product"
                element={
                  <PrivateRoute user={userId}>
                    <AdminRoute role={role}>
                      <CreateProduct />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute user={userId}>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </NotificationsProvider>
        </MantineProvider>
      </ModalsProvider>
    </ColorSchemeProvider>
  );
}

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    showNotification({
      title: "Session Expired",
      message: "Cannot find your session",
      styles: notificationStyles,
    });
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const AdminRoute = ({ role, children }) => {
  if (role !== "owner") {
    showNotification({
      title: "Looks like you were lost",
      styles: notificationStyles,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;
