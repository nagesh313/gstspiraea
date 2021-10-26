import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
export const LoaderComponent = () => {
  const classes = useStyles();
  const [loadingCount, setLoadingCount] = React.useState(0);
  useEffect(() => {
    axios.interceptors.request.use(
      function (config: any) {
        setLoadingCount(loadingCount + 1);
        return config;
      },
      function (error: any) {
        return Promise.reject({ ...error.response?.data });
      }
    );

    axios.interceptors.response.use(
      function (response: any) {
        // spinning hide
        setLoadingCount(loadingCount - 1);
        return response;
      },
      function (error: any) {
        setLoadingCount(loadingCount - 1);
        return Promise.reject({ ...error.response?.data });
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {loadingCount > 0 ? (
        <Backdrop
          className={classes.backdrop}
          open={true}
          style={{ zIndex: 10000 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
    </div>
  );
};
