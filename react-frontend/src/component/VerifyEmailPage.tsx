import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { StickyFooter } from "./StickyFooter";
import { useHistory, useRouteMatch } from "react-router-dom";

import { CustomizedTimeline } from "./TimeLine";
const SignInSchema = Yup.object().shape({
  loginUserName: Yup.string().max(10, "Too Long!").required("Required"),
  loginPassword: Yup.string().max(10, "Too Long!").required("Required"),
  role: Yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function VerifyEmailComponent(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const { params }: any = useRouteMatch();

  const verify = () => {
    console.log(params.id);
    // history.push("/signIn");

  };
  useEffect(() => {
    verify();
  }, []);
  // const signInSubmit = (values: any) => {
  //   // navigateToDashboard();
  //   axios
  //     // .post("/api/login", { ...values })
  //     .post("/api/login", { ...values })

  //     .then((response: any) => {
  //       sessionStorage.setItem("role", values.role);
  //       sessionStorage.setItem("user", values.loginUserName);
  //       sessionStorage.setItem("type", response.data.vendorType);
  //       if (values.role === "Customer") {
  //         history.push("/dashboard/order-list");
  //       } else if (values.role === "Agent") {
  //         history.push("/dashboard/order-list");
  //       } else if (values.role === "Admin") {
  //         history.push("/dashboard/home");
  //       }
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar("Invalid Credentials", failureToast);
  //     });
  // };
  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.paper}>
              <img
                alt=""
                src="/spiraea-logo-bw-web-1.png"
                style={{ height: "50px", backgroundColor: "#3F51B5" }}
              />
              <Typography component="h1" variant="h5">
                Verify Page
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      <StickyFooter />
    </>
  );
}
// export const ShareRoomDetail = connect(
//   mapStateToProps,
//   null
// )(ShareRoomDetailComponent);
export const VerifyEmail = withSnackbar(VerifyEmailComponent);
