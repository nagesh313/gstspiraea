import { Collapse, IconButton, Paper, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Add,
  Delete,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast } from "../util/util";
import { CreateNewPlan } from "./CreateNewPlan";
import { CreateNewPlanLocationDialog } from "./CreateNewPlanLocation";
import Title from "./Title";

function Row(props: any) {
  const [open, setOpen] = React.useState<boolean>(false);

  const row = props.row;
  const handleDeletePlan = (row: any) => {
    axios
      .delete("/api/plan/" + row.id)
      .then((response: any) => {
        props.fetchPlanList();
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const handleDeletePlanLocation = (plan: any, planLocation: any) => {
    axios
      .delete("/api/plan-location/" + plan.id + "/" + planLocation.id)
      .then((response: any) => {
        props.fetchPlanList();
      })
      .catch((reponse: any) => {
        // props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  return (
    <React.Fragment>
      <TableRow key={row.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.payplanname}</TableCell>
        <TableCell align="left">{row.remarks}</TableCell>
        <TableCell align="left">
          <IconButton>
            <Delete onClick={() => handleDeletePlan(row)}></Delete>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases" padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Location</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>AMOUNT</b>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton>
                      <Add onClick={() => props.openLocationModal(row)}></Add>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.payplanLocation.map((historyRow: any) => (
                  <TableRow key={historyRow.id}>
                    <TableCell component="th" scope="row">
                      {historyRow.id + "     - "}
                      {historyRow.payplanLocation}
                    </TableCell>
                    <TableCell>{historyRow.payplanamount}</TableCell>
                    <TableCell align="left">
                      <IconButton>
                        <Delete
                          onClick={() =>
                            handleDeletePlanLocation(row, historyRow)
                          }
                        ></Delete>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export const PlanListComponent = (props: any) => {
  const [planList, setPlanList] = React.useState<any>([]);
  // const [open, setOpen] = React.useState<boolean>(false);
  const fetchPlanList = () => {
    axios
      .get("/api/plan-list")
      .then((response: any) => {
        setPlanList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  useEffect(() => {
    fetchPlanList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [open, setOpen] = React.useState<boolean>(false);
  const [openLocation, setOpenLocation] = React.useState<boolean>(false);
  const [plan, setPlan] = React.useState<any>();

  const openLocationModal = (row: any) => {
    setOpenLocation(true);
    setPlan(row);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = (refresh: any) => {
    if (refresh) {
      // fetchUserList();
    }
    setOpen(false);
  };
  const handleModalLocationClose = (refresh: any) => {
    if (refresh) {
      // fetchUserList();
    }
    setOpenLocation(false);
  };
  return (
    <>
      <Title>List of registered Plans</Title>
      <TableContainer component={Paper}>
        <CreateNewPlan
          open={open}
          handleClose={handleModalClose}
          fetchPlanList={fetchPlanList}
        ></CreateNewPlan>
        <CreateNewPlanLocationDialog
          fetchPlanList={fetchPlanList}
          open={openLocation}
          plan={plan}
          handleClose={handleModalLocationClose}
        ></CreateNewPlanLocationDialog>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">
                <b>Particulars</b>
              </TableCell>
              <TableCell align="left">
                <b>Remarks</b>
              </TableCell>
              <TableCell align="left">
                <IconButton>
                  <Add onClick={handleModalOpen}></Add>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planList.map((row: any) => (
              <Row
                key={row.id}
                row={row}
                fetchPlanList={fetchPlanList}
                openLocation={openLocation}
                openLocationModal={openLocationModal}
                handleModalLocationClose={handleModalLocationClose}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export const PlanList = withSnackbar(PlanListComponent);
