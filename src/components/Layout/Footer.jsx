import {
  createStyles,
  Container,
  Group,
  Anchor,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import LogoLight from "/assets/type-logo-light.svg";
import LogoDark from "/assets/type-logo-dark.svg";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.white : theme.black
    }`,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  inner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    margin: "0 16px",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function Footer() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { classes } = useStyles();
  const links = [
    {
      label: "Shop Setup",
      link: "/createshop",
    },
    {
      label: "Register",
      link: "/signup",
    },
  ];
  const items = links.map((link) => (
    <Anchor
      key={link.link}
      component={Link}
      color="dimmed"
      to={link.link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Group position="apart" className={classes.inner}>
        <img
          src={colorScheme === "dark" ? LogoLight : LogoDark}
          style={{ height: 20 }}
        />
        <Group className={classes.links}>{items}</Group>
      </Group>
    </div>
  );
}
