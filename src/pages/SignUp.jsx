import React, { useState } from "react";
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

export function SignUp() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length < 3 ? "Invalid Name" : null),
    },
  });

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
          },
        },
      });

      setLoading(false);

      if (error) throw error;

      showNotification({
        title: "Login using your credentials",
        styles: notificationStyles,
      });

      navigate("/signin");
    } catch (error) {
      showNotification({
        title: error.error_description || error.message,
        styles: notificationStyles,
      });
    }
  };

  return (
    <Stack py={40} sx={{ height: "100%" }} justify="space-between">
      <Container size={420}>
        <Title align="center" order={3}>
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do you have an account?
          <Anchor component={Link} to="/signin" pl={4} size="sm">
            Log in
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
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <TextInput
              label="Email"
              required
              {...form.getInputProps("email")}
              mt="md"
            />
            <PasswordInput
              label="Password"
              required
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
              Sign up
            </Button>
          </form>
        </Paper>
      </Container>
      <img src={Logo} style={{ height: 20 }} />
    </Stack>
  );
}
