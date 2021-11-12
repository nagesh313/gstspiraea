import {
  Collapse,
  createStyles,
  List,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Queue } from "@material-ui/icons";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

import ContactsIcon from "@material-ui/icons/Contacts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
// import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
// import LayersIcon from "@material-ui/icons/Layers";
// import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DashboardIcon from "@material-ui/icons/Dashboard";

import React from "react";

export const MainListItems = () => {
  const role = sessionStorage.getItem("role");
  const admin = role === "Admin";
  return admin ? (
    <div>
      <ListItem button component="a" href="/#/dashboard/home">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/order-list">
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Applications" />
      </ListItem>
    </div>
  ) : (
    <div>
      <ListItem button component="a" href="/#/dashboard/order-list">
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Applications" />
      </ListItem>
      {role !== "Agent" && (
        <ListItem button component="a" href="/#/dashboard/apply-for-gst">
          <ListItemIcon>
            <AccessibilityIcon />
          </ListItemIcon>
          <ListItemText primary="Apply For GST" />
        </ListItem>
      )}
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
  })
);
export const SecondaryListItems = () => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const role = sessionStorage.getItem("role");
  const admin = role === "Admin";
  return (
    <>
      {admin && (
        <div>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component="a"
                href="/#/dashboard/userList"
              >
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component="a"
                href="/#/dashboard/planList"
              >
                <ListItemIcon>
                  <Queue />
                </ListItemIcon>
                <ListItemText primary="Plan List" />
              </ListItem>
            </List>
          </Collapse>
        </div>
      )}
    </>
  );
};
