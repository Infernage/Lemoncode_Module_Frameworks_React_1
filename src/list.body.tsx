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
import { ListContext } from "./list.context";

export const ListBody = () => {
  const { members } = React.useContext(ListContext);
  return (
    <List>
      {members.map((member) => (
        <ListItem key={member.id}>
          <Tooltip title="Avatar">
            <ListItemAvatar>
              <Avatar variant="square">
                <img alt="" src={member.avatar_url} style={{ width: "100%" }} />
              </Avatar>
            </ListItemAvatar>
          </Tooltip>
          <ListItemText
            primary={
              <Tooltip title="Name">
                <Link to={generatePath("/detail/:id", { id: member.login })}>
                  {member.login}
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
