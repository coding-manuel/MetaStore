import { createStyles, Container, Group, Anchor, Text } from "@mantine/core";
import Logo from "/assets/type-logo.svg";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid white`,
    background: theme.colors.dark[7],
  },

  inner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    margin: "0 48px",

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
    <Anchor component={Link} color="dimmed" to={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container size="xl" h={"100%"}>
        <Group position="apart" className={classes.inner}>
          <img src={Logo} style={{ height: 20 }} />
          <Group className={classes.links}>{items}</Group>
        </Group>
      </Container>
    </div>
  );
}
