import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
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
import { DialogComponent } from "../Dialog";
import { schema } from "./schema/LLPSchema";
import { Visibility, GetApp, Message } from "@material-ui/icons";
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
          response.data["pannumber" + index] = partner.pannumber;
          response.data["pannumberCopy" + index] = partner.pannumberCopy;
          response.data["partnerResidentialAddress" + index] =
            partner.partnerResidentialAddress;
          response.data["partnerPhoto" + index] = partner.partnerPhoto;
          response.data["partnerMobile" + index] = partner.partnerMobile;
          response.data["partnerEmail" + index] = partner.partnerEmail;
          response.data["isAuthorisedSignatory" + index] =
            partner.isAuthorisedSignatory;
        });
        response.data.numberOfPartners = response.data.partnerList.length;

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
    if (
      event.currentTarget.files[0].size > 100000 &&
      field.includes("partnerPhoto")
    ) {
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
    const partnerList: any = [];
    [...Array(values.numberOfPartners)].forEach((value: any, index: any) => {
      partnerList.push({
        id: values["id" + index] ? values["id" + index] : undefined,
        partnerName: values["partnerName" + index],
        partnerFatherName: values["partnerFatherName" + index],
        partnerAadharNo: values["partnerAadharNo" + index],
        partnerAadharPhotoCopyFront:
          values["partnerAadharPhotoCopyFront" + index],
        partnerAadharPhotoCopyBack:
          values["partnerAadharPhotoCopyBack" + index],
        pannumber: values["pannumber" + index],
        pannumberCopy: values["pannumberCopy" + index],
        partnerResidentialAddress: values["partnerResidentialAddress" + index],
        partnerPhoto: values["partnerPhoto" + index],
        partnerMobile: values["partnerMobile" + index],
        partnerEmail: values["partnerEmail" + index],
        isAuthorisedSignatory: values["isAuthorisedSignatory" + index],
      });
    });

    const partnerListEmail = partnerList.map((p: any) => p.partnerEmail);
    const duplicates = partnerListEmail.filter(
      (item: any, index: any) => partnerListEmail.indexOf(item) !== index
    );
    if (duplicates?.length > 0) {
      alert("Duplicate Partner email found : " + duplicates.toString());
      return;
    }
    const partnerListAuthorised = partnerList
      .map((p: any) => p.isAuthorisedSignatory)
      .filter((p: any) => p);
    if (partnerListAuthorised?.length === 0) {
      alert("Please select atleast on Authorised Partner");
      return;
    }
    if (partnerListAuthorised?.length > 1) {
      alert("Only one Partner can be Authorised Partner");
      return;
    }

    values.partnerList = partnerList;
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
    valuesForPartners["pannumber" + index] = "";
    valuesForPartners["pannumberCopy" + index] = "";
    valuesForPartners["partnerResidentialAddress" + index] = "";
    valuesForPartners["partnerPhoto" + index] = "";
    valuesForPartners["partnerMobile" + index] = "";
    valuesForPartners["partnerEmail" + index] = "";
    valuesForPartners["isAuthorisedSignatory" + index] = false;
  });
  let valuesOfGSTInOtherStates: any = {};
  [...Array(15)].forEach((value: any, index: any) => {
    valuesOfGSTInOtherStates["gstNumber" + index] = "";
    valuesOfGSTInOtherStates["gstAttachment" + index] = "";
  });
  const isAdmin = sessionStorage.getItem("role") === "Admin";
  console.log(schema);
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
                      hsn1: "",
                      hsn2: "",
                      hsn3: "",
                      hsn4: "",
                      hsn5: "",
                      branchname: "",
                      accountnumber: "",
                      ifsccode: "",
                      cancelcheqphoto: "",
                      tradelicensenumber: "",
                      tradelicensephoto: "",
                      certificateOfIncorportation: "",
                      partnershipDeed: "",
                      isActive: true,
                      status: "CREATED",
                      createdBy: sessionStorage.getItem("user"),
                      trading: false,
                      manufacture: false,
                      service: false,
                      remark: "",
                      declarationOfAuthorisedSignatory: "",
                      numberOfPartners: 1,
                      ...valuesForPartners,
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
                          <>
                            <Tooltip title="View">
                              <Visibility
                                className="file-action-icon"
                                onClick={() => {
                                  setImageName(values.pricipleelectricityphoto);
                                  setOpen(true);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Download">
                              <GetApp
                                className="file-action-icon"
                                onClick={() => {
                                  downloadReport(
                                    values.pricipleelectricityphoto
                                  );
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              title={
                                "File Name : " + values.pricipleelectricityphoto
                              }
                            >
                              <Message className="file-action-icon" />
                            </Tooltip>
                          </>
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
                          <>
                            <Tooltip title="View">
                              <Visibility
                                className="file-action-icon"
                                onClick={() => {
                                  setImageName(values.priciplerentphoto);
                                  setOpen(true);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Download">
                              <GetApp
                                className="file-action-icon"
                                onClick={() => {
                                  downloadReport(values.priciplerentphoto);
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              title={"File Name : " + values.priciplerentphoto}
                            >
                              <Message className="file-action-icon" />
                            </Tooltip>
                          </>
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
                            touched.priciplenocphoto && errors.priciplenocphoto
                          }
                        />
                        {values.priciplenocphoto && (
                          <>
                            <Tooltip title="View">
                              <Visibility
                                className="file-action-icon"
                                onClick={() => {
                                  setImageName(values.priciplenocphoto);
                                  setOpen(true);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Download">
                              <GetApp
                                className="file-action-icon"
                                onClick={() => {
                                  downloadReport(values.priciplenocphoto);
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              title={"File Name : " + values.priciplenocphoto}
                            >
                              <Message className="file-action-icon" />
                            </Tooltip>
                          </>
                        )}
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
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
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
                        <>
                          <Tooltip title="View">
                            <Visibility
                              className="file-action-icon"
                              onClick={() => {
                                setImageName(values.additionalelectricityphoto);
                                setOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <GetApp
                              className="file-action-icon"
                              onClick={() => {
                                downloadReport(
                                  values.additionalelectricityphoto
                                );
                              }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={
                              "File Name : " + values.additionalelectricityphoto
                            }
                          >
                            <Message className="file-action-icon" />
                          </Tooltip>
                        </>
                      )}
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
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
                        <>
                          <Tooltip title="View">
                            <Visibility
                              className="file-action-icon"
                              onClick={() => {
                                setImageName(values.additionalrentphoto);
                                setOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <GetApp
                              className="file-action-icon"
                              onClick={() => {
                                downloadReport(values.additionalrentphoto);
                              }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={"File Name : " + values.additionalrentphoto}
                          >
                            <Message className="file-action-icon" />
                          </Tooltip>
                        </>
                      )}
                      <TextField
                        margin="dense"
                        type="file"
                        style={{ width: "90%" }}
                        size="small"
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
                        <>
                          <Tooltip title="View">
                            <Visibility
                              className="file-action-icon"
                              onClick={() => {
                                setImageName(values.additionalnocphoto);
                                setOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <GetApp
                              className="file-action-icon"
                              onClick={() => {
                                downloadReport(values.additionalnocphoto);
                              }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={"File Name : " + values.additionalnocphoto}
                          >
                            <Message className="file-action-icon" />
                          </Tooltip>
                        </>
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
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={
                                        values["isAuthorisedSignatory" + index]
                                      }
                                      value={
                                        values["isAuthorisedSignatory" + index]
                                      }
                                    />
                                  }
                                  id={"isAuthorisedSignatory" + index}
                                  name={"isAuthorisedSignatory" + index}
                                  onChange={handleChange}
                                  // error={
                                  //   errors["isAuthorisedSignatory" + index] &&
                                  //   touched["isAuthorisedSignatory" + index]
                                  //     ? true
                                  //     : false
                                  // }
                                  // helperText={
                                  //   touched["isAuthorisedSignatory" + index] &&
                                  //   errors["isAuthorisedSignatory" + index]
                                  // }
                                  label={
                                    "Partner " +
                                    (index + 1) +
                                    " is Authorised Signatory"
                                  }
                                />
                              </FormGroup>
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
                                  <>
                                    <Tooltip title="View">
                                      <Visibility
                                        className="file-action-icon"
                                        onClick={() => {
                                          setImageName(
                                            values[
                                              "partnerAadharPhotoCopyFront" +
                                                index
                                            ]
                                          );
                                          setOpen(true);
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip title="Download">
                                      <GetApp
                                        className="file-action-icon"
                                        onClick={() => {
                                          downloadReport(
                                            values[
                                              "partnerAadharPhotoCopyFront" +
                                                index
                                            ]
                                          );
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        "File Name : " +
                                        values[
                                          "partnerAadharPhotoCopyFront" + index
                                        ]
                                      }
                                    >
                                      <Message className="file-action-icon" />
                                    </Tooltip>
                                  </>
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
                                  <>
                                    <Tooltip title="View">
                                      <Visibility
                                        className="file-action-icon"
                                        onClick={() => {
                                          setImageName(
                                            values[
                                              "partnerAadharPhotoCopyBack" +
                                                index
                                            ]
                                          );
                                          setOpen(true);
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip title="Download">
                                      <GetApp
                                        className="file-action-icon"
                                        onClick={() => {
                                          downloadReport(
                                            values[
                                              "partnerAadharPhotoCopyBack" +
                                                index
                                            ]
                                          );
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        "File Name : " +
                                        values[
                                          "partnerAadharPhotoCopyBack" + index
                                        ]
                                      }
                                    >
                                      <Message className="file-action-icon" />
                                    </Tooltip>
                                  </>
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
                                id={"pannumber" + index}
                                label={"PAN No. of Partner " + (index + 1)}
                                name={"pannumber" + index}
                                autoComplete={"pannumber" + index}
                                onChange={handleChange}
                                value={values["pannumber" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["pannumber" + index] &&
                                  touched["pannumber" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["pannumber" + index] &&
                                  errors["pannumber" + index]
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
                                id={"pannumberCopy" + index}
                                label="Please attach PAN copy"
                                name={"pannumberCopy" + index}
                                autoComplete={"pannumberCopy" + index}
                                onChange={(file) =>
                                  upload(
                                    file,
                                    setFieldValue,
                                    "pannumberCopy" + index
                                  )
                                }
                                // value={values.pannumberCopy}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["pannumberCopy" + index] &&
                                  touched["pannumberCopy" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["pannumberCopy" + index] &&
                                  errors["pannumberCopy" + index]
                                }
                              />
                              {values["pannumberCopy" + index] && (
                                <>
                                  <Tooltip title="View">
                                    <Visibility
                                      className="file-action-icon"
                                      onClick={() => {
                                        setImageName(
                                          values["pannumberCopy" + index]
                                        );
                                        setOpen(true);
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Download">
                                    <GetApp
                                      className="file-action-icon"
                                      onClick={() => {
                                        downloadReport(
                                          values["pannumberCopy" + index]
                                        );
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip
                                    title={
                                      "File Name : " +
                                      values["pannumberCopy" + index]
                                    }
                                  >
                                    <Message className="file-action-icon" />
                                  </Tooltip>
                                </>
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
                                id={"partnerResidentialAddress" + index}
                                label={
                                  "Residential Address of Partner " +
                                  (index + 1)
                                }
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
                                label={
                                  "Passport Size Photo of Partner " +
                                  (index + 1)
                                }
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
                                <>
                                  <Tooltip title="View">
                                    <Visibility
                                      className="file-action-icon"
                                      onClick={() => {
                                        setImageName(
                                          values["partnerPhoto" + index]
                                        );
                                        setOpen(true);
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Download">
                                    <GetApp
                                      className="file-action-icon"
                                      onClick={() => {
                                        downloadReport(
                                          values["partnerPhoto" + index]
                                        );
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip
                                    title={
                                      "File Name : " +
                                      values["partnerPhoto" + index]
                                    }
                                  >
                                    <Message className="file-action-icon" />
                                  </Tooltip>
                                </>
                              )}
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                // type="number"
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                id={"partnerMobile" + index}
                                label={"Mobile of Partner " + (index + 1)}
                                name={"partnerMobile" + index}
                                autoComplete={"partnerMobile" + index}
                                onChange={handleChange}
                                value={values["partnerMobile" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerMobile" + index] &&
                                  touched["partnerMobile" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["partnerMobile" + index] &&
                                  errors["partnerMobile" + index]
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                id={"partnerEmail" + index}
                                label={"Email of Partner " + (index + 1)}
                                name={"partnerEmail" + index}
                                autoComplete={"partnerEmail" + index}
                                onChange={handleChange}
                                value={values["partnerEmail" + index]}
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors["partnerEmail" + index] &&
                                  touched["partnerEmail" + index]
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched["partnerEmail" + index] &&
                                  errors["partnerEmail" + index]
                                }
                              />
                            </Grid>
                          </Grid>{" "}
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
                        <>
                          <Tooltip title="View">
                            <Visibility
                              className="file-action-icon"
                              onClick={() => {
                                setImageName(values.cancelcheqphoto);
                                setOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <GetApp
                              className="file-action-icon"
                              onClick={() => {
                                downloadReport(values.cancelcheqphoto);
                              }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={"File Name : " + values.cancelcheqphoto}
                          >
                            <Message className="file-action-icon" />
                          </Tooltip>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="file"
                        style={{ width: "90%" }}
                        margin="dense"
                        size="small"
                        fullWidth
                        id="partnershipDeed"
                        label="Partnership Deed"
                        name="partnershipDeed"
                        autoComplete="partnershipDeed"
                        onChange={(file) =>
                          upload(file, setFieldValue, "partnershipDeed")
                        }
                        // value={values.partnershipDeed}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.partnershipDeed && touched.partnershipDeed
                            ? true
                            : false
                        }
                        helperText={
                          touched.partnershipDeed && errors.partnershipDeed
                        }
                      />
                      {values.partnershipDeed && (
                        <>
                          <Tooltip title="View">
                            <Visibility
                              className="file-action-icon"
                              onClick={() => {
                                setImageName(values.partnershipDeed);
                                setOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <GetApp
                              className="file-action-icon"
                              onClick={() => {
                                downloadReport(values.partnershipDeed);
                              }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={"File Name : " + values.partnershipDeed}
                          >
                            <Message className="file-action-icon" />
                          </Tooltip>
                        </>
                      )}
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
                        id="certificateOfIncorportation"
                        label="Certificate Of Incorportation"
                        name="certificateOfIncorportation"
                        autoComplete="certificateOfIncorportation"
                        onChange={(file) =>
                          upload(
                            file,
                            setFieldValue,
                            "certificateOfIncorportation"
                          )
                        }
                        // value={values.certificateOfIncorportation}
                        InputLabelProps={{ shrink: true }}
                        error={
                          errors.certificateOfIncorportation &&
                          touched.certificateOfIncorportation
                            ? true
                            : false
                        }
                        helperText={
                          touched.certificateOfIncorportation &&
                          errors.certificateOfIncorportation
                        }
                      />
                      {values.certificateOfIncorportation && (
                        <>
                          <Tooltip title="View">
                            <Visibility
                              className="file-action-icon"
                              onClick={() => {
                                setImageName(
                                  values.certificateOfIncorportation
                                );
                                setOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <GetApp
                              className="file-action-icon"
                              onClick={() => {
                                downloadReport(
                                  values.certificateOfIncorportation
                                );
                              }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={
                              "File Name : " +
                              values.certificateOfIncorportation
                            }
                          >
                            <Message className="file-action-icon" />
                          </Tooltip>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  {(isAdmin ||
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
                        <TextField
                          type="file"
                          style={{ width: "90%" }}
                          margin="dense"
                          size="small"
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
                        {values.tradelicensephoto && (
                          <>
                            <Tooltip title="View">
                              <Visibility
                                className="file-action-icon"
                                onClick={() => {
                                  setImageName(values.tradelicensephoto);
                                  setOpen(true);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Download">
                              <GetApp
                                className="file-action-icon"
                                onClick={() => {
                                  downloadReport(values.tradelicensephoto);
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              title={"File Name : " + values.tradelicensephoto}
                            >
                              <Message className="file-action-icon" />
                            </Tooltip>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  )}
                  {(isAdmin ||
                    (values.declarationOfAuthorisedSignatory &&
                      values.declarationOfAuthorisedSignatory !== "")) && (
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="file"
                          style={{ width: "90%" }}
                          margin="dense"
                          size="small"
                          fullWidth
                          id="declarationOfAuthorisedSignatory"
                          label="Declaration Of Authorised Signatory"
                          name="declarationOfAuthorisedSignatory"
                          autoComplete="declarationOfAuthorisedSignatory"
                          onChange={(file) =>
                            upload(
                              file,
                              setFieldValue,
                              "declarationOfAuthorisedSignatory"
                            )
                          }
                          // value={values.declarationOfAuthorisedSignatory}
                          InputLabelProps={{ shrink: true }}
                          error={
                            errors.declarationOfAuthorisedSignatory &&
                            touched.declarationOfAuthorisedSignatory
                              ? true
                              : false
                          }
                          helperText={
                            touched.declarationOfAuthorisedSignatory &&
                            errors.declarationOfAuthorisedSignatory
                          }
                        />
                        {values.declarationOfAuthorisedSignatory && (
                          <>
                            <Tooltip title="View">
                              <Visibility
                                className="file-action-icon"
                                onClick={() => {
                                  setImageName(
                                    values.declarationOfAuthorisedSignatory
                                  );
                                  setOpen(true);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Download">
                              <GetApp
                                className="file-action-icon"
                                onClick={() => {
                                  downloadReport(
                                    values.declarationOfAuthorisedSignatory
                                  );
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              title={
                                "File Name : " +
                                values.declarationOfAuthorisedSignatory
                              }
                            >
                              <Message className="file-action-icon" />
                            </Tooltip>
                          </>
                        )}
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
                          <Divider />
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
                              <TextField
                                margin="dense"
                                type="file"
                                style={{ width: "90%" }}
                                size="small"
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
                                <>
                                  <Tooltip title="View">
                                    <Visibility
                                      className="file-action-icon"
                                      onClick={() => {
                                        setImageName(
                                          values["gstAttachment" + index]
                                        );
                                        setOpen(true);
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Download">
                                    <GetApp
                                      className="file-action-icon"
                                      onClick={() => {
                                        downloadReport(
                                          values["gstAttachment" + index]
                                        );
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip
                                    title={
                                      "File Name : " +
                                      values["gstAttachment" + index]
                                    }
                                  >
                                    <Message className="file-action-icon" />
                                  </Tooltip>
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      );
                    }
                  )}
                  <Divider />
                  {(isAdmin || (values.remark && values.remark !== "")) && (
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
                  {(params.id === undefined ||
                    orderDetails?.status === "DRAFT") &&
                    sessionStorage.getItem("role") === "Customer" && (
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
                  {sessionStorage.getItem("role") !== "Customer" && (
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
                          {orderDetails?.status === "CREATED" && (
                            <>
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
                            </>
                          )}
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
