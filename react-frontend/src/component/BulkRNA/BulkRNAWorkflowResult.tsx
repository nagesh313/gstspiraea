import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { failureToast } from "../../util/util";
import { PCAPlotComponent, TopPredictedDrugsBarPlotComponent } from "../charts";
import { CellLineageAndPathEnrichment } from "./LineageAndPathwayChart";
// import { chartData } from "./testdata";

export function BulkRNAWorkflowResult(props: any) {
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<any>("");
  const [pca, setPCA] = React.useState<any>("");
  const [cellLineage, setCellLineage] = React.useState<any>("");
  const [pathEnrichment, setPathEnrichment] = React.useState<any>("");
  let { id } = useParams<any>();

  // const [parsedJson, setParsedJson] = React.useState<any>([]);
  // const [columns, setColumns] = React.useState<any>([]);
  const fetchTaskResult = (taskId: any) => {
    axios
      .get("/api/v1/bulkRNA/jobs/results/" + taskId)
      .then((response: any) => {
        try {
          setResult(JSON.parse(response.data.result));
          setPCA(JSON.parse(response.data.pca));
          setPathEnrichment(response.data.pathEnrichment);
          setCellLineage(response.data.cellLineage);
        } catch (e: any) {}
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  useEffect(() => {
    fetchTaskResult(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <PCAPlotComponent chartData={pca}></PCAPlotComponent>
        </Grid>
        <Grid item xs={12}>
          <CellLineageAndPathEnrichment
            taskId={id}
            cellLineage={cellLineage}
            pathEnrichment={pathEnrichment}
          ></CellLineageAndPathEnrichment>
        </Grid>
        <Grid item xs={12}>
          <TopPredictedDrugsBarPlotComponent
            chartData={result}
          ></TopPredictedDrugsBarPlotComponent>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
