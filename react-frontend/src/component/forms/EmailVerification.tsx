import { Grid, Tooltip } from "@material-ui/core";
import {
  GetApp,
  Visibility,
  Send,
  VerifiedUser,
  Cancel,
} from "@material-ui/icons";
import axios from "axios";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { withSnackbar } from "notistack";
// Import React FilePond
import React from "react";
import { failureToast, successToast } from "../../util/util";
function validateEmail(email: any) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function EmailVerificationComponent(props: any) {
  const sendVerificationMail = () => {
    const emailValid = validateEmail(props.value);
    if (!emailValid) {
      props.enqueueSnackbar("Invalid Email : " + props.value, failureToast);
    } else {
      let url =
        "/api/send-validation-mail/" +
        props.type +
        "/" +
        props.subType +
        "/" +
        props.id;
      axios
        .get(url)
        .then((response: any) => {
          props.enqueueSnackbar(
            "Verification Mail Sent Successfully",
            successToast
          );
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(reponse.error, failureToast);
        });
    }
  };
  // console.log(props.id);
  return (
    <>
      {props.id && (
        <span style={{ float: "right", marginTop: "25px" }}>
          <Cancel titleAccess="User Not Verified"></Cancel>
          <Send
            titleAccess="Send Verification Mail"
            onClick={() => {
              sendVerificationMail();
            }}
          ></Send>
          <VerifiedUser titleAccess="User Verified"></VerifiedUser>
        </span>
      )}
    </>
  );
}
export const EmailVerification = withSnackbar(EmailVerificationComponent);
