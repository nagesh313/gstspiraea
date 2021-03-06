import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { failureToast, successToast } from "../util/util";
import { StickyFooter } from "./StickyFooter";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SignupSchema = Yup.object().shape({
  userEmail: Yup.string().email("Invalid Email").required("Required"),
});
export function ForgotPasswordComponent(props: any) {
  const classes = useStyles();
  const history = useHistory();
  function navigateToLogin() {
    history.push("/signin");
  }
  const signUpSubmit = (values: any) => {
    axios
      .get("/api/forgot-password/" + values.userEmail)
      .then((response: any) => {
        console.log(response);
        props.enqueueSnackbar(
          "Credentials sent on the registered mail",
          successToast
        );
        navigateToLogin();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            alt=""
            src="/spiraea-logo-bw-web-1.png"
            style={{ height: "50px", backgroundColor: "#3F51B5" }}
          />
          <Typography component="h1" variant="h5">
            Forgot password
          </Typography>
          <Formik
            initialValues={{
              userEmail: "",
              mobile: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values: any) => {
              signUpSubmit(values);
            }}
          >
            {({ errors, touched, values, handleChange, setFieldValue }) => (
              // obj: any
              <Form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="userEmail"
                      label="Email Address"
                      name="userEmail"
                      autoComplete="userEmail"
                      onChange={handleChange}
                      value={values.userEmail}
                      error={
                        errors.userEmail && touched.userEmail ? true : false
                      }
                      helperText={touched.userEmail && errors.userEmail}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Request
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/#/signIn" variant="body2">
                      Back to Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      <StickyFooter />
    </>
  );
}
export const ForgotPassword = withSnackbar(ForgotPasswordComponent);
