"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import LoadingSpinner from "../components/element/LoadingSpinner";

const UserPage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user.id !== -1) {
      router.push(`/user/${user.id}`);
    } else {
      router.push("/user/sign-in");
    }
  }, [user.id]);

  return (
    <div className="flex flex-col items-center">
      <LoadingSpinner />
    </div>
  );
};

export default UserPage;
