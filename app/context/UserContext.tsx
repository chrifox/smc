"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "../../services/neon/types";

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

  // setUser from cookie
  useEffect(() => {
    (async () => {
      await fetch("/api/user")
        .then((res) => res.json())
        .then(({ user }) => setUser(user))
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
