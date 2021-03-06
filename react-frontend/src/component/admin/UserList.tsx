import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast, successToast } from "../../util/util";
import Title from "../Title";
import { useHistory } from "react-router-dom";
export function UserListComponent(props: any) {
  const history = useHistory();
  const role = sessionStorage.getItem("role");
  if (role === null) {
    window.location.href = "/";
  }
  if (role !== "Admin") {
    history.push("/dashboard/order-list");
  }
  const [userList, setUserList] = React.useState<any>([]);
  const [searchQuery, setSearchQuery] = React.useState<any>("");

  const [agentList, setAgentList] = React.useState<any>([]);
  // const [open, setOpen] = React.useState<boolean>(false);

  const fetchUserList = () => {
    axios
      .get("/api/getAllUsers")
      .then((response: any) => {
        const agentList = response.data?.filter((row: any) => {
          return row.role === "Agent";
        });
        setAgentList(agentList);
        setUserList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  // const activateAccount = (user: any) => {
  //   axios
  //     .get("/api/v1/admin/user/activate/" + user.id)
  //     .then((response: any) => {
  //       props.enqueueSnackbar("User activated", successToast);
  //       fetchUserList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar("reponse.error", successToast);
  //     });
  // };
  // const deActivateAccount = (user: any) => {
  //   axios
  //     .get("/api/v1/admin/user/deactivate/" + user.id)
  //     .then((response: any) => {
  //       props.enqueueSnackbar("User Deactivated", successToast);
  //       fetchUserList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
  const deleteAccount = (user: any) => {
    axios
      .delete("/api/delete-user/" + user.userId)
      .then((response: any) => {
        props.enqueueSnackbar("User Deleted", successToast);
        fetchUserList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Unable To Delete User", failureToast);
      });
  };
  // const submitNewUser = (user: any) => {
  //   console.log(user);
  //   axios
  //     .post("/api/v1/admin/user/add/", user)
  //     .then((response: any) => {
  //       props.enqueueSnackbar("User Added", successToast);
  //       fetchUserList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
  const sendmail = (user: any) => {
    if (
      user.loginUserName === undefined ||
      user.loginUserName === null ||
      user.loginUserName === "" ||
      user.loginPassword === undefined ||
      user.loginPassword === null ||
      user.loginPassword === ""
    ) {
      alert(
        "Please make sure you have a valid username and password before you send the credentials."
      );
      return;
    }
    axios
      .post("/api/generateLoginDetails", user)
      .then((response: any) => {
        props.enqueueSnackbar("User Credentials Generated", successToast);
        fetchUserList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const updateUserAgentMapping = (user: any, loginUserName: any) => {
    axios
      .get("/api/updateUserAgentMapping/" + user.userId + "/" + loginUserName)
      .then((response: any) => {
        props.enqueueSnackbar("User Assigned Successfully", successToast);
        fetchUserList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Unable to assigned User to Agent", failureToast);
        fetchUserList();
      });
  };
  useEffect(() => {
    fetchUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // const [open, setOpen] = React.useState<any>(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   fetchUserList();
  // };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={7}>
          <Title style={{ marginTop: "20px" }}>List of Customers</Title>
        </Grid>
        <Grid item xs={5} style={{ textAlign: "right" }}>
          <TextField
            margin="dense"
            type="text"
            size="small"
            label="Search"
            onChange={(text: any) => {
              setSearchQuery(text.target.value);
            }}
            // value={values.pricipleelectricityphoto}
            // InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Assign To Agent</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList
            ?.filter((row: any) => {
              return row.role === "Customer";
            })
            ?.filter((row: any) => {
              return (
                searchQuery === "" ||
                row.role.includes(searchQuery) ||
                row.userEmail.includes(searchQuery) ||
                row.loginUserName.includes(searchQuery)
              );
            })
            ?.map((row: any) => (
              <TableRow key={row.userId}>
                <TableCell>{row.userEmail}</TableCell>
                <TableCell>
                  <TextField
                    autoComplete="loginUserName"
                    name="loginUserName"
                    fullWidth
                    size="small"
                    id="loginUserName"
                    defaultValue={row.loginUserName}
                    onChange={(event: any) => {
                      row.loginUserName = event.target.value;
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    autoComplete="loginPassword"
                    name="loginPassword"
                    fullWidth
                    size="small"
                    id="loginPassword"
                    defaultValue={row.loginPassword}
                    onChange={(event: any) => {
                      row.loginPassword = event.target.value;
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    style={{ marginLeft: "30px", marginBottom: "9px" }}
                    value={row.assignedToAgent ? row.assignedToAgent : ""}
                    onChange={(event: any, data: any) => {
                      updateUserAgentMapping(row, event.target.value);
                    }}
                  >
                    {agentList.map((agent: any) => {
                      return (
                        <MenuItem
                          value={agent.loginUserName}
                          key={agent.loginUserName}
                        >
                          {agent.loginUserName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => sendmail(row)}
                  >
                    Send Credentials
                  </Button>
                  <IconButton
                    aria-label="DeleteIcon"
                    onClick={() => {
                      deleteAccount(row);
                    }}
                  >
                    <Delete />
                  </IconButton>
                  {/* {!row.enabled ? (
                  <IconButton
                    aria-label="PlayCircleFilledIcon"
                    onClick={() => {
                      activateAccount(row);
                    }}
                  >
                    <PlayCircleFilledIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="PauseCircleFilledIcon"
                    onClick={() => {
                      deActivateAccount(row);
                    }}
                  >
                    <PauseCircleFilledIcon />
                  </IconButton>
                )}
                
                <IconButton
                  aria-label="DeleteIcon"
                  onClick={() => {
                    deleteAccount(row);
                  }}
                >
                  <DeleteIcon />
                </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const UserList = withSnackbar(UserListComponent);
