import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Form, Formik } from "formik";
import React from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
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


export const LLP = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <React.Fragment>
            <Formik
              initialValues={{
                username: "",
                password: "",
                role: "",
              }}
              //   validationSchema={SignInSchema}
              onSubmit={(values: any) => {
                // signInSubmit(values);
              }}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                // obj: any
                <Form noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
                    value={values.username}
                    error={errors.username && touched.username ? true : false}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="password"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                    helperText={touched.password && errors.password}
                  />
                  <Grid item xs={12}>
                    <Select
                      style={{ marginTop: "16px" }}
                      labelId="demo-simple-select-helper-label"
                      fullWidth
                      variant="outlined"
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
                  </Grid>
                  {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                  >
                    Sign In
                  </Button> */}
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};
