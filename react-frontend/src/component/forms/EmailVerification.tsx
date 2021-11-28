import { Send, VerifiedUser } from "@material-ui/icons";
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
  // props.subType
  // props.type
  // props.value
  return (
    <>
      <span style={{ float: "right", marginTop: "25px" }}>
        {props.id && !props?.verificationObject?.verified && (
          <>
            <Send
              titleAccess="Send Verification Mail"
              style={{ cursor: "pointer" }}
              onClick={() => {
                sendVerificationMail();
              }}
            ></Send>
          </>
        )}

        {props?.verificationObject?.verified && (
          <VerifiedUser
            titleAccess="User Verified"
            style={{ color: "green", cursor: "pointer" }}
          ></VerifiedUser>
        )}
      </span>
    </>
  );
}
export const EmailVerification = withSnackbar(EmailVerificationComponent);
