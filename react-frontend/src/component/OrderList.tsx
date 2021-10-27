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
  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(row: any) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const result = await axios.post("http://localhost:5000/payment/orders");

    // if (!result) {
    //   alert("Server error. Are you online?");
    //   return;
    // }
    const razor = JSON.parse(row.razorpayOrder);
    const options = {
      key: "rzp_test_4zyGtu09Yf3TwL", // Enter the Key ID generated from the Dashboard
      amount: razor.amount,
      currency: razor.currency,
      name: "spiraea",
      description: "Test Transaction",
      image: "/spiraea-logo-bw-web-1.png",
      order_id: razor.id,
      handler: async function (response: any) {
        // const data = {
        //   orderCreationId: "123",
        //   razorpayPaymentId: response.razorpay_payment_id,
        //   razorpayOrderId: response.razorpay_order_id,
        //   razorpaySignature: response.razorpay_signature,
        // };

        // const result = await axios.post(
        //   "http://localhost:5000/payment/success",
        //   data
        // );
        console.log(response);
        // alert(result.data.msg);
      },
      // prefill: {
      //   name: "Soumya Dey",
      //   email: "SoumyaDey@example.com",
      //   contact: "9999999999",
      // },
      // notes: {
      //   address: "Soumya Dey Corporate Office",
      // },
      theme: {
        color: "#61dafb",
      },
    };
    const w: any = window;
    const paymentObject = new w.Razorpay(options);
    paymentObject.open();
  }
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
                  {sessionStorage.getItem("role") === "Customer" && (
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
                      <Button
                        style={{ marginLeft: "10px" }}
                        variant="outlined"
                        size="small"
                        onClick={() => displayRazorpay(row)}
                      >
                        Pay
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
                  {sessionStorage.getItem("role") === "Customer" && (
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
                      <Button
                        style={{ marginLeft: "10px" }}
                        variant="outlined"
                        size="small"
                        onClick={() => displayRazorpay(row)}
                      >
                        Pay
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {orderType === "LLP" && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>LLP ID</TableCell>
              <TableCell>Firm Name</TableCell>
              <TableCell>Partner Name</TableCell>
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.llpid}>
                <TableCell>{row.llpid}</TableCell>
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
                  {sessionStorage.getItem("role") === "Customer" && (
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
                      <Button
                        style={{ marginLeft: "10px" }}
                        variant="outlined"
                        size="small"
                        onClick={() => displayRazorpay(row)}
                      >
                        Pay
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
