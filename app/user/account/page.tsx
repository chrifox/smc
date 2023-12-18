"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "@/app/context/UserContext";
import Button from "@/app/components/Button";

const Account = () => {
  const { user, setUser, defaultUser } = useContext(UserContext);
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/user?signout")
      .then((res) => res.json())
      .then(() => setUser(defaultUser));
  }

  useEffect(() => {
    if (!user?.email) {
      router.push("/user/sign-in");
    }
  }, [user]);

  return user?.email ? (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  ) : null;
};

export default Account;
