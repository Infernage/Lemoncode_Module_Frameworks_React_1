import {
  AppBar,
  ButtonBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { CSSProperties, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext, TEngine } from "../../../global.context";
import { FilterInput } from "../../filter/filter";

const toolbarStyles = {
  display: "flex",
} as CSSProperties;

const headerStyles = {
  marginRight: "10px",
  flex: "1",
} as CSSProperties;

export const ListHeader = () => {
  const navigate = useNavigate();
  const { searchEngine, setSearchEngine } = useContext(GlobalContext);
  const [anchor, setAnchor] = useState(null);

  const onClose = () => {
    setAnchor(null);
  };

  const navigateTo = (engine: TEngine) => {
    if (engine === searchEngine) return;

    setSearchEngine(null);
    navigate(`../${engine}`, { replace: false });
  };

  return (
    <AppBar position="sticky">
      <Toolbar style={toolbarStyles} variant="dense">
        <Typography style={headerStyles} variant="h6">
          <ButtonBase
            style={{ fontSize: "inherit", color: "inherit" }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            {searchEngine} API
          </ButtonBase>
        </Typography>
        <FilterInput />
      </Toolbar>
      <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={onClose}>
        <MenuItem
          onClick={() => navigateTo("Github")}
          disabled={searchEngine === "Github"}
        >
          Github
        </MenuItem>
        <MenuItem
          onClick={() => navigateTo("RickyMorty")}
          disabled={searchEngine === "RickyMorty"}
        >
          Ricky And Morty
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
