import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";

export const DetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <Typography variant="h4">Hello from Detail page</Typography>
      <Typography variant="h6">User Id: {id}</Typography>
      <Button variant="text">
        <Link to="/list">Back to list page</Link>
      </Button>
    </>
  );
};
