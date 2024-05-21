import { TableFooter, TablePagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserList } from "../../api/api";
import { UserManagementContext } from "../../context/UserManagementContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomLayout from "../shared/CustomLayout";

export default function UserList() {
  const { userList, setUserList, setSelectedUserId } = React.useContext(
    UserManagementContext
  );
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  const onClickUser = (userId) => {
    setSelectedUserId(userId);
    navigate(`/users/${userId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentRows =
    rowsPerPage > 0
      ? userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : userList;

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        USER LIST
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              background: "#b8e2f2",
            }}
          >
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{user.name}</TableCell>
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
                    <ArrowForwardIcon
                      color="primary"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          color: "blue",
                        },
                      }}
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={8}
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </CustomLayout>
  );
}
