import React from "react";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerItems = [
  {
    name: "Dashboard",
    path: "/"
  },
  {
    name: "Coupon Templates",
    path: "/Templates"
  },
  {
    name: "Coupon Batches",
    path: "/Batches"
  },
  {
    name: "Coupons",
    path: "/Coupons"
  }
];

export default function BusinessDrawer(props) {
  return (
    <List style={{ paddingTop: "15px" }}>
      {drawerItems.map((drawerItem, index) => (
        <RouterLink to={drawerItem.path} key={drawerItem.path}>
          <ListItem button onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={drawerItem.name} />
          </ListItem>
        </RouterLink>
      ))}
    </List>
  );
}
