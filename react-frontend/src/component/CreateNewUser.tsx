import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { failureToast, successToast } from "../util/util";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const CreateNewUserDialogComponent = (props: any) => {
  const submitNewUser = (values: any) => {
    axios
      .post("/api/auth/signup", { ...values })
      .then((response: any) => {
        props.enqueueSnackbar("User Added successfully", successToast);
        props.handleClose(true);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New User Form</DialogTitle>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values: any) => {
            submitNewUser(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form noValidate>
              <DialogContent style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="firstname"
                      name="firstname"
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="firstname"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      value={values.firstname}
                      error={
                        errors.firstname && touched.firstname ? true : false
                      }
                      helperText={touched.firstname && errors.firstname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="lastname"
                      label="Last Name"
                      name="lastname"
                      autoComplete="lastname"
                      onChange={handleChange}
                      value={values.lastname}
                      error={errors.lastname && touched.lastname ? true : false}
                      helperText={touched.lastname && errors.lastname}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email && touched.email ? true : false}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      id="username"
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      error={errors.username && touched.username ? true : false}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={values.password}
                      error={errors.password && touched.password ? true : false}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => props.handleClose(false)}
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
export const CreateNewUserDialog = withSnackbar(CreateNewUserDialogComponent);
