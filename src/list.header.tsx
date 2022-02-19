import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { CSSProperties } from "react";
import { FilterInput } from "./filter";

const toolbarStyles = {
  display: "flex",
} as CSSProperties;

const headerStyles = {
  marginRight: "10px",
  flex: "1",
} as CSSProperties;

export const ListHeader = () => (
  <AppBar position="sticky">
    <Toolbar style={toolbarStyles} variant="dense">
      <Typography style={headerStyles} variant="h6">
        Github Organizations
      </Typography>
      <FilterInput />
    </Toolbar>
  </AppBar>
);
