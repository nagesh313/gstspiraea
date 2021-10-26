import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import * as Yup from "yup";
import { failureToast } from "../../util/util";
import Title from "../Title";
import { Card } from "@material-ui/core";
import { ProfilePic } from "./ProfilePic";
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

function ProfileComponent(props: any) {
  const [user, setUser] = React.useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const fetchUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .get("/api/v1/admin/" + user.id)
      .then((response: any) => {
        setUser(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(user);
  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...user }}
        validationSchema={SignupSchema}
        onSubmit={(values: any) => {
          // signUpSubmit(values);
        }}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form noValidate>
            <Grid container xs={12}>
              <Title>User Details</Title>
            </Grid>

            <Grid container spacing={2} xs={12}>
              <Grid item container spacing={2} xs={8}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="firstname"
                    name="firstname"
                    variant="outlined"
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                    value={values.firstname}
                    error={errors.firstname && touched.firstname ? true : false}
                    helperText={touched.firstname && errors.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
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
                    id="username"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    error={errors.username && touched.username ? true : false}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Button
                  style={{ marginTop: "20px" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="mb-2"
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={4}>
                <ProfilePic></ProfilePic>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
export const Profile = withSnackbar(ProfileComponent);
