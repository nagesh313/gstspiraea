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
import React from "react";

export const MainListItems = () => {
  const role = sessionStorage.getItem("role");
  const admin = role === "Admin";
  return admin ? (
    <div>
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
      <ListItem button component="a" href="/#/dashboard/apply-for-gst">
        <ListItemIcon>
          <AccessibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Apply For GST" />
      </ListItem>
      {/* <ListItem button component="a" href="/#/dashboard/sole-proprietor">
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Sole Proprietor" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/partnership">
        <ListItemIcon>
          <Faceicon />
        </ListItemIcon>
        <ListItemText primary="Partnership" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/llp">
        <ListItemIcon>
          <AccessibilityIcon />
        </ListItemIcon>
        <ListItemText primary="LLP" />
      </ListItem> */}
      {/* <ListItem button component="a" href="/#/dashboard/checkout">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Checkout" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/pricing">
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Pricing" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/album">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Album" />
      </ListItem>{" "}
      <ListItem button component="a" href="/#/dashboard/deposits">
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Deposits" />
      </ListItem> */}
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
            </List>
          </Collapse>
        </div>
      )}
    </>
  );
};
