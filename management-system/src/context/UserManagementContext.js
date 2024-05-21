import React, { createContext, useState } from "react";

const UserManagementContext = createContext();

const UserManagementProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <UserManagementContext.Provider
      value={{
        userList,
        selectedUserId,
        setUserList,
        setSelectedUserId,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export { UserManagementContext, UserManagementProvider };
