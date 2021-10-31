import * as Yup from "yup";
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

export const schema = Yup.object().shape({
  pannumber: Yup.string()
    .required("Please enter your Pan Number")
    .matches(panRegex, "Invalid Pan Number"),
  numberOfPartners: Yup.number()
    .required("Please enter No Of Partners")
    .min(1, "Minimum 1 number of Partners")
    .max(15, "Maximum 15 number of Partners"),
  partnerAadharNo0: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 1,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo1: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 2,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo2: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 3,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo3: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 4,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo4: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 5,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo5: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 6,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo6: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 7,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo7: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 8,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo8: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 9,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo9: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 10,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo10: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 11,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo11: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 12,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo12: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 13,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo13: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 14,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  partnerAadharNo14: Yup.string().when("numberOfPartners", {
    is: (numberOfPartners: number) => numberOfPartners >= 15,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
});
