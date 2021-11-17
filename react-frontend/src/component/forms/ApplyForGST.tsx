import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useEffect } from "react";
import { Company } from "./Company";
import { LLP } from "./LLP";
import { Partnership } from "./Partnership";
import { SoleProprietor } from "./SoleProprietor";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export const ApplyForGstComponent = () => {
  const classes = useStyles();
  const [name, setName] = React.useState<any>("");
  const [planList, setPlanList] = React.useState<any>([]);
  const [plan, setPlan] = React.useState<any>("");
  const [planLocationList, setPlanLocationList] = React.useState<any>([]);
  const [planLocation, setPlanLocation] = React.useState<any>("");
  const [dropdown, setDropdown] = React.useState("");
  const fetchPlanList = () => {
    axios
      .get("/api/plan-list")
      .then((response: any) => {
        setPlanList(response.data);
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  useEffect(() => {
    fetchPlanList();
    const name = sessionStorage.getItem("user");
    setName(name);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Apply For GST
          </Typography>
          <Grid container spacing={5}>
            <Grid xs={6} item>
              <TextField
                size="small"
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="name"
                label="Name of Business"
                name="name"
                autoComplete="name"
                value={name}
                disabled
                autoFocus
              />
            </Grid>
            <Grid xs={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Constitution of Business
                </InputLabel>
                <Select
                  margin="dense"
                  style={{ marginTop: "16px" }}
                  id="demo-simple-select-helper"
                  onChange={(event: any, data: any) => {
                    setDropdown(data?.props?.children);
                  }}
                >
                  <MenuItem value={"Proprietorship"}>Proprietorship</MenuItem>
                  <MenuItem value={"Partnership"}>Partnership</MenuItem>
                  <MenuItem value={"LLP"}>LLP</MenuItem>
                  <MenuItem value={"Company"}>Company</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid xs={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a plan
                </InputLabel>
                <Select
                  margin="dense"
                  style={{ marginTop: "16px" }}
                  id="demo-simple-select-helper"
                  onChange={(event: any, data: any) => {
                    setPlanLocationList(data?.props?.value?.payplanLocation);
                    setPlan(data?.props?.value);
                  }}
                >
                  {planList.map((plan: any) => {
                    return (
                      <MenuItem value={plan} key={plan.id}>
                        {plan.payplanname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a Location
                </InputLabel>
                <Select
                  margin="dense"
                  id="demo-simple-select-helper"
                  onChange={(event: any, data: any) => {
                    setPlanLocation(data?.props?.value);
                  }}
                >
                  {planLocationList.map((plan: any) => {
                    return (
                      <MenuItem value={plan}>{plan.payplanLocation}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={5} style={{ padding: "26px" }}>
              <Grid xs={12} item>
                <b>Remarks : </b>
                {plan.remarks}
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {name !== "" &&
          plan !== "" &&
          planLocation !== "" &&
          dropdown === "Proprietorship" && (
            <SoleProprietor plan={planLocation} />
          )}
        {name !== "" &&
          plan !== "" &&
          planLocation !== "" &&
          dropdown === "Partnership" && <Partnership plan={planLocation} />}
        {name !== "" &&
          plan !== "" &&
          planLocation !== "" &&
          dropdown === "LLP" && <LLP plan={planLocation} />}
        {name !== "" &&
          plan !== "" &&
          planLocation !== "" &&
          dropdown === "Company" && <Company plan={planLocation} />}
      </main>
    </React.Fragment>
  );
};
