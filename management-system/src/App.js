import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import About from "./pages/About";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserManagementProvider } from "./context/UserManagementContext";
import UserDetails from "./components/UserDetails";
import PostList from "./components/Post/PostList";
import PostDetails from "./components/Post/PostDetail";
import UserList from "./components/UserList";
import ToDoList from "./components/ToDo.js/ToDoList";
import UserToDo from "./components/ToDo.js/UserToDo";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#131052",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserManagementProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/about" element={<About />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post-detail/:id" element={<PostDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/to-do" element={<ToDoList />} />
            <Route path="/to-do-detail/:id" element={<UserToDo />} />
          </Routes>
        </Router>
      </UserManagementProvider>
    </ThemeProvider>
  );
}

export default App;
