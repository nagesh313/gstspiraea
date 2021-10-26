import { CardMedia } from "@material-ui/core";
import { withSnackbar } from "notistack";
import React from "react";
const ImgUpload = (props: any) => {
  console.log(props);
  return (
    <label className="image-upload" htmlFor="file-input">
      <div
        style={{
          maxWidth: "300px",
          maxHeight: "300px",
          cursor: "pointer",
          height: "200px",
          border: "1px solid black",
        }}
      >
        {props.src != null && (
          <CardMedia
            component={"img"}
            src={props.src}
            style={{ maxWidth: "300px", maxHeight: "300px" }}
            title="Live from space album cover"
          />
        )}
        <input
          id="file-input"
          accept="image/*"
          style={{ cursor: "pointer", visibility: "hidden" }}
          type="file"
          onChange={props.onChange}
        />{" "}
      </div>
    </label>
  );
};

function ProfilePicComponent(props: any) {
  const [pic, setPic] = React.useState<any>(null);
  const [active, setActive] = React.useState<string>("profile");
  const [file, setFile] = React.useState<any>();

  // const fetchUser = () => {
  //   const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  //   axios
  //     .get("/api/v1/admin/" + user.id)
  //     .then((response: any) => {
  //       setUser(response.data);
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    setFile(file);
    reader.onloadend = () => {
      setPic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let activeP = active === "edit" ? "profile" : "edit";
    setActive(active);
  };

  return (
    <React.Fragment>
      <ImgUpload onChange={photoUpload} src={pic}></ImgUpload>
    </React.Fragment>
  );
}
export const ProfilePic = withSnackbar(ProfilePicComponent);
