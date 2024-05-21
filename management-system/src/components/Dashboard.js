import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserList } from "../api/api";
import { UserManagementContext } from "../context/UserManagementContext";

export default function Dashboard() {
  const { userList, setUserList, setSelectedUserId } = React.useContext(
    UserManagementContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  const onClickUser = (userId) => {
    setSelectedUserId(userId);
    navigate(`/users/${userId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Company name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.company.name}</TableCell>
              <TableCell>
                <Typography
                  onClick={() => {
                    onClickUser(user.id);
                  }}
                >
                  details
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
