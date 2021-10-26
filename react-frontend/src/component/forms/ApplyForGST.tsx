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
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Apply For GST
          </Typography>
          <React.Fragment>
            <Formik
              initialValues={{
                name: "",
                dropdown: "",
              }}
              //   validationSchema={SignInSchema}
              onSubmit={(values: any) => {
                // signInSubmit(values);
              }}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                // obj: any
                <Form noValidate>
                  <Grid container spacing={5}>
                    <Grid xs={6} item>
                      <TextField
                        size="small"
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="name"
                        label="Name of Person"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={handleChange}
                        value={values.name}
                        error={errors.name && touched.name ? true : false}
                        helperText={touched.name && errors.name}
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
                          value={values.dropdown}
                          error={
                            errors.dropdown && touched.dropdown ? true : false
                          }
                          onChange={(event: any, data: any) => {
                            setFieldValue("dropdown", data?.props?.children);
                          }}
                          // value={age}
                        >
                          <MenuItem value={"Proprietorship"}>
                            Proprietorship
                          </MenuItem>
                          <MenuItem value={"Partnership"}>Partnership</MenuItem>
                          <MenuItem value={"LLP"}>LLP</MenuItem>
                          <MenuItem value={"Company"}>Company</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
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
