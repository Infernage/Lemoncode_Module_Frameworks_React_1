import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import { GlobalContext } from "../../../global.context";
import { ListContext } from "../context";

export const ListBody = () => {
  const { elements, setScrollPosition } = React.useContext(ListContext);
  const { idSelector } = React.useContext(GlobalContext);

  const handleClick = () => setScrollPosition(window.scrollY);

  return (
    <List>
      {elements.map((element) => (
        <ListItem key={element.id}>
          <Tooltip title="Avatar">
            <ListItemAvatar>
              <Avatar variant="square">
                <img alt="" src={element.image} style={{ width: "100%" }} />
              </Avatar>
            </ListItemAvatar>
          </Tooltip>
          <ListItemText
            primary={
              <Tooltip title="Name">
                <Link
                  onClick={handleClick}
                  to={generatePath("detail/:id", { id: idSelector(element) })}
                >
                  {element.name}
                </Link>
              </Tooltip>
            }
            secondary={
              <Tooltip title="Id">
                <span>{element.id}</span>
              </Tooltip>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
