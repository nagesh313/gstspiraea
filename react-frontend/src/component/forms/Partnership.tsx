import {
  Button,
  Checkbox,
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
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { failureToast, successToast } from "../../util/util";
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

const PartnershipComponent = (props: any) => {
  const classes = useStyles();
  const { params }: any = useRouteMatch();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = React.useState<any>();
  // const viewDocument = (name: any) => {
  //   // window.open("/api/document/downloadFile/", "_blank");
  //   axios
  //     .get("/api/document/downloadFile/" + name)
  //     .then((response: any) => {
  //       console.log(name);
  //       // setOrderList(response.data);
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", name);
  //       document.body.appendChild(link);
  //       link.click();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
  const fetchOrderDetails = (id: any) => {
    axios
      .get("/api/get-order/get/Partnership/" + id)
      .then((response: any) => {
        // props.enqueueSnackbar("Order Rejected Successfull", successToast);
        setOrderDetails(response.data);
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const approve = () => {
    axios
      .get("/api/get-order/Partnership/" + params.id + "/APPROVED/")
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
      .get("/api/get-order/Partnership/" + params.id + "/REJECTED/")
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
        // props.enqueueSnackbar("Failed to upload the CSV", failureToast);
      });
  };
  const submitForm = (values: any) => {
    axios
      .post("/api/submit-partnership", { ...values })
      .then((response: any) => {
        history.push("/dashboard/order-list");
        props.enqueueSnackbar("Application Saved SuccessFully", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Not able to save the Application", failureToast);
      });
  };

  // getFiles() {
  //   return http.get("/files");
  // }
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Partnership
          </Typography>
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={
                orderDetails
                  ? orderDetails
                  : {
                      firmName: "2110260840371037.png",
                      legalbusinessName: "2110260840371037.png",
                      tradeName: "2110260840371037.png",
                      mobile: "2110260840371037.png",
                      email: "2110260840371037.png",
                      pannumber: "2110260840371037.png",
                      panphoto: "2110260840371037.png",
                      composition: "2110260840371037.png",
                      commencementDate: date,
                      principleplace: "2110260840371037.png",
                      pricipleelectricityphoto: "2110260840371037.png",
                      priciplerentphoto: "2110260840371037.png",
                      priciplenocphoto: "2110260840371037.png",
                      additionalplace: "2110260840371037.png",
                      additionalelectricityphoto: "2110260840371037.png",
                      additionalrentphoto: "2110260840371037.png",
                      additionalnocphoto: "2110260840371037.png",
                      businessactivity: "2110260840371037.png",
                      hsn1: "2110260840371037.png",
                      hsn2: "2110260840371037.png",
                      hsn3: "2110260840371037.png",
                      hsn4: "2110260840371037.png",
                      hsn5: "2110260840371037.png",
                      accountname: "2110260840371037.png",
                      accountnumber: "2110260840371037.png",
                      ifsc: "2110260840371037.png",
                      branchname: "2110260840371037.png",
                      branchcode: "2110260840371037.png",
                      cancelcheqphoto: "2110260840371037.png",
                      tradelicensenumber: "2110260840371037.png",
                      tradelicensephoto: "2110260840371037.png",
                      isActive: true,
                      status: "CREATED",
                      createdBy: sessionStorage.getItem("user"),
                      partnerName: "2110260840371037.png",
                      partnerFatherName: "2110260840371037.png",
                      partneradharnumber: "2110260840371037.png",
                      partneradharphoto: "2110260840371037.png",
                      residentialAddress: "2110260840371037.png",
                      partnerPassportPhoto: "2110260840371037.png",
                      trading: false,
                      manufacture: false,
                      service: false,
                      remark: "2110260840371037.png",
                    }
              }
              //   validationSchema={SignInSchema}
              onSubmit={(values: any) => {
                submitForm(values);
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
                        id="firmName"
                        label="Name of the Partnership Firm"
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
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="partnerName"
                        label="Partner's Name"
                        name="partnerName"
                        autoComplete="partnerName"
                        onChange={handleChange}
                        value={values.partnerName}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.partnerName && touched.partnerName
                            ? true
                            : false
                        }
                        helperText={touched.partnerName && errors.partnerName}
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
                        id="partnerFatherName"
                        label="Partner's Father name"
                        name="partnerFatherName"
                        autoComplete="partnerFatherName"
                        onChange={handleChange}
                        value={values.partnerFatherName}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.partnerFatherName && touched.partnerFatherName
                            ? true
                            : false
                        }
                        helperText={
                          touched.partnerFatherName && errors.partnerFatherName
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
                        id="partneradharnumber"
                        label="Aadhaar No. of Partner"
                        name="partneradharnumber"
                        autoComplete="partneradharnumber"
                        onChange={handleChange}
                        value={values.partneradharnumber}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.partneradharnumber &&
                          touched.partneradharnumber
                            ? true
                            : false
                        }
                        helperText={
                          touched.partneradharnumber &&
                          errors.partneradharnumber
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
                        id="partneradharphoto"
                        label="Please attach Aadhar copy"
                        name="partneradharphoto"
                        autoComplete="partneradharphoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "partneradharphoto")
                        }
                        // value={values.partneradharphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.partneradharphoto && touched.partneradharphoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.partneradharphoto && errors.partneradharphoto
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
                        id="residentialAddress"
                        label="Residential Address"
                        name="residentialAddress"
                        autoComplete="residentialAddress"
                        onChange={handleChange}
                        value={values.residentialAddress}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.residentialAddress &&
                          touched.residentialAddress
                            ? true
                            : false
                        }
                        helperText={
                          touched.residentialAddress &&
                          errors.residentialAddress
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
                        id="partnerPassportPhoto"
                        label="Passport Size Photo"
                        name="partnerPassportPhoto"
                        autoComplete="partnerPassportPhoto"
                        onChange={(file) =>
                          upload(file, setFieldValue, "partnerPassportPhoto")
                        }
                        // value={values.partnerPassportPhoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.partnerPassportPhoto &&
                          touched.partnerPassportPhoto
                            ? true
                            : false
                        }
                        helperText={
                          touched.partnerPassportPhoto &&
                          errors.partnerPassportPhoto
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* <Grid container spacing={4}>
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
                        onChange={(file) =>
                          upload(file, setFieldValue, "propadharphoto")
                        }
                        // value={values.propadharphoto}
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
                        onChange={(file) =>
                          upload(file, setFieldValue, "photo")
                        }
                        // value={values.photo}
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
                        onChange={(file) =>
                          upload(file, setFieldValue, "signadharphoto")
                        }
                        // value={values.signadharphoto}
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
                        onChange={(file) =>
                          upload(file, setFieldValue, "signphoto")
                        }
                        // value={values.signphoto}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.signphoto && touched.signphoto ? true : false
                        }
                        helperText={touched.signphoto && errors.signphoto}
                      />
                    </Grid>
                  </Grid>
                  */}
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
                  {params.id && sessionStorage.getItem("role") !== "Customer" && (
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
export const Partnership = withSnackbar(PartnershipComponent);
