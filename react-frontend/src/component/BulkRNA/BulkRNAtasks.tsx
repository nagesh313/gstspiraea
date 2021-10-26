import { Button, Grid, IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { failureToast } from "../../util/util";
import Title from "../Title";
export function BulkRNATasksComponent(props: any) {
  const [userList, setUserList] = React.useState<any>([]);
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user") || "{roles:[]}");

  const fetchTaskList = () => {
    axios
      .get("/api/v1/bulkRNA/jobs/" + user.id)
      .then((response: any) => {
        setUserList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const deleteTask = (taskId: any) => {
    axios
      .delete("/api/v1/bulkRNA/delete-task/" + taskId)
      .then((response: any) => {
        fetchTaskList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const navigateToWorkflow = () => {
    history.push("/dashboard/BulkRNAWorkflow");
  };
  const navigateToResult = (id: any) => {
    history.push("/dashboard/BulkRNAWorkflowResult/" + id);
  };

  useEffect(() => {
    fetchTaskList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
          <Title>Bulk RNA workflow</Title>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => navigateToWorkflow()}
          >
            Create A Task +
          </Button>
        </Grid>
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">S.No</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Create Date</TableCell>
            <TableCell align="center">Results Ready ?</TableCell>
            <TableCell align="center">Link to Results</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.length > 0 ? (
            userList?.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  {row.createDate.substring(0, 10)}
                </TableCell>
                <TableCell align="center">
                  {row.processed ? "Yes" : "No"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    disabled={!row.processed}
                    onClick={() => navigateToResult(row.id)}
                  >
                    Results
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      deleteTask(row.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                {"No Jobs to display"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const BulkRNATasks = withSnackbar(BulkRNATasksComponent);
