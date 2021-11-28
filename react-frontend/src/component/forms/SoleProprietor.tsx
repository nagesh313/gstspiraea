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
import { ViewDocumentDialogComponent } from "../ViewDocumentDialog";
import { EmailVerification } from "./EmailVerification";
import { FileUpload } from "./filepond";
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
  const downloadReport = (filename: any) => {
    axios
      .get("/api/document/downloadFile/" + filename, { responseType: "blob" })
      .then((response: any) => {
        var element = document.createElement("a");
        var file = new Blob([response.data]);
        element.target = "_blank";
        element.download = filename;
        element.href = URL.createObjectURL(file);
        element.click();
        element.remove();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Unable To Download", failureToast);
      });
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
        const commencementDate = response.data.commencementDate?.split;
        if (commencementDate?.length > 0) {
          response.data.commencementDate = response.data.commencementDate?.split(
            "T"
          )[0];
        }
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
    if (!(values.trading || values.manufacture || values.service)) {
      alert("Please select atleast one Option in Nature of Business");
      return;
    }
    if (props.plan) {
      values.paymentPlanDetailsId = props.plan.id;
    } else if (orderDetails?.paymentPlanDetailsId) {
      values.paymentPlanDetailsId = orderDetails?.paymentPlanDetailsId;
    }
    if (props.location) {
      values.location = props.location;
    } else if (orderDetails?.location) {
      values.location = orderDetails?.location;
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
  const isAgent = sessionStorage.getItem("role") === "Agent";
  return (
    <>
      <CssBaseline />
      <ViewDocumentDialogComponent
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
                      soleProprietorPhoto: "",
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
                      hsn1: "",
                      hsn2: "",
                      hsn3: "",
                      hsn4: "",
                      hsn5: "",
                      // branchname: "",
                      accountnumber: "",
                      ifsccode: "",
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
                    <Grid item xs={12} sm={6}>
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"soleProprietorPhoto"}
                        field={values.soleProprietorPhoto}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Proprietor Photo"
                        error={
                          errors.soleProprietorPhoto &&
                          touched.soleProprietorPhoto
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={10} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        style={{ maxWidth: "90%" }}
                        id="email"
                        label="Email ID"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={values.email}
                        error={errors.email && touched.email ? true : false}
                        helperText={touched.email && errors.email}
                      />
                      <EmailVerification
                        id={params.id}
                        value={values.email}
                        verificationObject={values.emailVerification}
                        type={"Proprietorship"}
                        subType={"Email"}
                      ></EmailVerification>
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
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"panphoto"}
                        field={values.panphoto}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Pan Photo"
                        error={
                          errors.panphoto && touched.panphoto ? true : false
                        }
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
                    isAgent ||
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
                        <FileUpload
                          onaddfile={upload}
                          fieldName={"pricipleelectricityphoto"}
                          field={values.pricipleelectricityphoto}
                          downloadReport={downloadReport}
                          setImageName={setImageName}
                          setOpen={setOpen}
                          setFieldValue={setFieldValue}
                          title="Priciple Electricity Bill"
                        />
                        <FileUpload
                          onaddfile={upload}
                          fieldName={"priciplerentphoto"}
                          field={values.priciplerentphoto}
                          downloadReport={downloadReport}
                          setImageName={setImageName}
                          setOpen={setOpen}
                          setFieldValue={setFieldValue}
                          title="Priciple Rent Agreement"
                        />
                        <FileUpload
                          onaddfile={upload}
                          fieldName={"priciplenocphoto"}
                          field={values.priciplenocphoto}
                          downloadReport={downloadReport}
                          setImageName={setImageName}
                          setOpen={setOpen}
                          setFieldValue={setFieldValue}
                          title="Priciple NOC"
                        />
                      </Grid>
                    </Grid>
                  )}

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
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
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"additionalelectricityphoto"}
                        field={values.additionalelectricityphoto}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Additional Electricity Bill"
                      />
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"additionalrentphoto"}
                        field={values.additionalrentphoto}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Additional Rent Agreement"
                      />
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"additionalnocphoto"}
                        field={values.additionalnocphoto}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Additional NOC"
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
                      <Grid item xs={12}>
                        <FileUpload
                          onaddfile={upload}
                          fieldName={"propadharphotoFront"}
                          field={values.propadharphotoFront}
                          downloadReport={downloadReport}
                          setImageName={setImageName}
                          setOpen={setOpen}
                          setFieldValue={setFieldValue}
                          title="Proprietor Adhar Front"
                          error={
                            errors.propadharphotoFront &&
                            touched.propadharphotoFront
                              ? true
                              : false
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FileUpload
                          onaddfile={upload}
                          fieldName={"propadharphotoBack"}
                          field={values.propadharphotoBack}
                          downloadReport={downloadReport}
                          setImageName={setImageName}
                          setOpen={setOpen}
                          setFieldValue={setFieldValue}
                          title="Proprietor Adhar Back"
                          error={
                            errors.propadharphotoBack &&
                            touched.propadharphotoBack
                              ? true
                              : false
                          }
                        />
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
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"photo"}
                        field={values.photo}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Proprietor Photo"
                        error={errors.photo && touched.photo ? true : false}
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
                        type="number"
                        label="1"
                        id="hsn1"
                        name="hsn1"
                        onChange={handleChange}
                        value={values.hsn1}
                        error={errors.hsn1 && touched.hsn1 ? true : false}
                        helperText={touched.hsn1 && errors.hsn1}
                      ></TextField>
                      <TextField
                        type="number"
                        label="2"
                        id="hsn2"
                        name="hsn2"
                        onChange={handleChange}
                        value={values.hsn2}
                      ></TextField>
                      <TextField
                        type="number"
                        label="3"
                        id="hsn3"
                        name="hsn3"
                        onChange={handleChange}
                        value={values.hsn3}
                      ></TextField>
                      <TextField
                        type="number"
                        label="4"
                        id="hsn4"
                        name="hsn4"
                        onChange={handleChange}
                        value={values.hsn4}
                      ></TextField>
                      <TextField
                        type="number"
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
                        id="accountnumber"
                        label="Bank Account Number"
                        name="accountnumber"
                        autoComplete="accountnumber"
                        onChange={handleChange}
                        value={values.accountnumber}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.accountnumber && touched.accountnumber
                            ? true
                            : false
                        }
                        helperText={
                          touched.accountnumber && errors.accountnumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="ifsccode"
                        label="IFSC CODE"
                        name="ifsccode"
                        autoComplete="ifsccode"
                        onChange={handleChange}
                        value={values.ifsccode}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.ifsccode && touched.ifsccode ? true : false
                        }
                        helperText={touched.ifsccode && errors.ifsccode}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <FileUpload
                        onaddfile={upload}
                        fieldName={"cancelcheqphoto"}
                        field={values.cancelcheqphoto}
                        downloadReport={downloadReport}
                        setImageName={setImageName}
                        setOpen={setOpen}
                        setFieldValue={setFieldValue}
                        title="Cancel Cheque Photo"
                      />
                    </Grid>
                  </Grid>

                  {(isAdmin ||
                    isAgent ||
                    (values.tradelicensenumber &&
                      values.tradelicensenumber !== "")) && (
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="dense"
                          size="small"
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
                        <FileUpload
                          onaddfile={upload}
                          fieldName={"tradelicensephoto"}
                          field={values.tradelicensephoto}
                          downloadReport={downloadReport}
                          setImageName={setImageName}
                          setOpen={setOpen}
                          setFieldValue={setFieldValue}
                          title="Trade License Photo"
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
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
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
                          <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="dense"
                                size="small"
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
                              <FileUpload
                                onaddfile={upload}
                                fieldName={"gstAttachment" + index}
                                field={values["gstAttachment" + index]}
                                downloadReport={downloadReport}
                                setImageName={setImageName}
                                setOpen={setOpen}
                                setFieldValue={setFieldValue}
                                title={"Gst Attachment " + (index + 1)}
                                error={
                                  errors["gstAttachment" + index] &&
                                  touched["gstAttachment" + index]
                                    ? true
                                    : false
                                }
                              />
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      );
                    }
                  )}
                  {(isAdmin ||
                    isAgent ||
                    (values.remark && values.remark !== "")) && (
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          size="small"
                          // disabled={sessionStorage.getItem("role") === "Customer"}
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
                  <Grid container spacing={2} justifyContent="center">
                    {sessionStorage.getItem("role") === "Customer" &&
                      (orderDetails?.status === "DRAFT" ||
                        params.id === undefined) && (
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
                            Save as Draft
                          </Button>
                        </Grid>
                      )}
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
                  {sessionStorage.getItem("role") !== "Customer" &&
                    (orderDetails?.status === "CREATED" ||
                      orderDetails?.status === "PAID") && (
                      <Grid
                        container
                        justifyContent="center"
                        style={{ marginTop: "10px" }}
                      >
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
                    )}
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </>
  );
};
export const SoleProprietor = withSnackbar(SoleProprietorComponent);
