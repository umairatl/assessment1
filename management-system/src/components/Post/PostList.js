import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { getPostList } from "../../api/api";
import CustomLayout from "../shared/CustomLayout";
import { UserManagementContext } from "../../context/UserManagementContext";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function PostList() {
  const { userList } = React.useContext(UserManagementContext);
  const [postList, setPostList] = useState([]);
  const [combinedDetails, setCombinedDetails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const combineUserInfo = (posts, users) => {
    return posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return {
        ...post,
        name: user ? user.name : null,
        username: user ? user.username : null,
      };
    });
  };

  useEffect(() => {
    getPostList(setPostList);
    setCombinedDetails(combineUserInfo(postList, userList));
  }, [postList, userList]);

  const viewDetails = (postId) => {
    setSelectedId(postId);
    navigate(`/post-detail/${postId}`);
  };

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        POST LIST
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          {combinedDetails.map((user) => (
            <Card
              onClick={() => viewDetails(user.id)}
              key={user.id}
              sx={{
                mb: "16px",
                border: "1px solid #1D9BF0",
                padding: "16px",
                "&:hover": {
                  cursor: "pointer",
                  background: "#b8e2f2",
                },
              }}
            >
              <Stack direction="column" rowGap={2}>
                <Grid
                  container
                  direction="row"
                  columnGap={1}
                  alignItems="center"
                >
                  <Grid item>
                    <AccountCircleIcon fontSize="large" color="primary" />
                  </Grid>
                  <Grid item>
                    <Stack direction="column">
                      <Typography>{user.name}</Typography>
                      <Typography variant="subtitle2" color="grey">
                        @{user.username}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Typography>{user.title}</Typography>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Grid>
    </CustomLayout>
  );
}
