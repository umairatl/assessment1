import React, { useEffect, useState, useRef } from "react";
import CustomLayout from "../components/shared/CustomLayout";
import UserList from "../components/UserList";
import { getCommentList, getPostDetails, getPostList } from "../api/api";
import Chart from "chart.js/auto";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const [commentList, setCommentsList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [averageCommentsPerPost, setAverageCommentsPerPost] = useState(0); // State to store average comments per post
  const chartContainerRef = useRef(null); // Reference to the chart container div

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

      // Render chart
      renderChart(average);
    }
  }, [postList, commentList]);

  const renderChart = (average) => {
    if (chartContainerRef.current) {
      // Clear previous chart if exists
      chartContainerRef.current.innerHTML = "";

      // Create new canvas element
      const canvas = document.createElement("canvas");
      chartContainerRef.current.appendChild(canvas);

      // Render chart
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
