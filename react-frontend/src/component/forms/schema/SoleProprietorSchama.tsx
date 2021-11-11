import * as Yup from "yup";
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^[0-9]{4}[0-9]{4}[0-9]{4}$/;

export const schema = Yup.object().shape({
  personName: Yup.string().required("Required"),
  legalbusinessName: Yup.string().required("Required"),
  tradeName: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  panphoto: Yup.string().required("Required"),
  composition: Yup.string().required("Required"),
  commencementDate: Yup.string().required("Required"),
  // for Admin
  // principleplace: Yup.string().required("Required"),
  // pricipleelectricityphoto: Yup.string().required("Required"),
  // priciplerentphoto: Yup.string().required("Required"),
  // priciplenocphoto: Yup.string().required("Required"),
  // additionalplace: Yup.string().required("Required"),
  // additionalelectricityphoto: Yup.string().required("Required"),
  // additionalrentphoto: Yup.string().required("Required"),
  // additionalnocphoto: Yup.string().required("Required"),
  propfatherName: Yup.string().required("Required"),
  propadharphotoFront: Yup.string().required("Required"),
  propadharphotoBack: Yup.string().required("Required"),
  resident_address: Yup.string().required("Required"),
  photo: Yup.string().required("Required"),
  branchname: Yup.string().required("Required"),
  cancelcheqphoto: Yup.string().required("Required"),
  // tradelicensenumber: Yup.string().required("Required"),
  // tradelicensephoto: Yup.string().required("Required"),
  
  propadharnumber: Yup.string()
    .required("Please enter Aadhar Number")
    .matches(aadharRegex, "Invalid Aadhar Number (78XX 45XX 97XX)"),

  pannumber: Yup.string()
    .required("Please enter your Pan Number")
    .matches(panRegex, "Invalid Pan Number"),
});
