"use client";

import { createContext, useEffect, useState } from "react";
import { Character, User } from "../../services/neon/types";

type UserContextValue = {
  user: User;
  setUser: any;
  defaultUser: User; // for sign out
};

const defaultUser = {
  id: -1,
  email: "",
};

export const UserContext = createContext({
  user: defaultUser,
  setUser: console.log,
  defaultUser,
});

type UserContextProviderProps = {
  loggedInUser?: User;
  children: JSX.Element;
};

const UserContextProvider = ({
  loggedInUser,
  children,
}: UserContextProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(loggedInUser || defaultUser);

  const userContextValue: UserContextValue = {
    user,
    setUser,
    defaultUser,
  };

  useEffect(() => {
    (async function () {
      await fetch("/api/user")
        .then((res) => res.json())
        .then((json) => {
          if (json.data) {
            setUser(json.data);
          } else {
            console.error(json.message);
          }
        })
        .then(() => {
          if (user) {
            setLoading(false);
          }
        });
    })();
  }, []);

  return (
    <UserContext.Provider value={userContextValue}>
      {loading ? null : children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
