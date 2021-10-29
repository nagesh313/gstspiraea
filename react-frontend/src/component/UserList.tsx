import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast, successToast } from "../util/util";
import Title from "./Title";
export function UserListComponent(props: any) {
  const [userList, setUserList] = React.useState<any>([]);
  // const [open, setOpen] = React.useState<boolean>(false);

  const fetchUserList = () => {
    axios
      .get("/api/getAllUsers")
      .then((response: any) => {
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
  // const deleteAccount = (user: any) => {
  //   axios
  //     .get("/api/v1/admin/user/deleteUser/" + user.id)
  //     .then((response: any) => {
  //       props.enqueueSnackbar("User Deleted", successToast);
  //       fetchUserList();
  //     })
  //     .catch((reponse: any) => {
  //       props.enqueueSnackbar(reponse.error, failureToast);
  //     });
  // };
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
    console.log(user);
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

  return (
    <React.Fragment>
      <Title>List of registered Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Password</TableCell>
            <TableCell align="center">
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.userEmail}</TableCell>
              <TableCell>{row.loginUserName}</TableCell>
              <TableCell>{row.loginPassword}</TableCell>

              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => sendmail(row)}
                >
                  Send Credentials
                </Button>
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
