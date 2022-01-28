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
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WorkIcon from "@material-ui/icons/Work";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Title from "../Title";
import { ProgressBar } from "./Progres";

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
    height: 180,
  },
}));

export const AdminDashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const role = sessionStorage.getItem("role");
  if (role === null) {
    window.location.href = "/";
  }
  if (role !== "Admin") {
    history.push("/dashboard/order-list");
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [dashboardData, setDashboardData] = React.useState<any>({});

  const fetchAdminDashboard = () => {
    axios
      .get("/api/get-admin-dashboard")
      .then((response: any) => {
        console.log(response);
        setDashboardData(response.data);
        // props.enqueueSnackbar(
        //   "Application Rejected Successfully",
        //   successToast
        // );
        // history.push("/dashboard/admin");
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar("Unable To fetch Admin Dashboard", failureToast);
      });
  };
  useEffect(() => {
    fetchAdminDashboard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Grid container style={{ textAlign: "center" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper} style={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              <img src="currency-inr.png" alt="" />
            </Typography>
            <Typography component="p" variant="h4">
              {dashboardData.todaysBusiness}
            </Typography>
            <Title> Today's Business</Title>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper} style={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              <WorkIcon style={{ fontSize: "3rem" }}></WorkIcon>
            </Typography>
            <Typography component="p" variant="h4">
              {dashboardData.todaysApplication}
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
              {dashboardData.totalCustomers}
            </Typography>
            <Title> Total Users</Title>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={6}>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper style={{ textAlign: "center" }}>
                <Typography
                  component="div"
                  variant="h4"
                  style={{ paddingTop: "8px" }}
                >
                  <VerifiedUserIcon
                    style={{ fontSize: "2rem" }}
                  ></VerifiedUserIcon>
                </Typography>
                <Typography component="p" variant="h4">
                  {dashboardData.applicationsManagement}
                </Typography>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  style={{ paddingBottom: "8px" }}
                  gutterBottom
                >
                  Applications Management
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper style={{ textAlign: "center" }}>
                <Typography
                  component="div"
                  variant="h4"
                  style={{ paddingTop: "8px" }}
                >
                  <GroupAddIcon style={{ fontSize: "2rem" }}></GroupAddIcon>
                </Typography>
                <Typography component="p" variant="h4">
                  {dashboardData.customerManagement}
                </Typography>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  style={{ paddingBottom: "8px" }}
                  gutterBottom
                >
                  Customer Management
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ textAlign: "center" }}>
            <Typography
              component="div"
              variant="h5"
              style={{ paddingTop: "8px" }}
            >
              This Weeks Report
            </Typography>
            <List component="nav" aria-label="mailbox folders">
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    "Review Pending Applications - " + dashboardData.pending
                  }
                />
                <ListItemText
                  primary={dashboardData.pendingPercentage + "%"}
                  style={{ textAlign: "right" }}
                />
              </ListItem>
              <ListItem>
                <ProgressBar
                  progress={dashboardData.pendingPercentage}
                ></ProgressBar>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={"Approved Applications - " + dashboardData.approved}
                />
                <ListItemText
                  primary={dashboardData.approvedPercentage + "%"}
                  style={{ textAlign: "right" }}
                />
              </ListItem>
              <ListItem>
                <ProgressBar
                  progress={dashboardData.approvedPercentage}
                  style={{ background: "green" }}
                ></ProgressBar>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={"Rejected Applications - " + dashboardData.rejected}
                />
                <ListItemText
                  primary={dashboardData.rejectedPercentage + "%"}
                  style={{ textAlign: "right" }}
                />
              </ListItem>
              <ListItem>
                <ProgressBar
                  progress={dashboardData.rejectedPercentage}
                ></ProgressBar>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
