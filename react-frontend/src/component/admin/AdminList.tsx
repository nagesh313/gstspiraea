import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Add, Delete } from "@material-ui/icons";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast, successToast } from "../../util/util";
import Title from "../Title";
import { CreateNewUserDialog } from "./CreateNewUser";
import { useHistory } from "react-router-dom";
export function AdminListComponent(props: any) {
  const history = useHistory();
  const role = sessionStorage.getItem("role");
  if (role !== "admin") {
    history.push("/dashboard/order-list");
  }
  const [adminList, setAdminList] = React.useState<any>([]);

  const fetchUserList = () => {
    axios
      .get("/api/getAllUsers")
      .then((response: any) => {
        const adminList = response.data?.filter((row: any) => {
          return row.role === "Admin";
        });
        setAdminList(adminList);
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

  const sendmail = (user: any) => {
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
  useEffect(() => {
    fetchUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = React.useState<any>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    fetchUserList();
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
          <Title style={{ marginTop: "20px" }}>List of registered Admin</Title>
        </Grid>
        <Grid item xs={6}>
          <Title
            style={{ marginTop: "20px", textAlign: "right", cursor: "pointer" }}
          >
            <Tooltip title="Add">
              <Add onClick={handleOpen}></Add>
            </Tooltip>
            <CreateNewUserDialog
              open={open}
              type="Admin"
              handleClose={handleClose}
            ></CreateNewUserDialog>
          </Title>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Password</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminList.map((row: any) => (
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const AdminList = withSnackbar(AdminListComponent);
