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
import { schema } from "./schema/SoleProprietorSchama";

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

const SoleProprietorComponent = (props: any) => {
  const classes = useStyles();
  const { params }: any = useRouteMatch();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = React.useState<any>();
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
  const fetchOrderDetails = (id: any) => {
    axios
      .get("/api/get-order/get/Proprietorship/" + id)
      .then((response: any) => {
        // props.enqueueSnackbar("Order Rejected Successfull", successToast);
        response.data.gstCertificatesInOtherStates.forEach(
          (gst: any, index: any) => {
            response.data["id" + index] = gst.id;
            response.data["gstNumber" + index] = gst.gstNumber;
            response.data["gstAttachment" + index] = gst.gstAttachment;
          }
        );
        response.data.numberOfOtherGST =
          response.data.gstCertificatesInOtherStates.length;
        setOrderDetails(response.data);
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const approve = () => {
    axios
      .get("/api/get-order/Proprietorship/" + params.id + "/APPROVED/")
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
      .get("/api/get-order/Proprietorship/" + params.id + "/REJECTED/")
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
    if (event.currentTarget.files[0].size > 100000 && field === "photo") {
      props.enqueueSnackbar("File Cannot be bigger than 100KB", failureToast);
      event.target.value = "";
    } else {
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
    }
  };
  const submitForm = (values: any, save = false) => {
    if (props.plan) {
      values.paymentPlanLocationDetails = props.plan;
    } else if (orderDetails?.paymentPlanLocationDetails) {
      values.paymentPlanLocationDetails =
        orderDetails?.paymentPlanLocationDetails;
    }
    const gstCertificatesInOtherStates: any = [];
    [...Array(values.numberOfOtherGST)].forEach((value: any, index: any) => {
      gstCertificatesInOtherStates.push({
        id: values["id" + index] ? values["id" + index] : undefined,
        gstNumber: values["gstNumber" + index],
        gstAttachment: values["gstAttachment" + index],
      });
    });
    values.gstCertificatesInOtherStates = gstCertificatesInOtherStates;
    if (save) {
      axios
        .post("/api/save-submit-proprietorship", { ...values })
        .then((response: any) => {
          props.enqueueSnackbar(
            "Application Submitted Successfully",
            successToast
          );
          history.push("/dashboard/order-list");
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar("Error while submitting", failureToast);
        });
    } else {
      axios
        .post("/api/submit-proprietorship", { ...values })
        .then((response: any) => {
          props.enqueueSnackbar(
            "Application Submitted Successfully",
            successToast
          );
          history.push("/dashboard/order-list");
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar("Error while submitting", failureToast);
        });
    }
  };

  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);

  let valuesOfGSTInOtherStates: any = {};
  [...Array(15)].forEach((value: any, index: any) => {
    valuesOfGSTInOtherStates["gstNumber" + index] = "";
    valuesOfGSTInOtherStates["gstAttachment" + index] = "";
  });
  const isAdmin = sessionStorage.getItem("role") === "Admin";
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
            Sole Proprietor
          </Typography>
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={
                orderDetails
                  ? orderDetails
                  : {
                      personName: "",
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
                      propfatherName: "",
                      propadharnumber: "",
                      propadharphotoFront: "",
                      propadharphotoBack: "",
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
                      isActive: true,
                      createdBy: sessionStorage.getItem("user"),
                      status: "CREATED",
                      remark: "",
                      trading: false,
                      manufacture: false,
                      service: false,
                      numberOfOtherGST: 0,
                      ...valuesOfGSTInOtherStates,
                    }
              }
              validationSchema={schema}
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

                  {(isAdmin ||
                    (values.principleplace &&
                      values.principleplace !== "")) && (
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
                            errors.priciplerentphoto &&
                            touched.priciplerentphoto
                              ? true
                              : false
                          }
                          helperText={
                            touched.priciplerentphoto &&
                            errors.priciplerentphoto
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
                          helperText={
                            touched.panphoto && errors.priciplenocphoto
                          }
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
                  )}

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
                    <Grid item container xs={12} sm={6}>
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          type="file"
                          style={{ width: "90%" }}
                          size="small"
                          required
                          fullWidth
                          id="propadharphotoFront"
                          label="Please attach Front Aadhar copy"
                          name="propadharphotoFront"
                          autoComplete="propadharphotoFront"
                          onChange={(file) =>
                            upload(file, setFieldValue, "propadharphotoFront")
                          }
                          // value={values.propadharphotoFront}
                          InputLabelProps={{ shrink: true }}
                          error={
                            errors.propadharphotoFront &&
                            touched.propadharphotoFront
                              ? true
                              : false
                          }
                          helperText={
                            touched.propadharphotoFront &&
                            errors.propadharphotoFront
                          }
                        />
                        {values.propadharphotoFront && (
                          <Visibility
                            onClick={() => {
                              setImageName(values.propadharphotoFront);
                              setOpen(true);
                            }}
                            style={{ float: "right", marginTop: "25px" }}
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
                          id="propadharphotoBack"
                          label="Please attach Back Aadhar copy"
                          name="propadharphotoBack"
                          autoComplete="propadharphotoBack"
                          onChange={(file) =>
                            upload(file, setFieldValue, "propadharphotoBack")
                          }
                          // value={values.propadharphotoBack}
                          InputLabelProps={{ shrink: true }}
                          error={
                            errors.propadharphotoBack &&
                            touched.propadharphotoBack
                              ? true
                              : false
                          }
                          helperText={
                            touched.propadharphotoBack &&
                            errors.propadharphotoBack
                          }
                        />
                        {values.propadharphotoBack && (
                          <Visibility
                            onClick={() => {
                              setImageName(values.propadharphotoBack);
                              setOpen(true);
                            }}
                            style={{ float: "right", marginTop: "25px" }}
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
                        style={{ width: "90%" }}
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
                      {values.photo && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.photo);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
                    </Grid>
                  </Grid>
                  {/* 
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
                        style={{ width: "90%" }}
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
                      {values.signadharphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.signadharphoto);
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
                        style={{ width: "90%" }}
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
                      {values.signphoto && (
                        <Visibility
                          onClick={() => {
                            setImageName(values.signphoto);
                            setOpen(true);
                          }}
                          style={{ float: "right", marginTop: "25px" }}
                        />
                      )}
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
                    </Grid>
                  </Grid>

                  {sessionStorage.getItem("role") !== "Admin" && (
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
                            errors.tradelicensephoto &&
                            touched.tradelicensephoto
                              ? true
                              : false
                          }
                          helperText={
                            touched.tradelicensephoto &&
                            errors.tradelicensephoto
                          }
                        />
                      </Grid>
                    </Grid>
                  )}

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        type="number"
                        fullWidth
                        id="numberOfOtherGST"
                        label="Number Of Other GST"
                        name="numberOfOtherGST"
                        autoComplete="numberOfOtherGST"
                        onChange={handleChange}
                        value={values.numberOfOtherGST}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.numberOfOtherGST && touched.numberOfOtherGST
                            ? true
                            : false
                        }
                        helperText={
                          touched.numberOfOtherGST && errors.numberOfOtherGST
                        }
                      />
                    </Grid>
                  </Grid>

                  {[...Array(values.numberOfOtherGST)].map(
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
                                id={"gstNumber" + index}
                                label={"GST Number " + (index + 1)}
                                name={"gstNumber" + index}
                                autoComplete={"gstNumber" + index}
                                onChange={handleChange}
                                value={values["gstNumber" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["gstNumber" + index] &&
                                  touched["gstNumber" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["gstNumber" + index] &&
                                  errors["gstNumber" + index]
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
                                id={"gstAttachment" + index}
                                label="Please attach GST Copy"
                                name={"gstAttachment" + index}
                                autoComplete={"gstAttachment" + index}
                                onChange={(file) =>
                                  upload(
                                    file,
                                    setFieldValue,
                                    "gstAttachment" + index
                                  )
                                }
                                // value={values.gstAttachment}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["gstAttachment" + index] &&
                                  touched["gstAttachment" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["gstAttachment" + index] &&
                                  errors["gstAttachment" + index]
                                }
                              />
                              {values["gstAttachment" + index] && (
                                <Visibility
                                  onClick={() => {
                                    setImageName(
                                      values["gstAttachment" + index]
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
                        </React.Fragment>
                      );
                    }
                  )}
                  <Divider />
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
                                submitForm(values, true);
                              }}
                            >
                              Save & Update
                            </Button>
                            <Button
                              style={{ marginLeft: "10px" }}
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
export const SoleProprietor = withSnackbar(SoleProprietorComponent);
