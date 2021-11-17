import {
  Button,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { failureToast, successToast } from "../util/util";
import Title from "./Title";
import { ViewDocumentDialogComponent } from "./ViewDocumentDialog";

function OrderListComponent(props: any) {
  const [orderList, setOrderList] = React.useState<any>([]);
  const [orderType, setOrderType] = React.useState("All");
  const history = useHistory();
  const fetchOrderList = () => {
    let url = "";
    if (sessionStorage.getItem("role") === "Customer") {
      url =
        "/api/get-order/" + orderType + "/" + sessionStorage.getItem("user");
    } else if (sessionStorage.getItem("role") === "Agent") {
      url =
        "/api/get-all-order/" +
        orderType +
        "/" +
        sessionStorage.getItem("user");
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
    if (row.proprietorshipid) {
      history.push("/dashboard/sole-proprietor/" + row.proprietorshipid);
    } else if (row.partnershipid) {
      history.push("/dashboard/partnership/" + row.partnershipid);
    } else if (row.llpid) {
      history.push("/dashboard/llp/" + row.llpid);
    } else if (row.companydetailsid) {
      history.push("/dashboard/company/" + row.companydetailsid);
    }
  };
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
        axios
          .get(
            "/api/get-order/" +
              orderTypeText(row) +
              "/" +
              orderTypeId(row) +
              "/PAID/"
          )
          .then((response: any) => {
            props.enqueueSnackbar("Order Successfully", successToast);
            fetchOrderList();
          })
          .catch((reponse: any) => {
            props.enqueueSnackbar("Order Was not paid", failureToast);
          });
        console.log(response);
      },
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
  const upload = (event: any, row: any) => {
    let formData = new FormData();

    formData.append("file", event.currentTarget.files[0]);
    axios
      .post("/api/document/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: any) => {
        const documentUrl = response.data;
        axios
          .get(
            "/api/get-order/gst/" +
              orderTypeText(row) +
              "/" +
              orderTypeId(row) +
              "/" +
              documentUrl
          )
          .then((response: any) => {
            props.enqueueSnackbar(
              "Document Uploaded Successfully",
              successToast
            );
          })
          .catch((reponse: any) => {
            props.enqueueSnackbar(reponse.message, failureToast);
            event.target.value = "";
          });
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Failed to upload the Document", failureToast);
      });
  };
  const role = sessionStorage.getItem("role");
  const [imageName, setImageName] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (imageName: any) => {
    setOpen(true);
    setImageName(imageName);
  };

  const handleClose = () => {
    setOpen(false);
    setImageName("");
  };
  const orderTypeText = (row: any) => {
    if (row.proprietorshipid) {
      return "Proprietorship";
    } else if (row.partnershipid) {
      return "Partnership";
    } else if (row.llpid) {
      return "LLP";
    } else if (row.companydetailsid) {
      return "Company";
    }
  };
  const orderTypeId = (row: any) => {
    if (row.proprietorshipid) {
      return row.proprietorshipid;
    } else if (row.partnershipid) {
      return row.partnershipid;
    } else if (row.llpid) {
      return row.llpid;
    } else if (row.companydetailsid) {
      return row.companydetailsid;
    }
  };
  // let isP0: any = sessionStorage.getItem("type");
  // isP0 = isP0 === "P0";
  // const getOrderAmount = (row: any) => {
  //   try {
  //     if (row.razorpayOrder) {
  //       const json: any = JSON.parse(row.razorpayOrder);
  //       row.amount = json?.amount;
  //       return json?.amount / 100;
  //     }
  //   } catch (e: any) {}
  // };
  // const saveAmount = (row: any) => {
  //   let url = "";
  //   url =
  //     "/api/get-order/update-order-amount/" +
  //     orderTypeText(row) +
  //     "/" +
  //     orderTypeId(row) +
  //     "/" +
  //     row.amount;
  //   axios
  //     .get(url)
  //     .then((response: any) => {
  //       fetchOrderList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar("Failed to Update the order", failureToast);
  //     });
  // };

  return (
    <React.Fragment>
      <ViewDocumentDialogComponent
        name={imageName}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <Title>Application List</Title>
      <Select
        style={{ marginLeft: "30px", marginBottom: "9px" }}
        defaultValue="All"
        onChange={(event: any, data: any) => {
          // setSelectedSample(data.props.children);
          setOrderType(data?.props?.value);
        }}
      >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Proprietorship"}>Proprietorship</MenuItem>
        <MenuItem value={"Partnership"}>Partnership</MenuItem>
        <MenuItem value={"LLP"}>LLP</MenuItem>
        <MenuItem value={"Company"}>Company</MenuItem>
      </Select>
      {orderType === "All" && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order Type</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Trade Name</TableCell>
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              {/* {role === "Admin" && <TableCell>Amount</TableCell>} */}
              <TableCell>GST Doc</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={orderTypeId(row)}>
                <TableCell>{orderTypeText(row)}</TableCell>
                <TableCell>{orderTypeId(row)}</TableCell>
                <TableCell>{row.tradeName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                {/* {role === "Admin" && (
                  <TableCell>
                    <TextField
                      margin="dense"
                      style={{ width: "70%" }}
                      size="small"
                      defaultValue={getOrderAmount(row)}
                      fullWidth
                      label="Amount"
                      onChange={(event: any) =>
                        (row.amount = event.currentTarget.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                    <Tooltip title="Update Amount">
                      <Publish
                        onClick={(event: any) => {
                          saveAmount(row);
                        }}
                        style={{ float: "right" }}
                      />
                    </Tooltip>
                  </TableCell>
                )} */}
                <TableCell>
                  {(role === "Admin" || role === "Agent") && (
                    <TextField
                      margin="dense"
                      type="file"
                      style={{ width: "70%" }}
                      size="small"
                      required
                      fullWidth
                      label="Attach GST Doc"
                      onChange={(file: any) => upload(file, row)}
                      // value={values.pricipleelectricityphoto}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  {row.gstDocument && row.gstDocument !== "" && (
                    <Visibility
                      onClick={() => {
                        setImageName(row.gstDocument);
                        setOpen(true);
                      }}
                      style={{ float: "right" }}
                    />
                  )}
                </TableCell>
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
                      {row.status === "CREATED" && (
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="outlined"
                          size="small"
                          onClick={() => displayRazorpay(row)}
                        >
                          Pay
                        </Button>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {orderType === "Proprietorship" && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ProprietorShip ID</TableCell>
              <TableCell>Trade Name</TableCell>
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              {/* {role === "Admin" && <TableCell>Amount</TableCell>} */}
              <TableCell>GST Doc</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.proprietorshipid}>
                <TableCell>{row.proprietorshipid}</TableCell>
                <TableCell>{row.tradeName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                {/* {role === "Admin" && (
                  <TableCell>
                    <TextField
                      margin="dense"
                      style={{ width: "70%" }}
                      size="small"
                      defaultValue={getOrderAmount(row)}
                      fullWidth
                      label="Amount"
                      onChange={(event: any) =>
                        (row.amount = event.currentTarget.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />

                    <Tooltip title="Update Amount">
                      <Publish
                        onClick={(event: any) => {
                          saveAmount(row);
                        }}
                        style={{ float: "right" }}
                      />
                    </Tooltip>
                  </TableCell>
                )} */}
                <TableCell>
                  {(role === "Admin" || role === "Agent") && (
                    <TextField
                      margin="dense"
                      type="file"
                      style={{ width: "70%" }}
                      size="small"
                      required
                      fullWidth
                      label="Attach GST Doc"
                      onChange={(file: any) => upload(file, row)}
                      // value={values.pricipleelectricityphoto}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  {row.gstDocument && row.gstDocument !== "" && (
                    <Visibility
                      onClick={() => {
                        setImageName(row.gstDocument);
                        setOpen(true);
                      }}
                      style={{ float: "right" }}
                    />
                  )}
                </TableCell>
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
                      {row.status === "CREATED" && (
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="outlined"
                          size="small"
                          onClick={() => displayRazorpay(row)}
                        >
                          Pay
                        </Button>
                      )}
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
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              {/* {role === "Admin" && <TableCell>Amount</TableCell>} */}
              <TableCell>GST Doc</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.partnershipid}>
                <TableCell>{row.partnershipid}</TableCell>
                <TableCell>{row.firmName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                {/* {role === "Admin" && (
                  <TableCell>
                    <TextField
                      margin="dense"
                      style={{ width: "70%" }}
                      size="small"
                      defaultValue={getOrderAmount(row)}
                      fullWidth
                      label="Amount"
                      onChange={(event: any) =>
                        (row.amount = event.currentTarget.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                    <Tooltip title="Update Amount">
                      <Publish
                        onClick={(event: any) => {
                          saveAmount(row);
                        }}
                        style={{ float: "right" }}
                      />
                    </Tooltip>
                  </TableCell>
                )} */}
                <TableCell>
                  {(role === "Admin" || role === "Agent") && (
                    <TextField
                      margin="dense"
                      type="file"
                      style={{ width: "70%" }}
                      size="small"
                      required
                      fullWidth
                      label="Attach GST Doc"
                      onChange={(file: any) => upload(file, row)}
                      // value={values.pricipleelectricityphoto}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  {row.gstDocument && row.gstDocument !== "" && (
                    <Visibility
                      onClick={() => {
                        setImageName(row.gstDocument);
                        setOpen(true);
                      }}
                      style={{ float: "right" }}
                    />
                  )}
                </TableCell>
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
                      {row.status === "CREATED" && (
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="outlined"
                          size="small"
                          onClick={() => displayRazorpay(row)}
                        >
                          Pay
                        </Button>
                      )}
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
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              {/* {role === "Admin" && <TableCell>Amount</TableCell>} */}
              <TableCell>GST Doc</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.llpid}>
                <TableCell>{row.llpid}</TableCell>
                <TableCell>{row.firmName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                {/* {role === "Admin" && (
                  <TableCell>
                    <TextField
                      margin="dense"
                      style={{ width: "70%" }}
                      size="small"
                      defaultValue={getOrderAmount(row)}
                      fullWidth
                      label="Amount"
                      onChange={(event: any) =>
                        (row.amount = event.currentTarget.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />

                    <Tooltip title="Update Amount">
                      <Publish
                        onClick={(event: any) => {
                          saveAmount(row);
                        }}
                        style={{ float: "right" }}
                      />
                    </Tooltip>
                  </TableCell>
                )} */}
                <TableCell>
                  {(role === "Admin" || role === "Agent") && (
                    <TextField
                      margin="dense"
                      type="file"
                      style={{ width: "70%" }}
                      size="small"
                      required
                      fullWidth
                      label="Attach GST Doc"
                      onChange={(file: any) => upload(file, row)}
                      // value={values.pricipleelectricityphoto}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  {row.gstDocument && row.gstDocument !== "" && (
                    <Visibility
                      onClick={() => {
                        setImageName(row.gstDocument);
                        setOpen(true);
                      }}
                      style={{ float: "right" }}
                    />
                  )}
                </TableCell>
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
                      {row.status === "CREATED" && (
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="outlined"
                          size="small"
                          onClick={() => displayRazorpay(row)}
                        >
                          Pay
                        </Button>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {orderType === "Company" && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Company ID</TableCell>
              <TableCell>Firm Name</TableCell>
              <TableCell>Legal Business Name</TableCell>
              <TableCell>Status</TableCell>
              {/* {role === "Admin" && <TableCell>Amount</TableCell>} */}
              <TableCell>GST Doc</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((row: any) => (
              <TableRow key={row.companydetailsid}>
                <TableCell>{row.companydetailsid}</TableCell>
                <TableCell>{row.firmName}</TableCell>
                <TableCell>{row.legalbusinessName}</TableCell>
                <TableCell>{row.status}</TableCell>
                {/* {role === "Admin" && (
                  <TableCell>
                    <TextField
                      margin="dense"
                      style={{ width: "70%" }}
                      size="small"
                      defaultValue={getOrderAmount(row)}
                      fullWidth
                      label="Amount"
                      onChange={(event: any) =>
                        (row.amount = event.currentTarget.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />

                    <Tooltip title="Update Amount">
                      <Publish
                        onClick={(event: any) => {
                          saveAmount(row);
                        }}
                        style={{ float: "right" }}
                      />
                    </Tooltip>
                  </TableCell>
                )} */}
                <TableCell>
                  {(role === "Admin" || role === "Agent") && (
                    <TextField
                      margin="dense"
                      type="file"
                      style={{ width: "70%" }}
                      size="small"
                      required
                      fullWidth
                      label="Attach GST Doc"
                      onChange={(file: any) => upload(file, row)}
                      // value={values.pricipleelectricityphoto}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  {row.gstDocument && row.gstDocument !== "" && (
                    <Visibility
                      onClick={() => {
                        setImageName(row.gstDocument);
                        setOpen(true);
                      }}
                      style={{ float: "right" }}
                    />
                  )}
                </TableCell>
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
                      {row.status === "CREATED" && (
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="outlined"
                          size="small"
                          onClick={() => displayRazorpay(row)}
                        >
                          Pay
                        </Button>
                      )}
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
