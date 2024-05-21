import axios from "axios";

export const getUserList = (setList) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
      if (response.status === 200) {
        setList(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching user list:", error);
    });
};

export const getPostList = (setPost) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => {
      if (response.status === 200) {
        setPost(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching post list:", error);
    });
};

export const getPostDetails = (setPostDetails, postId) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?id=${postId}`)
    .then((response) => {
      if (response.status === 200) {
        setPostDetails(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching post list:", error);
    });
};

export const getCommentList = (setComments) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/comments`)
    .then((response) => {
      if (response.status === 200) {
        setComments(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching post list:", error);
    });
};

export const getComments = (setComments, postId) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((response) => {
      if (response.status === 200) {
        setComments(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching post list:", error);
    });
};

export const getUserToDo = (setUserToDo, userId) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then((response) => {
      if (response.status === 200) {
        setUserToDo(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching post list:", error);
    });
};

export const createUserToDo = (setUserToDo, title, userId) => {
  axios
    .post(`https://jsonplaceholder.typicode.com/todos`, {
      userId: userId,
      title: title,
      completed: false,
    })
    .then((response) => {
      if (response.status === 201) {
        setUserToDo((prevToDos) => [...prevToDos, response.data]);
      }
    })
    .catch((error) => {
      console.error("Error creating new to-do:", error);
    });
};

export const updateUserToDo = (setUserToDo, toDoId, completed) => {
  axios
    .patch(`https://jsonplaceholder.typicode.com/todos/${toDoId}`, {
      completed: completed,
    })
    .then((response) => {
      if (response.status === 200) {
        setUserToDo((prevToDos) =>
          prevToDos.map((toDo) =>
            toDo.id === toDoId ? { ...toDo, completed: completed } : toDo
          )
        );
      }
    })
    .catch((error) => {
      console.error("Error updating to-do:", error);
    });
};

export const deleteUserToDo = (setUserToDos, toDoId) => {
  axios
    .delete(`https://jsonplaceholder.typicode.com/todos/${toDoId}`)
    .then((response) => {
      if (response.status === 200) {
        setUserToDos((prevToDos) =>
          prevToDos.filter((toDo) => toDo.id !== toDoId)
        );
      }
    })
    .catch((error) => {
      console.error("Error deleting to-do:", error);
    });
};
