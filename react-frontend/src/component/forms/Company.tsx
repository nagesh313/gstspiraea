import {
  Button,
  Checkbox,
  Divider,
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
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { failureToast, successToast } from "../../util/util";
import { DialogComponent } from "../Dialog";
import { schema } from "./CompanySchema";

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

const CompanyComponent = (props: any) => {
  const classes = useStyles();
  const { params }: any = useRouteMatch();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = React.useState<any>();
  const fetchOrderDetails = (id: any) => {
    axios
      .get("/api/get-order/get/Company/" + id)
      .then((response: any) => {
        response.data.directorList.forEach((director: any, index: any) => {
          response.data["directorName" + index] = director.directorName;
          response.data["directorDin" + index] = director.directorDin;
          response.data["directorFatherName" + index] =
            director.directorFatherName;
          response.data["directorAadharNo" + index] = director.directorAadharNo;
          response.data["directorAadharPhotoCopy" + index] =
            director.directorAadharPhotoCopy;
          response.data["directorResidentialAddress" + index] =
            director.directorResidentialAddress;
          response.data["directorPhoto" + index] = director.directorPhoto;
        });
        response.data.numberOfDirectors = response.data.directorList.length;
        setOrderDetails(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Error fetching order details", failureToast);
      });
  };
  const approve = () => {
    axios
      .get("/api/get-order/Company/" + params.id + "/APPROVED/")
      .then((response: any) => {
        props.enqueueSnackbar(
          "Application Approved Successfully",
          successToast
        );
        history.push("/dashboard/order-list");
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(
          "Unable To Approve the Application",
          failureToast
        );
      });
  };
  const reject = () => {
    axios
      .get("/api/get-order/Company/" + params.id + "/REJECTED/")
      .then((response: any) => {
        props.enqueueSnackbar(
          "Application Rejected Successfully",
          successToast
        );
        history.push("/dashboard/order-list");
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Unable To Reject the Application", failureToast);
      });
  };
  const validationSchema = schema;
  useEffect(() => {
    if (params.id) {
      fetchOrderDetails(params.id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const upload = (event: any, setFieldValue: any, field: any) => {
    let formData = new FormData();
    formData.append("file", event.currentTarget.files[0]);
    axios
      .post("/api/document/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: any) => {
        setFieldValue(field, response.data);
        // setTaskList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
        event.target.value = "";
      });
  };
  const submitForm = (values: any) => {
    values.paymentPlanLocationDetails = props.plan;
    const directorList: any = [];
    [...Array(values.numberOfDirectors)].forEach((value: any, index: any) => {
      directorList.push({
        directorName: values["directorName" + index],
        directorDin: values["directorDin" + index],
        directorFatherName: values["directorFatherName" + index],
        directorAadharNo: values["directorAadharNo" + index],
        directorAadharPhotoCopy: values["directorAadharPhotoCopy" + index],
        directorResidentialAddress:
          values["directorResidentialAddress" + index],
        directorPhoto: values["directorPhoto" + index],
      });
    });
    values.directorList = directorList;
    axios
      .post("/api/submit-company-details", { ...values })
      .then((response: any) => {
        history.push("/dashboard/order-list");
        props.enqueueSnackbar("Application Saved SuccessFully", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Not able to save the Application", failureToast);
      });
  };
  const [imageName, setImageName] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (imageName: any) => {
    setOpen(true);
    setImageName(imageName);
  };

  const handleClose = () => {
    setOpen(false);
    setImageName("");
  };
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);
  let valuesForDirectors: any = {};
  [...Array(15)].forEach((value: any, index: any) => {
    valuesForDirectors["directorName" + index] = "";
    valuesForDirectors["directorDin" + index] = "";
    valuesForDirectors["directorFatherName" + index] = "";
    valuesForDirectors["directorAadharNo" + index] = "";
    valuesForDirectors["directorAadharPhotoCopy" + index] = "";
    valuesForDirectors["directorResidentialAddress" + index] = "";
    valuesForDirectors["directorPhoto" + index] = "";
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <DialogComponent
        name={imageName}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Company
          </Typography>
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={
                orderDetails
                  ? orderDetails
                  : {
                      firmName: "",
                      legalbusinessName: "",
                      tradeName: "",
                      mobile: "",
                      email: "",
                      pannumber: "",
                      panphoto: "",
                      composition: "No",
                      commencementDate: date,
                      principleplace: "",
                      pricipleelectricityphoto: "",
                      priciplerentphoto: "",
                      priciplenocphoto: "",
                      additionalplace: "",
                      additionalelectricityphoto: "",
                      additionalrentphoto: "",
                      additionalnocphoto: "",
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
                      status: "CREATED",
                      createdBy: sessionStorage.getItem("user"),
                      isActive: true,
                      trading: false,
                      manufacture: false,
                      service: false,
                      remark: "",
                      numberOfDirectors: 1,
                      ...valuesForDirectors,
                    }
              }
              validationSchema={validationSchema}
              onSubmit={(values: any) => {
                submitForm(values);
              }}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                <Form noValidate>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="firmName"
                        label="Name of the Company"
                        name="firmName"
                        autoComplete="firmName"
                        onChange={handleChange}
                        value={values.firmName}
                        error={
                          errors.firmName && touched.firmName ? true : false
                        }
                        helperText={touched.firmName && errors.firmName}
                        InputLabelProps={{ shrink: true }}
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
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="panphoto"
                        label="Please attach PAN card copy"
                        name="panphoto"
                        autoComplete="panphoto"
                        // onChange={handleChange}
                        onChange={(file) =>
                          upload(file, setFieldValue, "panphoto")
                        }
                        // value={values.panphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.panphoto && touched.panphoto ? true : false
                        }
                        helperText={touched.panphoto && errors.panphoto}
                      />
                      {values.panphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.panphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
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
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="pricipleelectricityphoto"
                        label="Please attach Electricity bill"
                        name="pricipleelectricityphoto"
                        autoComplete="pricipleelectricityphoto"
                        onChange={(file) =>
                          upload(
                            file,
                            setFieldValue,
                            "pricipleelectricityphoto"
                          )
                        }
                        // value={values.pricipleelectricityphoto}
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
                      {values.pricipleelectricityphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.pricipleelectricityphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="priciplerentphoto"
                        label="Please attach Rent Agrement"
                        name="priciplerentphoto"
                        autoComplete="priciplerentphoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "priciplerentphoto")
                        }
                        // value={values.priciplerentphoto}
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
                      {values.priciplerentphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.priciplerentphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="priciplenocphoto"
                        label="Please attach NOC if Rented"
                        name="priciplenocphoto"
                        autoComplete="priciplenocphoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "priciplenocphoto")
                        }
                        // value={values.priciplenocphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.priciplenocphoto && touched.priciplenocphoto
                            ? true
                            : false
                        }
                        helperText={touched.panphoto && errors.priciplenocphoto}
                      />
                      {values.priciplenocphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.priciplenocphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
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
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="additionalelectricityphoto"
                        label="Please attach Electricity bill"
                        name="additionalelectricityphoto"
                        autoComplete="additionalelectricityphoto"
                        onChange={(file) =>
                          upload(
                            file,
                            setFieldValue,
                            "additionalelectricityphoto"
                          )
                        }
                        // value={values.additionalelectricityphoto}
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
                      {values.additionalelectricityphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.additionalelectricityphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="additionalrentphoto"
                        label="Please attach Rent Agrement"
                        name="additionalrentphoto"
                        autoComplete="additionalrentphoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "additionalrentphoto")
                        }
                        // value={values.additionalrentphoto}
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
                      {values.additionalrentphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.additionalrentphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
                        required
                        fullWidth
                        id="additionalnocphoto"
                        label="Please attach NOC if Rented"
                        name="additionalnocphoto"
                        autoComplete="additionalnocphoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "additionalnocphoto")
                        }
                        // value={values.additionalnocphoto}
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
                      {values.additionalnocphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.additionalnocphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        type="number"
                        required
                        fullWidth
                        id="numberOfDirectors"
                        label="Number of Director"
                        name="numberOfDirectors"
                        autoComplete="numberOfDirectors"
                        onChange={handleChange}
                        value={values.numberOfDirectors}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.numberOfDirectors && touched.numberOfDirectors
                            ? true
                            : false
                        }
                        helperText={
                          touched.numberOfDirectors && errors.numberOfDirectors
                        }
                      />
                    </Grid>
                  </Grid>
                  {[...Array(values.numberOfDirectors)].map(
                    (num: any, index: any) => {
                      return (
                        <React.Fragment key={index}>
                          <Divider />
                          <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                id={"directorName" + index}
                                label={"Director's " + (index + 1) + " Name"}
                                name={"directorName" + index}
                                autoComplete={"directorName" + index}
                                onChange={handleChange}
                                value={values["directorName" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["directorName" + index] &&
                                  touched["directorName" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["directorName" + index] &&
                                  errors["directorName" + index]
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
                                id={"directorDin" + index}
                                label={"DIN of Director " + (index + 1)}
                                name={"directorDin" + index}
                                autoComplete={"directorDin" + index}
                                onChange={handleChange}
                                value={values["directorDin" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["directorDin" + index] &&
                                  touched["directorDin" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["directorDin" + index] &&
                                  errors["directorDin" + index]
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
                                id={"directorFatherName" + index}
                                label={
                                  "Director " + (index + 1) + " Father's name"
                                }
                                name={"directorFatherName" + index}
                                autoComplete={"directorFatherName" + index}
                                onChange={handleChange}
                                value={values["directorFatherName" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["directorFatherName" + index] &&
                                  touched["directorFatherName" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["directorFatherName" + index] &&
                                  errors["directorFatherName" + index]
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
                                id={"directorAadharNo" + index}
                                label={"Aadhaar No. of Director " + (index + 1)}
                                name={"directorAadharNo" + index}
                                autoComplete={"directorAadharNo" + index}
                                onChange={handleChange}
                                value={values["directorAadharNo" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["directorAadharNo" + index] &&
                                  touched["directorAadharNo" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["directorAadharNo" + index] &&
                                  errors["directorAadharNo" + index]
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="dense"
                                type="file"
                                style={{ width: "90%" }}
                                size="small"
                                required
                                fullWidth
                                id={"directorAadharPhotoCopy" + index}
                                label="Please attach Aadhar copy"
                                name={"directorAadharPhotoCopy" + index}
                                autoComplete={"directorAadharPhotoCopy" + index}
                                onChange={(file) =>
                                  upload(
                                    file,
                                    setFieldValue,
                                    "directorAadharPhotoCopy" + index
                                  )
                                }
                                // value={values.directorAadharPhotoCopy}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["directorAadharPhotoCopy" + index] &&
                                  touched["directorAadharPhotoCopy" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["directorAadharPhotoCopy" + index] &&
                                  errors["directorAadharPhotoCopy" + index]
                                }
                              />
                              {values["directorAadharPhotoCopy" + index] && (
                                <Visibility
                                  onClick={() => {
                                    setImageName(
                                      values["directorAadharPhotoCopy" + index]
                                    );
                                    setOpen(true);
                                  }}
                                  style={{ float: "right", marginTop: "25px" }}
                                />
                              )}
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                id={"directorResidentialAddress" + index}
                                label="Residential Address"
                                name={"directorResidentialAddress" + index}
                                autoComplete={
                                  "directorResidentialAddress" + index
                                }
                                onChange={handleChange}
                                value={
                                  values["directorResidentialAddress" + index]
                                }
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors[
                                    "directorResidentialAddress" + index
                                  ] &&
                                  touched["directorResidentialAddress" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched[
                                    "directorResidentialAddress" + index
                                  ] &&
                                  errors["directorResidentialAddress" + index]
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                type="file"
                                style={{ width: "90%" }}
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                id={"directorPhoto" + index}
                                label="Passport Size Photo"
                                name={"directorPhoto" + index}
                                autoComplete={"directorPhoto" + index}
                                onChange={(file) =>
                                  upload(
                                    file,
                                    setFieldValue,
                                    "directorPhoto" + index
                                  )
                                }
                                // value={values.directorPhoto}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["directorPhoto" + index] &&
                                  touched["directorPhoto" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["directorPhoto" + index] &&
                                  errors["directorPhoto" + index]
                                }
                              />
                              {values["directorPhoto" + index] && (
                                <Visibility
                                  onClick={() => {
                                    setImageName(
                                      values["directorPhoto" + index]
                                    );
                                    setOpen(true);
                                  }}
                                  style={{ float: "right", marginTop: "25px" }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      );
                    }
                  )}
                  <Divider />
                  <Grid container spacing={4}>
                    <Grid item xs={6} sm={6}>
                      <label>
                        Nature of Business Activity being carried out
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event: any, value: any) => {
                              setFieldValue("trading", value);
                            }}
                            name="Trading"
                            checked={values.trading}
                          />
                        }
                        label="Trading"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event: any, value: any) => {
                              setFieldValue("manufacture", value);
                            }}
                            name="Manufacture"
                            checked={values.manufacture}
                          />
                        }
                        label="Manufacture"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event: any, value: any) => {
                              setFieldValue("service", value);
                            }}
                            name="Service"
                            checked={values.service}
                          />
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
                      <TextField
                        label="1"
                        id="hsn1"
                        name="hsn1"
                        onChange={handleChange}
                        value={values.hsn1}
                      ></TextField>
                      <TextField
                        label="2"
                        id="hsn2"
                        name="hsn2"
                        onChange={handleChange}
                        value={values.hsn2}
                      ></TextField>
                      <TextField
                        label="3"
                        id="hsn3"
                        name="hsn3"
                        onChange={handleChange}
                        value={values.hsn3}
                      ></TextField>
                      <TextField
                        label="4"
                        id="hsn4"
                        name="hsn4"
                        onChange={handleChange}
                        value={values.hsn4}
                      ></TextField>
                      <TextField
                        label="5"
                        id="hsn5"
                        name="hsn5"
                        onChange={handleChange}
                        value={values.hsn5}
                      ></TextField>
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
                        style={{ width: "90%" }}
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="cancelcheqphoto"
                        label="Attach Cancel cheque"
                        name="cancelcheqphoto"
                        autoComplete="cancelcheqphoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "cancelcheqphoto")
                        }
                        // value={values.cancelcheqphoto}
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
                      {values.cancelcheqphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.cancelcheqphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
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
                        style={{ width: "90%" }}
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="tradelicensephoto"
                        label="Attach trade license"
                        name="tradelicensephoto"
                        autoComplete="tradelicensephoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "tradelicensephoto")
                        }
                        // value={values.tradelicensephoto}
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
                      {values.tradelicensephoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.tradelicensephoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                    </Grid>
                  </Grid>
                  {params.id && sessionStorage.getItem("role") !== "Customer" && (
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          size="small"
                          required
                          fullWidth
                          id="remark"
                          label="Remark"
                          name="remark"
                          autoComplete="remark"
                          onChange={handleChange}
                          value={values.remark}
                          InputLabelProps={{ shrink: true }}
                          error={errors.remark && touched.remark ? true : false}
                          helperText={touched.remark && errors.remark}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {params.id === undefined && (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "10px" }}
                      // className={classes.submit}
                    >
                      Submit
                    </Button>
                  )}
                  {sessionStorage.getItem("role") !== "Customer" &&
                    orderDetails?.status === "CREATED" && (
                      <>
                        <Grid
                          container
                          spacing={3}
                          style={{ textAlign: "center" }}
                        >
                          <Grid item xs={12}>
                            <Button
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                approve();
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              style={{ marginLeft: "10px" }}
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                reject();
                              }}
                            >
                              Reject
                            </Button>
                          </Grid>
                        </Grid>
                      </>
                    )}
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};
export const Company = withSnackbar(CompanyComponent);
