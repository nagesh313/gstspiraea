import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";

const HomeComponent = (props: any) => {
  const history = useHistory();
  const navigate = (url: string) => {
    history.push(url);
  };
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
      style={{ height: "60vh", textAlign: "center" }}
    >
      <Grid item xs={4}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          onClick={() => navigate("/dashboard/SingleCellRNA")}
        >
          Single Cell RNASeq
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          onClick={() => navigate("/dashboard/BulkRNATasks")}
        >
          Bulk RNASeq
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          onClick={() => navigate("/dashboard/HitLIkeMolecules")}
        >
          Hit LIke Molecules
        </Button>
      </Grid>
    </Grid>
  );
};
export const Home = withSnackbar(HomeComponent);
