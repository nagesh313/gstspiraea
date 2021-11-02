import * as Yup from "yup";
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

export const schema = Yup.object().shape({
  pannumber: Yup.string()
    .required("Please enter your Pan Number")
    .matches(panRegex, "Invalid Pan Number"),
  numberOfDirectors: Yup.number()
    .required("Please enter No Of Directors")
    .min(1, "Minimum 1 number of Directors")
    .max(15, "Maximum 15 number of Directors"),
  directorAadharNo0: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 1,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo1: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 2,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo2: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 3,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo3: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 4,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo4: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 5,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo5: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 6,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo6: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 7,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo7: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 8,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo8: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 9,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo9: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 10,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo10: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 11,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo11: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 12,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo12: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 13,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo13: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 14,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
  directorAadharNo14: Yup.string().when("numberOfDirectors", {
    is: (numberOfDirectors: number) => numberOfDirectors >= 15,
    then: Yup.string()
      .required("Please enter Aadhar Number")
      .matches(aadharRegex, "Invalid Aadhar Number (XXXX XXXX XXXX)"),
  }),
});
