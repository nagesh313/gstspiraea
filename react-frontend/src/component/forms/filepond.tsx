import { Grid, Tooltip } from "@material-ui/core";
import { GetApp, Visibility } from "@material-ui/icons";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import React from "react";
// Import React FilePond
import { FilePond } from "react-filepond";

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
  const title = props.fieldName;
  console.log(props.field);
  const files: any = [
    {
      source: props.field,
      options: {
        type: "local",
      },
    },
  ];
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          {/* {props.field}
          {props.error ? "Error" : ""} */}
          <FilePond
            labelFileSizeNotAvailable=""
            files={props.field ? files : null}
            allowReorder={false}
            allowMultiple={false}
            maxFiles={1}
            onremovefile={(fileName: any, filea: any) => {
              if(fileName?.length===0){
                debugger;
              }
              console.log(fileName);
              console.log(filea);
              
              // props.setFieldValue(props.fieldName, null);
            }}
            server={{
              process: {
                url: "/api/document/uploadFile",
                onload: (response: any) => {
                  props.setFieldValue(
                    props.fieldName,
                    stripAndShowFileName(response)
                  );
                  console.log(response);
                  return response.key;
                },
              },
            }}
            name="file"
            labelIdle={
              title + ' or <span class="filepond--label-action">Browse</span>'
            }
          />
        </Grid>
        <Grid item xs={2}>
          {!isNaN(props.field) && props.field && (
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
    </>
  );
}
