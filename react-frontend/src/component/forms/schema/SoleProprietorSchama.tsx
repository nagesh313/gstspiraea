import * as Yup from "yup";
const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
const aadharRegex = /^[0-9]{4}[0-9]{4}[0-9]{4}$/;

function buildSchema() {
  const shape: any = {
    personName: Yup.string().required("Required"),
    legalbusinessName: Yup.string().required("Required"),
    tradeName: Yup.string().required("Required"),
    mobile: Yup.string().required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
    panphoto: Yup.string().required("Required"),
    soleProprietorPhoto: Yup.string().required("Required"),
    composition: Yup.string().required("Required"),
    commencementDate: Yup.date().required("Required"),
    hsn1: Yup.number().required("Required").min(1000, "Minimum 4 characters"),
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
    // branchname: Yup.string().required("Required"),
    accountnumber: Yup.string().required("Required"),
    ifsccode: Yup.string().required("Required"),
    cancelcheqphoto: Yup.string().required("Required"),
    // tradelicensenumber: Yup.string().required("Required"),
    // tradelicensephoto: Yup.string().required("Required"),

    propadharnumber: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (78XX 45XX 97XX)"),

    pannumber: Yup.string()
      .required("Please enter your Pan Number")
      .matches(panRegex, "Invalid Pan Number"),
  };
  [...Array(15)].forEach((value: any, index: any) => {
    shape["gstNumber" + index] = Yup.string().when("numberOfOtherGST", {
      is: (numberOfOtherGST: number) => numberOfOtherGST >= index + 1,
      then: Yup.string().required("Required"),
    });
    shape["gstAttachment" + index] = Yup.string().when("numberOfOtherGST", {
      is: (numberOfOtherGST: number) => numberOfOtherGST >= index + 1,
      then: Yup.string().required("Required"),
    });
  });
  return Yup.object().shape(shape);
}
export const schema = buildSchema();
