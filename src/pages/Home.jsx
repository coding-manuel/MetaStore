import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div>
        <Button component={Link} to="/creator">
          Style Yourself
        </Button>
      </div>
    </Layout>
  );
}
