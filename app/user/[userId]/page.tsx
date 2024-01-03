"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "@/app/context/UserContext";
import Button from "@/app/components/element/Button";
import { CHARACTER_LIST, SIGN_IN, USER } from "@/app/constants/routes";

const UserAccountPage = () => {
  const { user, setUser, defaultUser } = useContext(UserContext);
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/user?signout")
      .then((res) => res.json())
      .then(() => setUser(defaultUser));
  }

  function handleViewCharacters() {
    router.push(`${USER}/${user.id}${CHARACTER_LIST}`);
  }

  useEffect(() => {
    if (user.id === -1) {
      router.push(SIGN_IN);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <h1>Account</h1>

      <Button classes="mb-4" onClick={handleViewCharacters}>
        My Characters
      </Button>

      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default UserAccountPage;
