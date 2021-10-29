import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WorkIcon from "@material-ui/icons/Work";
import clsx from "clsx";
import React from "react";
import { ProgressBar } from "./admin/Progres";
import Title from "./Title";
// function preventDefault(event: any) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },
}));

export const AdminDashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container style={{ textAlign: "center" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper} style={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              <AttachMoneyIcon style={{ fontSize: "3rem" }}></AttachMoneyIcon>
            </Typography>
            <Typography component="p" variant="h4">
              3,024.00
            </Typography>
            <Title> Today's Business</Title>

            {/* <Typography
            color="textSecondary"
            className={classes.depositContext}
          ></Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div> */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper} style={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              <WorkIcon style={{ fontSize: "3rem" }}></WorkIcon>
            </Typography>
            <Typography component="p" variant="h4">
              1
            </Typography>
            <Title> Today's Application</Title>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper} style={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              <GroupIcon style={{ fontSize: "3rem" }}></GroupIcon>
            </Typography>
            <Typography component="p" variant="h4">
              1
            </Typography>
            <Title> Total Customers</Title>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={6}>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper style={{ textAlign: "center" }}>
                <Typography component="div" variant="h4">
                  <VerifiedUserIcon
                    style={{ fontSize: "2rem" }}
                  ></VerifiedUserIcon>
                </Typography>
                <Typography component="p" variant="h4">
                  1
                </Typography>
                <Title>Applications Management</Title>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper style={{ textAlign: "center" }}>
                <Typography component="div" variant="h4">
                  <GroupAddIcon style={{ fontSize: "2rem" }}></GroupAddIcon>
                </Typography>
                <Typography component="p" variant="h4">
                  1
                </Typography>
                <Title> Customer Management</Title>
              </Paper>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={6}>
              <Paper style={{ textAlign: "center" }}>
                <Typography component="div" variant="h4">
                  <VerifiedUserIcon
                    style={{ fontSize: "2rem" }}
                  ></VerifiedUserIcon>
                </Typography>
                <Typography component="p" variant="h4">
                  1
                </Typography>
                <Title>Verify Applications</Title>
              </Paper>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6}>
              <Paper style={{ textAlign: "center" }}>
                <Typography component="div" variant="h4">
                  <GroupIcon style={{ fontSize: "2rem" }}></GroupIcon>
                </Typography>
                <Typography component="p" variant="h4">
                  1
                </Typography>
                <Title>Complains</Title>
              </Paper>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ textAlign: "center" }}>
            <Title>This Weeks Report</Title>
            <List component="nav" aria-label="mailbox folders">
              <Divider />
              <ListItem>
                <ListItemText primary="Review Pending Applications" />
                <ListItemText primary="20%" style={{ textAlign: "right" }} />
              </ListItem>
              <ListItem>
                <ProgressBar progress="20"></ProgressBar>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Approved Applications" />
                <ListItemText primary="30%" style={{ textAlign: "right" }} />
              </ListItem>
              <ListItem>
                <ProgressBar progress="30"></ProgressBar>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Rejected Applications" />
                <ListItemText primary="40%" style={{ textAlign: "right" }} />
              </ListItem>
              <ListItem>
                <ProgressBar progress="40"></ProgressBar>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
