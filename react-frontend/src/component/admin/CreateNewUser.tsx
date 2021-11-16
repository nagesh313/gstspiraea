import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { failureToast, successToast } from "../../util/util";

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
    margin: theme.spacing(6),
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateNewUserDialogComponent = (props: any) => {
  const classes = useStyles();
  const signUpSubmit = (values: any) => {
    values.role = props.type;
    axios
      .post("/api/createRegistration", values)
      .then((response: any) => {
        console.log(response);
        props.enqueueSnackbar("User Sign Up Complete", successToast);
        props.handleClose();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };
  let SignupSchema;
  if (props.type !== "Admin" && props.type !== "Agent") {
    SignupSchema = Yup.object().shape({
      businessName: Yup.string().min(2, "Too Short!").required("Required"),
      userEmail: Yup.string().email("Invalid userEmail").required("Required"),
      mobile: Yup.string().required("Required"),
    });
  } else {
    SignupSchema = Yup.object().shape({
      businessName: Yup.string().min(2, "Too Short!").required("Required"),
      vendorType: Yup.string().required("Required"),
      userEmail: Yup.string().email("Invalid userEmail").required("Required"),
      mobile: Yup.string().required("Required"),
    });
  }
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Create New {props.type} Form
        </DialogTitle>
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
                      errors.businessName && touched.businessName ? true : false
                    }
                    helperText={touched.businessName && errors.businessName}
                  />
                </Grid>
                {props.type !== "Admin" && props.type !== "Agent" && (
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
                )}
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
                    error={errors.userEmail && touched.userEmail ? true : false}
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
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
export const CreateNewUserDialog = withSnackbar(CreateNewUserDialogComponent);
