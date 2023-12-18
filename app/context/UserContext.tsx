"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "../data/types";

type UserContextValue = {
  user: User;
  setUser: any;
};

const defaultUser = {
  id: -1,
  email: "",
};

export const UserContext = createContext({
  user: defaultUser,
  setUser: console.log,
});

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    if (user) {
      console.log("context", user);

      // TODO: set cookie
    }
  }, [user]);

  const userContextValue: UserContextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
