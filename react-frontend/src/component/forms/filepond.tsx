import { Grid, Tooltip } from "@material-ui/core";
import { GetApp, Visibility } from "@material-ui/icons";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import React FilePond
import { FilePond } from "react-filepond";
import React from "react";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`

// Register the plugins
// Our app
export function FileUpload(props: any) {
  const stripAndShowFileName = (fileName: any) => {
    if (fileName) {
      return (
        fileName.substring(0, fileName.lastIndexOf("--==")) +
        fileName.substring(fileName.lastIndexOf("."), fileName.length)
      );
    }
  };
  // const title = props.fieldName;

  const files: any = [
    {
      source: stripAndShowFileName(props.field),
      options: {
        type: "local",
      },
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        {props.title}
        <FilePond
          labelFileSizeNotAvailable=""
          files={props.field ? files : null}
          allowReorder={false}
          allowMultiple={false}
          maxFiles={1}
          onupdatefiles={(filea: any) => {
            if (filea.length === 0) {
              props.setFieldValue(props.fieldName, null);
            }
            // else if (
            //   filea.length > 0 &&
            //   filea[0]?.file?.size > 100000 &&
            //   props?.fieldName?.includes("partnerPhoto")
            // ) {
            //   alert("Partner photo is too big");
            //   props.setFieldValue(props.fieldName, null);
            // }
          }}
          server={{
            process: {
              url: "/api/document/uploadFile",
              onload: (response: any) => {
                // props.upload(props.field, response.key);
                // return response.key;
                console.log(response);
                props.setFieldValue(props.fieldName, response);
                return stripAndShowFileName(response);
              },
            },
          }}
          name="file"
          labelIdle={'<span class="filepond--label-action">Browse</span>'}
        />
        {props.error ? (
          <span
            className="MuiFormHelperText-root Mui-error Mui-required MuiFormHelperText-marginDense"
            style={{ color: "red" }}
          >
            Required
          </span>
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={2} style={{ padding: "0px" }}>
        {props.field && (
          <div>
            <Tooltip title="View">
              <Visibility
                className="file-action-icon"
                onClick={() => {
                  props.setImageName(props.field);
                  props.setOpen(true);
                }}
              />
            </Tooltip>
            <Tooltip title="Download">
              <GetApp
                className="file-action-icon"
                onClick={() => {
                  props.downloadReport(props.field);
                }}
              />
            </Tooltip>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
