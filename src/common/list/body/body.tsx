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
import { ListContext } from "../context";

export const ListBody = () => {
  const { elements, setScrollPosition } = React.useContext(ListContext);

  const handleClick = () => setScrollPosition(window.scrollY);

  return (
    <List>
      {elements.map((member) => (
        <ListItem key={member.id}>
          <Tooltip title="Avatar">
            <ListItemAvatar>
              <Avatar variant="square">
                <img alt="" src={member.image} style={{ width: "100%" }} />
              </Avatar>
            </ListItemAvatar>
          </Tooltip>
          <ListItemText
            primary={
              <Tooltip title="Name">
                <Link
                  onClick={handleClick}
                  to={generatePath("detail/:id", { id: member.name })}
                >
                  {member.name}
                </Link>
              </Tooltip>
            }
            secondary={
              <Tooltip title="Id">
                <span>{member.id}</span>
              </Tooltip>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
