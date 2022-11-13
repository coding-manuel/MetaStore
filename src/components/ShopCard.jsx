import { Card, Text, Group, Center, createStyles } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef("image");

  return {
    card: {
      position: "relative",
      height: 150,
      width: 150,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      transition: "box-shadow 150ms ease, transform 150ms ease",
      cursor: "pointer",

      "&:hover": {
        boxShadow: `${theme.shadows.md} !important`,
        transform: "scale(1.05)",
      },
    },

    image: {
      ref: image,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
      transition: "transform 500ms ease",
    },
  };
});

export function ShopCard({ image, link }) {
  const { classes, theme } = useStyles();

  return (
    <Carousel.Slide>
      <Card
        p="lg"
        m={0}
        shadow="lg"
        className={classes.card}
        radius="md"
        component="a"
        href={link}
        target="_blank"
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_SUPABASE_PUBLIC_URL + "/" + image
            })`,
          }}
        />
      </Card>
    </Carousel.Slide>
  );
}
