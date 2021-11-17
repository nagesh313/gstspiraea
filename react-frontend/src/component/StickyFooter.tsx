import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[200],
    opacity:1
  },
}));

export const StickyFooter = () => {
  const classes = useStyles();

  return (
    <div className={"footer"}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typography variant="body1">
              Copyright © 2021 Spiraea. All Rights Reserved (A){" "}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typography variant="body1">
              <img
                src="/NextSAA-Logo1.png"
                alt=""
                style={{ height: "70px" }}
              ></img>
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
};
