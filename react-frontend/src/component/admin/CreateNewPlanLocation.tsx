import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { failureToast, successToast } from "../../util/util";

const SignupSchema = Yup.object().shape({
  payplanLocation: Yup.string().min(2, "Too Short!").required("Required"),
  payplanamount: Yup.number().required("Required"),
});

const CreateNewPlanLocationDialogComponent = (props: any) => {
  const [planLocationList, setPlanLocationList] = React.useState<any>([]);

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
  const fetchStateList = () => {
    axios
      .get("/api/state-list")
      .then((response: any) => {
        setPlanLocationList(response.data);
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  useEffect(() => {
    fetchStateList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title" maxWidth="xs">
      <DialogTitle id="form-dialog-title">Create New Plan Location</DialogTitle>
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
            <DialogContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <FormControl fullWidth size="small" variant="outlined">
                    {/* <TextField
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
                      /> */}
                    <InputLabel id="payplanLocation">Select a plan</InputLabel>
                    <Select
                      name="payplanLocation"
                      id="payplanLocation"
                      label="Select a plan"
                      onChange={handleChange}
                    >
                      {planLocationList.map((plan: any) => {
                        return (
                          <MenuItem value={plan.name} key={plan.id}>
                            {plan.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "10px" }}>
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
  );
};
export const CreateNewPlanLocationDialog = withSnackbar(
  CreateNewPlanLocationDialogComponent
);
