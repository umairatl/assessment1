import React, { useEffect, useState, useRef } from "react";
import CustomLayout from "../components/shared/CustomLayout";
import UserList from "../components/User/UserList";
import { getCommentList, getPostDetails, getPostList } from "../api/api";
import Chart from "chart.js/auto";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const [commentList, setCommentsList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [averageCommentsPerPost, setAverageCommentsPerPost] = useState(0);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    getPostList(setPostList);
    getCommentList(setCommentsList);
  }, []);

  useEffect(() => {
    // Calculate average comments per post
    if (postList.length > 0 && commentList.length > 0) {
      const totalComments = commentList.length;
      const totalPosts = postList.length;
      const average = totalComments / totalPosts;
      setAverageCommentsPerPost(average);

      renderChart(average);
    }
  }, [postList, commentList]);

  const renderChart = (average) => {
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";

      const canvas = document.createElement("canvas");
      chartContainerRef.current.appendChild(canvas);

      new Chart(canvas, {
        type: "bar",
        data: {
          labels: ["Average Comments per Post"],
          datasets: [
            {
              label: "Average Comments per Post",
              data: [average],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        DASHBOARD
      </Typography>
      <div ref={chartContainerRef}></div>
    </CustomLayout>
  );
};

export default Dashboard;
