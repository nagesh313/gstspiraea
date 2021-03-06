import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
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
  businessName: Yup.string().min(2, "Too Short!").required("Required"),
  vendorType: Yup.string().required("Required"),
  userEmail: Yup.string().email("Invalid userEmail").required("Required"),
  mobile: Yup.string().required("Required"),
});
export function SignUpComponent(props: any) {
  const classes = useStyles();
  const history = useHistory();
  function navigateToLogin() {
    history.push("/signin");
  }
  const signUpSubmit = (values: any) => {
    axios
      .post("/api/createRegistration", values)
      .then((response: any) => {
        console.log(response);
        props.enqueueSnackbar("User Sign Up Complete", successToast);
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
            Sign up
          </Typography>
          <Formik
            initialValues={{
              businessName: "",
              vendorType: "P0",
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="businessName"
                      required
                      name="businessName"
                      variant="outlined"
                      fullWidth
                      id="businessName"
                      label="Business Name"
                      autoFocus
                      onChange={handleChange}
                      value={values.businessName}
                      error={
                        errors.businessName && touched.businessName
                          ? true
                          : false
                      }
                      helperText={touched.businessName && errors.businessName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Vendor Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        fullWidth
                        id="demo-simple-select-helper"
                        value={values.vendorType}
                        error={
                          errors.vendorType && touched.vendorType ? true : false
                        }
                        onChange={(event: any, data: any) => {
                          setFieldValue("vendorType", data?.props?.children);
                        }}
                      >
                        <MenuItem value={"P0"}>P0</MenuItem>
                        <MenuItem value={"P1"}>P1</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      variant="outlined"
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile Number"
                      name="mobile"
                      onChange={handleChange}
                      value={values.mobile}
                      error={errors.mobile && touched.mobile ? true : false}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via userEmail."
              />
            </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/#/signIn" variant="body2">
                      Already have an account? Sign in
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
export const SignUp = withSnackbar(SignUpComponent);
