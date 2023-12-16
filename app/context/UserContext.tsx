"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "../data/types";

export const UserContext = createContext({});

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
