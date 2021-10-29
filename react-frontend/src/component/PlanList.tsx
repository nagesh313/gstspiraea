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
import { CreateNewUserDialog } from "./CreateNewUser";
import Title from "./Title";
export function PlanListComponent(props: any) {
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
  // const sendmail = (plan: any) => {
  //   console.log(plan);
  //   axios
  //     .post("/api/generateLoginDetails", plan)
  //     .then((response: any) => {
  //       props.enqueueSnackbar("Plan Credentials Generated", successToast);
  //       fetchPlanList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
  // const handleModalOpen = () => {
  //   setOpen(true);
  // };
  // const handleModalClose = (refresh: any) => {
  //   if (refresh) {
  //     fetchPlanList();
  //   }
  //   setOpen(false);
  // };
  useEffect(() => {
    fetchPlanList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Title>List of registered Plans</Title>
      <CollapsibleTable list={planList}></CollapsibleTable>
    </React.Fragment>
  );
}
function Row(props: any) {
  const [open, setOpen] = React.useState(false);
  const row = props.row;
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
            <Delete
            // onClick={handleModalOpen}
            ></Delete>
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
                    <b>GST AMOUNT</b>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton>
                      <Add
                      // onClick={handleModalOpen}
                      ></Add>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.payplanLocation.map((historyRow: any) => (
                  <TableRow key={historyRow.id}>
                    <TableCell component="th" scope="row">
                      {historyRow.payplanLocation}
                    </TableCell>
                    <TableCell>{historyRow.payplanamount}</TableCell>
                    <TableCell align="left">{historyRow.gstamount}</TableCell>
                    <TableCell align="left">
                      <IconButton>
                        <Delete
                        // onClick={handleModalOpen}
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
export default function CollapsibleTable(props: any) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = (refresh: any) => {
    if (refresh) {
      // fetchUserList();
    }
    setOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      <CreateNewUserDialog
        open={open}
        handleClose={handleModalClose}
        // submitNewUser={submitNewUser}
      ></CreateNewUserDialog>

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
          {props.list.map((row: any) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export const PlanList = withSnackbar(PlanListComponent);
