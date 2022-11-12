import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { HeadFootLayout } from "../components/Layout";

export default function Home() {
  return (
    <HeadFootLayout>
      <div>
        <Button component={Link} to="/creator">
          Style Yourself
        </Button>
      </div>
    </HeadFootLayout>
  );
}
