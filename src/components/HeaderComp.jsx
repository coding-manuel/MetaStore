import {
  createStyles,
  Header,
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Avatar,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SignOut, User } from "phosphor-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/assets/type-logo.svg";
import useMainStore from "../store/mainStore";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderComp() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const userId = useMainStore((state) => state.user);
  const shopName = useMainStore((state) => state.shopName);
  const role = useMainStore((state) => state.role);
  const handleLogOut = useMainStore((state) => state.handleLogOut);

  const navigate = useNavigate();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <img
            onClick={() => navigate("/")}
            src={Logo}
            style={{ height: 20, cursor: "pointer" }}
          />

          <Group className={classes.hiddenMobile} hidden={userId}>
            <Button component={Link} to="/signin" variant="default">
              Log in
            </Button>
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </Group>

          {userId !== null && (
            <Group className={classes.hiddenMobile}>
              <Menu
                width={180}
                position="bottom-end"
                transition="pop-top-right"
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
              >
                <Menu.Target>
                  <UnstyledButton>
                    <Group spacing={7}>
                      <Avatar radius="xl" />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {role == "owner" ? (
                    <Menu.Item
                      component={Link}
                      to={`/dashboard/${shopName}`}
                      icon={<User size={16} />}
                    >
                      Shop Page
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      component={Link}
                      to="/profile"
                      icon={<User size={16} />}
                    >
                      Profile
                    </Menu.Item>
                  )}
                  <Menu.Item
                    component={Link}
                    to="/signin"
                    onClick={handleLogOut}
                    icon={<SignOut size={16} />}
                    color="red"
                  >
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<img src={Logo} style={{ height: 20 }} />}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
            </Center>
          </UnstyledButton>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group
            hidden={userId !== null}
            position="center"
            grow
            pb="xl"
            px="md"
          >
            <Button component={Link} to="/signin" variant="default">
              Log in
            </Button>
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </Group>

          <Group
            hidden={userId === null}
            position="center"
            grow
            pb="xl"
            px="md"
          >
            {role == "owner" ? (
              <Button
                component={Link}
                to={`/dashboard/${shopName}`}
                leftIcon={<User size={16} />}
              >
                Shop Page
              </Button>
            ) : (
              <Button
                component={Link}
                to="/profile"
                leftIcon={<User size={16} />}
              >
                Profile
              </Button>
            )}
            <Button
              component={Link}
              to="/signin"
              onClick={handleLogOut}
              leftIcon={<SignOut size={16} />}
              color="red"
            >
              Log out
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
