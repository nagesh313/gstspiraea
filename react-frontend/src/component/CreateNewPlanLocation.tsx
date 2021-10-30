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
  payplanLocation: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  payplanamount: Yup.number().required("Required"),
});

const CreateNewPlanLocationDialogComponent = (props: any) => {
  const submit = (values: any) => {
    axios
      .post("/api/plan-location/" + props.plan.id, values)
      .then((response: any) => {
        props.enqueueSnackbar("Plan Location Added successfully", successToast);
        props.handleClose(true);
        props.fetchPlanList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Unable to Add Location ", failureToast);
      });
  };
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Create New Plan Location
        </DialogTitle>
        <Formik
          initialValues={{
            payplanLocation: "",
            payplanamount: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values: any) => {
            submit(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form noValidate>
              <DialogContent style={{ paddingTop: "10px" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="payplanLocation"
                      name="payplanLocation"
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="payplanLocation"
                      label="Payplan Location"
                      autoFocus
                      onChange={handleChange}
                      value={values.payplanLocation}
                      error={
                        errors.payplanLocation && touched.payplanLocation
                          ? true
                          : false
                      }
                      helperText={
                        touched.payplanLocation && errors.payplanLocation
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="number"
                      size="small"
                      id="payplanamount"
                      label="Pay Plan Amount"
                      name="payplanamount"
                      autoComplete="payplanamount"
                      onChange={handleChange}
                      value={values.payplanamount}
                      error={
                        errors.payplanamount && touched.payplanamount
                          ? true
                          : false
                      }
                      helperText={touched.payplanamount && errors.payplanamount}
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
export const CreateNewPlanLocationDialog = withSnackbar(
  CreateNewPlanLocationDialogComponent
);
