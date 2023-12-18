import { useContext, useEffect } from "react";

import { UserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const Account = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/user/sign-in");
    }
  }, [user]);

  return user?.email ? (
    <div>SIGNED IN USER: {user.email}</div>
  ) : (
    <div>NO USER</div>
  );
};

export default Account;
