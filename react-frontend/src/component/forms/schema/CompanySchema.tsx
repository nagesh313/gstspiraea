import * as Yup from "yup";
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
function buildSchema() {
  const shape: any = {
    firmName: Yup.string().required("Required"),
    legalbusinessName: Yup.string().required("Required"),
    tradeName: Yup.string().required("Required"),
    mobile: Yup.string().required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
    panphoto: Yup.string().required("Required"),
    composition: Yup.string().required("Required"),
    commencementDate: Yup.string().required("Required"),
    // principleplace: Yup.string().required("Required"),
    // pricipleelectricityphoto: Yup.string().required("Required"),
    // priciplerentphoto: Yup.string().required("Required"),
    // priciplenocphoto: Yup.string().required("Required"),
    // additionalplace: Yup.string().required("Required"),
    // additionalelectricityphoto: Yup.string().required("Required"),
    // additionalrentphoto: Yup.string().required("Required"),
    // additionalnocphoto: Yup.string().required("Required"),
    branchname: Yup.string().required("Required"),
    cancelcheqphoto: Yup.string().required("Required"),
    tradelicensenumber: Yup.string().required("Required"),
    tradelicensephoto: Yup.string().required("Required"),
    certificateOfIncorportation: Yup.string().required("Required"),
    pannumber: Yup.string()
      .required("Please enter your Pan Number")
      .matches(panRegex, "Invalid Pan Number"),
    numberOfDirectors: Yup.number()
      .required("Please enter No Of Partners")
      .min(1, "Minimum 1 number of Partners")
      .max(15, "Maximum 15 number of Partners"),
  };
  [...Array(15)].forEach((value: any, index: any) => {
    shape["directorName" + index] = Yup.string().when("numberOfDirectors", {
      is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
      then: Yup.string().required("Required"),
    });
    shape["directorDin" + index] = Yup.string().when("numberOfDirectors", {
      is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
      then: Yup.string().required("Required"),
    });
    shape["directorFatherName" + index] = Yup.string().when(
      "numberOfDirectors",
      {
        is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
        then: Yup.string().required("Required"),
      }
    );
    shape["directorAadharNo" + index] = Yup.string().when("numberOfDirectors", {
      is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
      then: Yup.string()
        .required("Please enter Aadhar Number")
        .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
    });
    shape["directorAadharPhotoCopyFront" + index] = Yup.string().when(
      "numberOfDirectors",
      {
        is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
        then: Yup.string().required("Required"),
      }
    );
    shape["directorAadharPhotoCopyBack" + index] = Yup.string().when(
      "numberOfDirectors",
      {
        is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
        then: Yup.string().required("Required"),
      }
    );
    shape["pannumber" + index] = Yup.string().when("numberOfDirectors", {
      is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
      then: Yup.string()
        .required("Please enter your Pan Number")
        .matches(panRegex, "Invalid Pan Number"),
    });
    shape["pannumberCopy" + index] = Yup.string().when("numberOfDirectors", {
      is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
      then: Yup.string().required("Required"),
    });
    shape["directorResidentialAddress" + index] = Yup.string().when(
      "numberOfDirectors",
      {
        is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
        then: Yup.string().required("Required"),
      }
    );
    shape["directorPhoto" + index] = Yup.string().when("numberOfDirectors", {
      is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
      then: Yup.string().required("Required"),
    });

    // shape["partnerMobile" + index] = Yup.number().when("numberOfDirectors", {
    //   is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
    //   then: Yup.number().required("Required"),
    // });
    // shape["partnerEmail" + index] = Yup.string()
    //   .email("Invalid")
    //   .when("numberOfDirectors", {
    //     is: (numberOfDirectors: number) => numberOfDirectors >= index + 1,
    //     then: Yup.string().email("Invalid").required("Required"),
    //   });
  });
  return Yup.object().shape(shape);
}
export const schema = buildSchema();
