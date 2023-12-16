"use client"

import { useContext } from "react";

import { UserContext } from "@/app/context/UserContext";

const Account = () => {
  const user = useContext(UserContext);

  return <div>ACCOUNT</div>;
};

export default Account;
