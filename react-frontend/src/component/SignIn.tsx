import {
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { failureToast } from "../util/util";
import { StickyFooter } from "./StickyFooter";
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

export function SignInComponent(props: any) {
  const classes = useStyles();
  const history = useHistory();

  const sessionActive = () => {};
  useEffect(() => {
    sessionActive();
  }, []);
  const signInSubmit = (values: any) => {
    // navigateToDashboard();
    axios
      // .post("/api/login", { ...values })
      .post("/api/login", { ...values })

      .then((response: any) => {
        sessionStorage.setItem("role", values.role);
        sessionStorage.setItem("user", values.loginUserName);
        sessionStorage.setItem("type", response.data.vendorType);
        if (values.role === "Customer") {
          history.push("/dashboard/order-list");
        } else if (values.role === "Agent") {
          history.push("/dashboard/order-list");
        } else if (values.role === "Admin") {
          history.push("/dashboard/home");
        }
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Invalid Credentials", failureToast);
      });
  };
  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
              <img
                alt=""
                src="/spiraea-logo-bw-web-1.png"
                style={{ height: "50px", backgroundColor: "#3F51B5" }}
              />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Formik
                initialValues={{
                  loginUserName: "",
                  loginPassword: "",
                  role: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={(values: any) => {
                  signInSubmit(values);
                }}
              >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                  // obj: any
                  <Form className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="loginUserName"
                      label="Username"
                      name="loginUserName"
                      autoComplete="loginUserName"
                      autoFocus
                      onChange={handleChange}
                      value={values.loginUserName}
                      error={
                        errors.loginUserName && touched.loginUserName
                          ? true
                          : false
                      }
                      helperText={touched.loginUserName && errors.loginUserName}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      name="loginPassword"
                      label="Password"
                      id="loginPassword"
                      autoComplete="loginPassword"
                      onChange={handleChange}
                      value={values.loginPassword}
                      error={
                        errors.loginPassword && touched.loginPassword
                          ? true
                          : false
                      }
                      helperText={touched.loginPassword && errors.loginPassword}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        style={{ marginTop: "16px" }}
                        id="demo-simple-select-helper"
                        value={values.role}
                        error={errors.role && touched.role ? true : false}
                        onChange={(event: any, data: any) => {
                          setFieldValue("role", data?.props?.children);
                        }}
                        // value={age}
                      >
                        <MenuItem value={"Customer"}>Customer</MenuItem>
                        <MenuItem value={"Agent"}>Agent</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#/forgot-password" variant="body2">
                          Forgot Password?
                        </Link>
                        {/* TODO feature */}
                      </Grid>
                      <Grid item>
                        <Link href="/#/signUp" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
              <CustomizedTimeline></CustomizedTimeline>
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
export const SignIn = withSnackbar(SignInComponent);
