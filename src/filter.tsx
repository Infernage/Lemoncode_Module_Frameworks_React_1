import { alpha, createTheme, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { CSSProperties, useContext } from "react";
import { ListContext } from "./list.context";

const defaultTheme = createTheme();

const styles = {
  backgroundColor: `${alpha(defaultTheme.palette.common.white, 0.25)}`,
  color: "white",
  padding: "0 5px",
} as CSSProperties;

export const FilterInput: React.FC = () => {
  const { filter, setFilter } = useContext(ListContext);
  return (
    <div>
      <InputBase
        id="filter"
        style={styles}
        margin="none"
        placeholder="Search"
        startAdornment={
          <SearchIcon
            style={{
              color: `${alpha(defaultTheme.palette.common.white, 0.85)}`,
            }}
          />
        }
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
