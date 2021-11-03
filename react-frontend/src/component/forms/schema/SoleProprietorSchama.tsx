import * as Yup from "yup";
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

export const schema = Yup.object().shape({
  propadharnumber: Yup.string()
    .required("Please enter Aadhar Number")
    .matches(aadharRegex, "Invalid Aadhar Number (78XX 45XX 97XX)"),
  // signadharnumber: Yup.string()
  //   .required("Please enter Aadhar Number")
  //   .matches(aadharRegex, "Invalid Aadhar Number (78XX 45XX 97XX)"),
  pannumber: Yup.string()
    .required("Please enter your Pan Number")
    .matches(panRegex, "Invalid Pan Number"),
});
