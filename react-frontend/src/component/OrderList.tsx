import { Button, MenuItem, Select } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { failureToast } from "../util/util";
import Title from "./Title";

function OrderListComponent(props: any) {
  const [orderList, setOrderList] = React.useState<any>([]);
  const [orderType, setOrderType] = React.useState("Proprietorship");
  const history = useHistory();
  const fetchOrderList = () => {
    let url = "";
    if (sessionStorage.getItem("role") === "Customer") {
      url =
        "/api/get-order/" + orderType + "/" + sessionStorage.getItem("user");
    } else {
      url = "/api/get-all-order/" + orderType;
    }
    axios
      .get(url)
      .then((response: any) => {
        setOrderList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const view = (row: any) => {
    if (orderType === "Proprietorship") {
      history.push("/dashboard/sole-proprietor/" + row.proprietorshipid);
    } else if (orderType === "Partnership") {
      history.push("/dashboard/partnership/" + row.partnershipid);
    } else if (orderType === "LLP") {
      history.push("/dashboard/llp/" + row.llpid);
    } else if (orderType === "Company") {
      history.push("/dashboard/company/" + row.companydetailsid);
    }
  };
  // const approve = (row: any) => {
  //   axios
  //     .post("/api/approve")
  //     .then((response: any) => {
  //       props.enqueueSnackbar("Order Approved Successfull", successToast);
  //       fetchOrderList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
  // const reject = (row: any) => {
  //   axios
  //     .post("/api/reject", row)
  //     .then((response: any) => {
  //       props.enqueueSnackbar("Order Rejected Successfull", successToast);
  //       fetchOrderList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
  useEffect(() => {
    fetchOrderList();
  }, [orderType]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Title>Application List</Title>
      <Select
        style={{ marginLeft: "30px", marginBottom: "9px" }}
        defaultValue="Proprietorship"
        onChange={(event: any, data: any) => {
          // setSelectedSample(data.props.children);
          setOrderType(data?.props?.value);
        }}
      >
        <MenuItem value={"Proprietorship"}>Proprietorship</MenuItem>
        <MenuItem value={"Partnership"}>Partnership</MenuItem>
        <MenuItem value={"LLP"}>LLP</MenuItem>
        <MenuItem value={"Company"}>Company</MenuItem>
      </Select>
      {orderType === "Proprietorship" && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ProprietorShip ID</TableCell>
              <TableCell>Trade Name</TableCell>
              <TableCell>Person Name</TableCell>
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.proprietorshipid}>
                <TableCell>{row.proprietorshipid}</TableCell>
                <TableCell>{row.tradeName}</TableCell>
                <TableCell>{row.personName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="center">
                  {sessionStorage.getItem("role") !== "Customer" && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          view(row);
                        }}
                      >
                        View
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {orderType === "Partnership" && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Partnership ID</TableCell>
              <TableCell>Firm Name</TableCell>
              <TableCell>Partner Name</TableCell>
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.partnershipid}>
                <TableCell>{row.partnershipid}</TableCell>
                <TableCell>{row.firmName}</TableCell>
                <TableCell>{row.partnerName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="center">
                  {sessionStorage.getItem("role") !== "Customer" && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          view(row);
                        }}
                      >
                        View
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
export const OrderList = withSnackbar(OrderListComponent);
