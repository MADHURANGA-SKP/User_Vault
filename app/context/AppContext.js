import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    address: "",
    profilePicture: null,
    familyDetails: [],
    educationDetails: [],
  });

  const updateUser = (newData) => {
    setUser((prevUser) => ({ ...prevUser, ...newData }));
  };

  const resetUser = () => {
    setUser({
      name: "",
      age: "",
      address: "",
      profilePicture: null,
      familyDetails: [],
      educationDetails: [],
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);
