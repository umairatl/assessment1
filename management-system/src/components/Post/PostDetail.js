import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, getPostDetails } from "../../api/api";
import CustomLayout from "../shared/CustomLayout";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const PostDetails = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    getPostDetails(setPostDetails, id);
    getComments(setComments, id);
  }, [id]);

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        POST DETAIL
      </Typography>
      <Stack justifyContent="center" alignItems="center" width="100%">
        {postDetails && (
          <Card
            sx={{
              mb: "16px",
              border: "2px solid #1D9BF0",
              padding: "24px",
              width: "80%",
            }}
          >
            <Stack direction="column" rowGap={2}>
              <Typography>title: {postDetails[0]?.title}</Typography>
              <Typography>{postDetails[0]?.body}</Typography>
            </Stack>
          </Card>
        )}
      </Stack>

      <Grid container justifyContent="center" direction="column">
        <h1>
          comments <ChatBubbleIcon color="primary" />
        </h1>
        <Grid item xs={8} sx={{ height: "20px" }}>
          {comments.map((comment) => (
            <>
              <Card
                key={comment.id}
                sx={{
                  mb: "16px",
                  border: "1px solid black",
                  padding: "16px",
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
                        <Typography>{comment.name}</Typography>
                        <Typography variant="subtitle2" color="grey">
                          {comment.email}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Typography>{comment.body}</Typography>
                </Stack>
              </Card>
              {/* <Stack direction="row" columnGap={2}> */}
              <Divider
                orientation="vertical"
                sx={{
                  borderLeft: "1px solid blue",
                  mb: "12px",
                  width: "3px",
                }}
              />
              {/* </Stack> */}
            </>
          ))}
        </Grid>
      </Grid>
    </CustomLayout>
  );
};

export default PostDetails;
