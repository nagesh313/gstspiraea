import {
  FormControlLabel,
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
import { CheckBox } from "@material-ui/icons";
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

export default function SolePropreietor() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Sole Proprietor
          </Typography>
          <React.Fragment>
            <Formik
              initialValues={{
                username: "",
                password: "",
                role: "",
                proprietorshipid: "",
                personName: "",
                legalbusinessName: "",
                tradeName: "",
                mobile: "",
                email: "",
                pannumber: "",
                panphoto: "",
                composition: "",
                commencementDate: "",
                principleplace: "",
                pricipleelectricityphoto: "",
                priciplerentphoto: "",
                priciplenocphoto: "",
                additionalplace: "",
                additionalelectricityphoto: "",
                additionalrentphoto: "",
                additionalnocphoto: "",
                propfatherName: "",
                propadharnumber: "",
                propadharphoto: "",
                resident_address: "",
                photo: "",
                authsignname: "",
                signfathername: "",
                signadharnumber: "",
                signadharphoto: "",
                residentsignaddress: "",
                signphoto: "",
                businessactivity: "",
                hsn1: "",
                hsn2: "",
                hsn3: "",
                hsn4: "",
                hsn5: "",
                accountname: "",
                accountnumber: "",
                ifsc: "",
                branchname: "",
                branchcode: "",
                cancelcheqphoto: "",
                tradelicensenumber: "",
                tradelicensephoto: "",
                isActive: "",
                createdOn: "",
                createdBy: "",
                modifiedOn: "",
                modifiedBy: "",
                status: "",
                remark: "",
              }}
              //   validationSchema={SignInSchema}
              onSubmit={(values: any) => {
                // signInSubmit(values);
              }}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                // obj: any
                <Form noValidate>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="personName"
                        label="Name of the person"
                        name="personName"
                        autoComplete="personName"
                        onChange={handleChange}
                        value={values.personName}
                        error={
                          errors.personName && touched.personName ? true : false
                        }
                        helperText={touched.personName && errors.personName}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="legalbusinessName"
                        label="Legal Name of Business (As mentioned in PAN)"
                        name="legalbusinessName"
                        autoComplete="legalbusinessName"
                        onChange={handleChange}
                        value={values.legalbusinessName}
                        error={
                          errors.legalbusinessName && touched.legalbusinessName
                            ? true
                            : false
                        }
                        helperText={
                          touched.legalbusinessName && errors.legalbusinessName
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="tradeName"
                        label="Trade Name"
                        name="tradeName"
                        autoComplete="tradeName"
                        onChange={handleChange}
                        value={values.tradeName}
                        error={
                          errors.tradeName && touched.tradeName ? true : false
                        }
                        helperText={touched.tradeName && errors.tradeName}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="mobile"
                        label="Mob.No"
                        name="mobile"
                        autoComplete="mobile"
                        onChange={handleChange}
                        value={values.mobile}
                        error={errors.mobile && touched.mobile ? true : false}
                        helperText={touched.mobile && errors.mobile}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="email"
                        label="Email ID"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={values.email}
                        error={errors.email && touched.email ? true : false}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="pannumber"
                        label="PAN Number"
                        name="pannumber"
                        autoComplete="pannumber"
                        onChange={handleChange}
                        value={values.pannumber}
                        error={
                          errors.pannumber && touched.pannumber ? true : false
                        }
                        helperText={touched.pannumber && errors.pannumber}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="panphoto"
                        label="Please attach PAN card copy"
                        name="panphoto"
                        autoComplete="panphoto"
                        onChange={handleChange}
                        value={values.panphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.panphoto && touched.panphoto ? true : false
                        }
                        helperText={touched.panphoto && errors.panphoto}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="demo-simple-select-label">
                        Composition
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        fullWidth
                        margin="dense"
                        required
                        id="composition"
                        label="Composition"
                        name="composition"
                        autoComplete="composition"
                        value={values.composition}
                        error={
                          errors.composition && touched.composition
                            ? true
                            : false
                        }
                        onChange={(event: any, data: any) => {
                          setFieldValue("composition", data?.props?.children);
                        }}
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="date"
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="commencementDate"
                        label="Date of Commencement of business"
                        name="commencementDate"
                        autoComplete="commencementDate"
                        onChange={handleChange}
                        value={values.commencementDate}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.commencementDate && touched.commencementDate
                            ? true
                            : false
                        }
                        helperText={
                          touched.commencementDate && errors.commencementDate
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="principleplace"
                        label="Principal Place of Business address"
                        name="principleplace"
                        autoComplete="principleplace"
                        onChange={handleChange}
                        value={values.principleplace}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.principleplace && touched.principleplace
                            ? true
                            : false
                        }
                        helperText={
                          touched.principleplace && errors.principleplace
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="pricipleelectricityphoto"
                        label="Please attach Electricity bill"
                        name="pricipleelectricityphoto"
                        autoComplete="panphoto"
                        onChange={handleChange}
                        value={values.pricipleelectricityphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.pricipleelectricityphoto &&
                          touched.pricipleelectricityphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.pricipleelectricityphoto &&
                          errors.pricipleelectricityphoto
                        }
                      />
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="priciplerentphoto"
                        label="Please attach Rent Agrement"
                        name="priciplerentphoto"
                        autoComplete="priciplerentphoto"
                        onChange={handleChange}
                        value={values.priciplerentphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.priciplerentphoto && touched.priciplerentphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.priciplerentphoto && errors.priciplerentphoto
                        }
                      />
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="priciplenocphoto"
                        label="Please attach NOC if Rented"
                        name="priciplenocphoto"
                        autoComplete="priciplenocphoto"
                        onChange={handleChange}
                        value={values.priciplenocphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.priciplenocphoto && touched.priciplenocphoto
                            ? true
                            : false
                        }
                        helperText={touched.panphoto && errors.priciplenocphoto}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="additionalplace"
                        label="Additional Place of Business address"
                        name="additionalplace"
                        autoComplete="additionalplace"
                        onChange={handleChange}
                        value={values.additionalplace}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.additionalplace && touched.additionalplace
                            ? true
                            : false
                        }
                        helperText={
                          touched.additionalplace && errors.additionalplace
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="additionalelectricityphoto"
                        label="Please attach Electricity bill"
                        name="additionalelectricityphoto"
                        autoComplete="panphoto"
                        onChange={handleChange}
                        value={values.additionalelectricityphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.additionalelectricityphoto &&
                          touched.additionalelectricityphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.additionalelectricityphoto &&
                          errors.additionalelectricityphoto
                        }
                      />
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="additionalrentphoto"
                        label="Please attach Rent Agrement"
                        name="additionalrentphoto"
                        autoComplete="additionalrentphoto"
                        onChange={handleChange}
                        value={values.additionalrentphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.additionalrentphoto &&
                          touched.additionalrentphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.additionalrentphoto &&
                          errors.additionalrentphoto
                        }
                      />
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="additionalnocphoto"
                        label="Please attach NOC if Rented"
                        name="additionalnocphoto"
                        autoComplete="additionalnocphoto"
                        onChange={handleChange}
                        value={values.additionalnocphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.additionalnocphoto &&
                          touched.additionalnocphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.additionalnocphoto &&
                          errors.additionalnocphoto
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="propfatherName"
                        label="Proprietor's Father name"
                        name="propfatherName"
                        autoComplete="propfatherName"
                        onChange={handleChange}
                        value={values.propfatherName}
                        error={
                          errors.propfatherName && touched.propfatherName
                            ? true
                            : false
                        }
                        helperText={
                          touched.propfatherName && errors.propfatherName
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="propadharnumber"
                        label="Aadhaar No. of Proprietor"
                        name="propadharnumber"
                        autoComplete="propadharnumber"
                        onChange={handleChange}
                        value={values.propadharnumber}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.propadharnumber && touched.propadharnumber
                            ? true
                            : false
                        }
                        helperText={
                          touched.propadharnumber && errors.propadharnumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="propadharphoto"
                        label="Please attach Aadhar copy"
                        name="propadharphoto"
                        autoComplete="propadharphoto"
                        onChange={handleChange}
                        value={values.propadharphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.propadharphoto && touched.propadharphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.propadharphoto && errors.propadharphoto
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="resident_address"
                        label="Residential Address"
                        name="resident_address"
                        autoComplete="resident_address"
                        onChange={handleChange}
                        value={values.resident_address}
                        error={
                          errors.resident_address && touched.resident_address
                            ? true
                            : false
                        }
                        helperText={
                          touched.resident_address && errors.resident_address
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        type="file"
                        size="small"
                        required
                        fullWidth
                        id="photo"
                        label="Passport Size Photo"
                        name="photo"
                        autoComplete="photo"
                        onChange={handleChange}
                        value={values.photo}
                        InputLabelProps={{ shrink: true }}
                        error={errors.photo && touched.photo ? true : false}
                        helperText={touched.photo && errors.photo}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="authsignname"
                        label="Name of Authorised Signatory"
                        name="authsignname"
                        autoComplete="authsignname"
                        onChange={handleChange}
                        value={values.authsignname}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.authsignname && touched.authsignname
                            ? true
                            : false
                        }
                        helperText={touched.authsignname && errors.authsignname}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="signfathername"
                        label="Signatory's Father name"
                        name="signfathername"
                        autoComplete="signfathername"
                        onChange={handleChange}
                        value={values.signfathername}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.signfathername && touched.signfathername
                            ? true
                            : false
                        }
                        helperText={
                          touched.signfathername && errors.signfathername
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="signadharnumber"
                        label="Aadhaar No. of Signatory"
                        name="signadharnumber"
                        autoComplete="signadharnumber"
                        onChange={handleChange}
                        value={values.signadharnumber}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.signadharnumber && touched.signadharnumber
                            ? true
                            : false
                        }
                        helperText={
                          touched.signadharnumber && errors.signadharnumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="file"
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="signadharphoto"
                        label="Please attach Aadhar copy"
                        name="signadharphoto"
                        autoComplete="signadharphoto"
                        onChange={handleChange}
                        value={values.signadharphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.signadharphoto && touched.signadharphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.signadharphoto && errors.signadharphoto
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="residentsignaddress"
                        label="Residential Address of signatory"
                        name="residentsignaddress"
                        autoComplete="residentsignaddress"
                        onChange={handleChange}
                        value={values.residentsignaddress}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.residentsignaddress &&
                          touched.residentsignaddress
                            ? true
                            : false
                        }
                        helperText={
                          touched.residentsignaddress &&
                          errors.residentsignaddress
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="file"
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="signphoto"
                        label="Passport Size Photo of signatory"
                        name="signphoto"
                        autoComplete="signphoto"
                        onChange={handleChange}
                        value={values.signphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.signphoto && touched.signphoto ? true : false
                        }
                        helperText={touched.signphoto && errors.signphoto}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={6} sm={6}>
                      <label>
                        Nature of Business Activity being carried out
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FormControlLabel
                        control={
                          <CheckBox onChange={handleChange} name="Trading" />
                        }
                        label="Trading"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <CheckBox
                            onChange={handleChange}
                            name="Manufacture"
                          />
                        }
                        label="Manufacture"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <CheckBox onChange={handleChange} name="Service" />
                        }
                        label="Service"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={6} sm={6}>
                      <label>
                        HSN /SAC Code of Top 5 goods/Service to be sold
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField label="1"></TextField>
                      <TextField label="2"></TextField>
                      <TextField label="3"></TextField>
                      <TextField label="4"></TextField>
                      <TextField label="5"></TextField>
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="branchname"
                        label="Bank details associated with PAN number of business"
                        name="branchname"
                        autoComplete="branchname"
                        onChange={handleChange}
                        value={values.branchname}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.branchname && touched.branchname ? true : false
                        }
                        helperText={touched.branchname && errors.branchname}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="file"
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="cancelcheqphoto"
                        label="Attach Cancel cheque"
                        name="cancelcheqphoto"
                        autoComplete="cancelcheqphoto"
                        onChange={handleChange}
                        value={values.cancelcheqphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.cancelcheqphoto && touched.cancelcheqphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.cancelcheqphoto && errors.cancelcheqphoto
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="tradelicensenumber"
                        label="Trade License number (Applicable to West Bengal reg only)"
                        name="tradelicensenumber"
                        autoComplete="tradelicensenumber"
                        onChange={handleChange}
                        value={values.tradelicensenumber}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.tradelicensenumber &&
                          touched.tradelicensenumber
                            ? true
                            : false
                        }
                        helperText={
                          touched.tradelicensenumber &&
                          errors.tradelicensenumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="file"
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="tradelicensephoto"
                        label="Attach trade license"
                        name="tradelicensephoto"
                        autoComplete="tradelicensephoto"
                        onChange={handleChange}
                        value={values.tradelicensephoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.tradelicensephoto && touched.tradelicensephoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.tradelicensephoto && errors.tradelicensephoto
                        }
                      />
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
}
