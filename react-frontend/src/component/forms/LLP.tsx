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
import { schema } from "./schema/LLPSchema";

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
const LLPComponent = (props: any) => {
  const classes = useStyles();
  const { params }: any = useRouteMatch();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = React.useState<any>();
  const fetchOrderDetails = (id: any) => {
    axios
      .get("/api/get-order/get/LLP/" + id)
      .then((response: any) => {
        response.data.partnerList.forEach((partner: any, index: any) => {
          response.data["partnerName" + index] = partner.partnerName;
          response.data["partnerFatherName" + index] =
            partner.partnerFatherName;
          response.data["partnerAadharNo" + index] = partner.partnerAadharNo;
          response.data["partnerAadharPhotoCopyFront" + index] =
            partner.partnerAadharPhotoCopyFront;
          response.data["partnerAadharPhotoCopyBack" + index] =
            partner.partnerAadharPhotoCopyBack;
          response.data["partnerResidentialAddress" + index] =
            partner.partnerResidentialAddress;
          response.data["partnerPhoto" + index] = partner.partnerPhoto;
        });
        response.data.numberOfPartners = response.data.partnerList.length;
        setOrderDetails(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Error fetching order details", failureToast);
      });
  };
  const approve = () => {
    axios
      .get("/api/get-order/LLP/" + params.id + "/APPROVED/")
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
      .get("/api/get-order/LLP/" + params.id + "/REJECTED/")
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
        props.enqueueSnackbar(reponse.message, failureToast);
        event.target.value = "";
      });
  };
  const submitForm = (values: any, save = false) => {
    if (props.plan) {
      values.paymentPlanLocationDetails = props.plan;
    } else if (orderDetails?.paymentPlanLocationDetails) {
      values.paymentPlanLocationDetails =
        orderDetails?.paymentPlanLocationDetails;
    }
    const partnerList: any = [];
    [...Array(values.numberOfDirectors)].forEach((value: any, index: any) => {
      partnerList.push({
        partnerName: values["partnerName" + index],
        partnerFatherName: values["partnerFatherName" + index],
        partnerAadharNo: values["partnerAadharNo" + index],
        partnerAadharPhotoCopyFront:
          values["partnerAadharPhotoCopyFront" + index],
        partnerAadharPhotoCopyBack:
          values["partnerAadharPhotoCopyBack" + index],
        partnerResidentialAddress: values["partnerResidentialAddress" + index],
        partnerPhoto: values["partnerPhoto" + index],
      });
    });
    values.partnerList = partnerList;

    if (save) {
      axios
        .post("/api/save-submit-llp", { ...values })
        .then((response: any) => {
          history.push("/dashboard/order-list");
          props.enqueueSnackbar("Application Saved SuccessFully", successToast);
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(
            "Not able to save the Application",
            failureToast
          );
        });
    } else {
      axios
        .post("/api/submit-llp", { ...values })
        .then((response: any) => {
          history.push("/dashboard/order-list");
          props.enqueueSnackbar("Application Saved SuccessFully", successToast);
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(
            "Not able to save the Application",
            failureToast
          );
        });
    }
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
  let valuesForPartners: any = {};
  [...Array(15)].forEach((value: any, index: any) => {
    valuesForPartners["partnerName" + index] = "";
    valuesForPartners["partnerFatherName" + index] = "";
    valuesForPartners["partnerAadharNo" + index] = "";
    valuesForPartners["partnerAadharPhotoCopyFront" + index] = "";
    valuesForPartners["partnerAadharPhotoCopyBack" + index] = "";
    valuesForPartners["partnerResidentialAddress" + index] = "";
    valuesForPartners["partnerPhoto" + index] = "";
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
            LLP
          </Typography>
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={
                orderDetails
                  ? orderDetails
                  : {
                      firmName: "test",
                      legalbusinessName: "test",
                      tradeName: "test",
                      mobile: "test",
                      email: "test",
                      pannumber: "test",
                      panphoto: "test",
                      composition: "No",
                      commencementDate: date,
                      principleplace: "test",
                      pricipleelectricityphoto: "test",
                      priciplerentphoto: "test",
                      priciplenocphoto: "test",
                      additionalplace: "test",
                      additionalelectricityphoto: "test",
                      additionalrentphoto: "test",
                      additionalnocphoto: "test",
                      businessactivity: "test",
                      hsn1: "test",
                      hsn2: "test",
                      hsn3: "test",
                      hsn4: "test",
                      hsn5: "test",
                      accountname: "test",
                      accountnumber: "test",
                      ifsc: "test",
                      branchname: "test",
                      branchcode: "test",
                      cancelcheqphoto: "test",
                      tradelicensenumber: "test",
                      tradelicensephoto: "test",
                      isActive: true,
                      status: "CREATED",
                      createdBy: sessionStorage.getItem("user"),
                      trading: false,
                      manufacture: false,
                      service: false,
                      remark: "test",
                      numberOfPartners: 1,
                      ...valuesForPartners,
                    }
              }
              validationSchema={schema}
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
                        label="Name of the LLP"
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
                        id="numberOfPartners"
                        label="Number of Partner"
                        name="numberOfPartners"
                        autoComplete="numberOfPartners"
                        onChange={handleChange}
                        value={values.numberOfPartners}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.numberOfPartners && touched.numberOfPartners
                            ? true
                            : false
                        }
                        helperText={
                          touched.numberOfPartners && errors.numberOfPartners
                        }
                      />
                    </Grid>
                  </Grid>
                  {[...Array(values.numberOfPartners)].map(
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
                                id={"partnerName" + index}
                                label={"Partner " + (index + 1) + " Name"}
                                name={"partnerName" + index}
                                autoComplete={"partnerName" + index}
                                onChange={handleChange}
                                value={values["partnerName" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerName" + index] &&
                                  touched["partnerName" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["partnerName" + index] &&
                                  errors["partnerName" + index]
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
                                id={"partnerFatherName" + index}
                                label={
                                  "Partner " + (index + 1) + " Father's name"
                                }
                                name={"partnerFatherName" + index}
                                autoComplete={"partnerFatherName" + index}
                                onChange={handleChange}
                                value={values["partnerFatherName" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerFatherName" + index] &&
                                  touched["partnerFatherName" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["partnerFatherName" + index] &&
                                  errors["partnerFatherName" + index]
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
                                id={"partnerAadharNo" + index}
                                label={"Aadhaar No. of Partner " + (index + 1)}
                                name={"partnerAadharNo" + index}
                                autoComplete={"partnerAadharNo" + index}
                                onChange={handleChange}
                                value={values["partnerAadharNo" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerAadharNo" + index] &&
                                  touched["partnerAadharNo" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["partnerAadharNo" + index] &&
                                  errors["partnerAadharNo" + index]
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Grid item xs={12}>
                                <TextField
                                  margin="dense"
                                  type="file"
                                  style={{ width: "90%" }}
                                  size="small"
                                  required
                                  fullWidth
                                  id={"partnerAadharPhotoCopyFront" + index}
                                  label="Please attach Front Aadhar copy"
                                  name={"partnerAadharPhotoCopyFront" + index}
                                  autoComplete={
                                    "partnerAadharPhotoCopyFront" + index
                                  }
                                  onChange={(file) =>
                                    upload(
                                      file,
                                      setFieldValue,
                                      "partnerAadharPhotoCopyFront" + index
                                    )
                                  }
                                  // value={values.partnerAadharPhotoCopyFront}
                                  InputLabelProps={{ shrink: true }}
                                  error={
                                    errors[
                                      "partnerAadharPhotoCopyFront" + index
                                    ] &&
                                    touched[
                                      "partnerAadharPhotoCopyFront" + index
                                    ]
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    touched[
                                      "partnerAadharPhotoCopyFront" + index
                                    ] &&
                                    errors[
                                      "partnerAadharPhotoCopyFront" + index
                                    ]
                                  }
                                />
                                {values[
                                  "partnerAadharPhotoCopyFront" + index
                                ] && (
                                  <Visibility
                                    onClick={() => {
                                      setImageName(
                                        values[
                                          "partnerAadharPhotoCopyFront" + index
                                        ]
                                      );
                                      setOpen(true);
                                    }}
                                    style={{
                                      float: "right",
                                      marginTop: "25px",
                                    }}
                                  />
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  margin="dense"
                                  type="file"
                                  style={{ width: "90%" }}
                                  size="small"
                                  required
                                  fullWidth
                                  id={"partnerAadharPhotoCopyBack" + index}
                                  label="Please attach Front Aadhar copy"
                                  name={"partnerAadharPhotoCopyBack" + index}
                                  autoComplete={
                                    "partnerAadharPhotoCopyBack" + index
                                  }
                                  onChange={(file) =>
                                    upload(
                                      file,
                                      setFieldValue,
                                      "partnerAadharPhotoCopyBack" + index
                                    )
                                  }
                                  // value={values.partnerAadharPhotoCopyBack}
                                  InputLabelProps={{ shrink: true }}
                                  error={
                                    errors[
                                      "partnerAadharPhotoCopyBack" + index
                                    ] &&
                                    touched[
                                      "partnerAadharPhotoCopyBack" + index
                                    ]
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    touched[
                                      "partnerAadharPhotoCopyBack" + index
                                    ] &&
                                    errors["partnerAadharPhotoCopyBack" + index]
                                  }
                                />
                                {values[
                                  "partnerAadharPhotoCopyBack" + index
                                ] && (
                                  <Visibility
                                    onClick={() => {
                                      setImageName(
                                        values[
                                          "partnerAadharPhotoCopyBack" + index
                                        ]
                                      );
                                      setOpen(true);
                                    }}
                                    style={{
                                      float: "right",
                                      marginTop: "25px",
                                    }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                id={"partnerResidentialAddress" + index}
                                label="Residential Address"
                                name={"partnerResidentialAddress" + index}
                                autoComplete={
                                  "partnerResidentialAddress" + index
                                }
                                onChange={handleChange}
                                value={
                                  values["partnerResidentialAddress" + index]
                                }
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerResidentialAddress" + index] &&
                                  touched["partnerResidentialAddress" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched[
                                    "partnerResidentialAddress" + index
                                  ] &&
                                  errors["partnerResidentialAddress" + index]
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
                                id={"partnerPhoto" + index}
                                label="Passport Size Photo"
                                name={"partnerPhoto" + index}
                                autoComplete={"partnerPhoto" + index}
                                onChange={(file) =>
                                  upload(
                                    file,
                                    setFieldValue,
                                    "partnerPhoto" + index
                                  )
                                }
                                // value={values.partnerPhoto}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerPhoto" + index] &&
                                  touched["partnerPhoto" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["partnerPhoto" + index] &&
                                  errors["partnerPhoto" + index]
                                }
                              />
                              {values["partnerPhoto" + index] && (
                                <Visibility
                                  onClick={() => {
                                    setImageName(
                                      values["partnerPhoto" + index]
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
                  {(params.id === undefined ||
                    orderDetails?.status === "DRAFT") && (
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          style={{ marginTop: "10px" }}
                          // className={classes.submit}
                          onClick={() => {
                            submitForm(values, true);
                          }}
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                    </Grid>
                  )}
                  {params.id &&
                    sessionStorage.getItem("role") !== "Customer" &&
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
export const LLP = withSnackbar(LLPComponent);
