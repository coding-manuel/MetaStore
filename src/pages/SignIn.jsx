import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
} from "@mantine/core";

import { supabase } from "../utils/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/assets/type-logo.svg";
import { showNotification } from "@mantine/notifications";
import { notificationStyles } from "../globalStyles";
import useMainStore from "../store/mainStore";
import { FootLayout } from "../components/Layout";

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUserData = useMainStore((state) => state.setUserData);
  const userId = useMainStore((state) => state.user);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      setUserData(data);

      setLoading(false);

      navigate("/");
    } catch (error) {
      showNotification({
        title: error.error_description || error.message,
        styles: notificationStyles,
      });

      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId !== null) navigate("/signin");
  }, []);

  return (
    <FootLayout>
      <Container size={420}>
        <Title align="center" order={3}>
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?
          <Anchor component={Link} to="/signup" pl={4} size="sm">
            Create account
          </Anchor>
        </Text>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          sx={{ width: 300 }}
        >
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              {...form.getInputProps("password")}
              mt="md"
            />
            <Group position="apart" mt="md">
              <Anchor
                onClick={(event) => event.preventDefault()}
                href="#"
                size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </FootLayout>
  );
}
