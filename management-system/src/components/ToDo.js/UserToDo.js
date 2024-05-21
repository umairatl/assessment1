import { Button, Stack, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createUserToDo,
  deleteUserToDo,
  getUserToDo,
  updateUserToDo,
} from "../../api/api";
import CustomLayout from "../shared/CustomLayout";
import CheckIcon from "@mui/icons-material/Check";

const UserToDo = () => {
  const { id } = useParams();
  const [todoList, setToDoList] = useState([]);
  const [newToDoTitle, setNewToDoTitle] = useState("");

  const getToDoById = () => {
    if (id) {
      getUserToDo(setToDoList, id);
    }
  };

  useEffect(() => {
    getToDoById();
  }, [id]);

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        Add item
      </Typography>
      <TextField
        label="New To-Do"
        variant="outlined"
        value={newToDoTitle}
        onChange={(e) => setNewToDoTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Stack alignItems="end">
        <Button
          variant="contained"
          onClick={() => {
            createUserToDo(setToDoList, newToDoTitle, id);
            setNewToDoTitle("");
          }}
        >
          Add item
        </Button>
      </Stack>
      <Typography variant="h5" textAlign="center" m={4}>
        To-do list
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
              <TableCell>Title</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo, index) => (
              <TableRow key={todo.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>
                  <Stack justifyContent="center" alignItems="center">
                    {todo.completed ? (
                      <CheckIcon color="primary" />
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          updateUserToDo(
                            setToDoList,
                            todo?.id,
                            !todo?.completed
                          )
                        }
                      >
                        Done
                      </Button>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUserToDo(setToDoList, todo?.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomLayout>
  );
};

export default UserToDo;
