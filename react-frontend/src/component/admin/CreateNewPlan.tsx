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
import { failureToast, successToast } from "../../util/util";

const PlanSchema = Yup.object().shape({
  payplanname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  remarks: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

const CreateNewPlanComponent = (props: any) => {
  const submit = (values: any) => {
    axios
      .post("/api/plan", { ...values })
      .then((response: any) => {
        props.enqueueSnackbar("Plan Added successfully", successToast);
        props.handleClose(true);
        props.fetchPlanList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Unable To Add Plan", failureToast);
      });
  };
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Plan Form</DialogTitle>
        <Formik
          initialValues={{
            payplanname: "",
            remarks: "",
          }}
          validationSchema={PlanSchema}
          onSubmit={(values: any) => {
            submit(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form noValidate>
              <DialogContent style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="payplanname"
                      name="payplanname"
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="payplanname"
                      label="Plan Name"
                      autoFocus
                      onChange={handleChange}
                      value={values.payplanname}
                      error={
                        errors.payplanname && touched.payplanname ? true : false
                      }
                      helperText={touched.payplanname && errors.payplanname}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="remarks"
                      label="Remarks"
                      name="remarks"
                      autoComplete="remarks"
                      onChange={handleChange}
                      value={values.remarks}
                      error={errors.remarks && touched.remarks ? true : false}
                      helperText={touched.remarks && errors.remarks}
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
export const CreateNewPlan = withSnackbar(CreateNewPlanComponent);
