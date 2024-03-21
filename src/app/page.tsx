'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Link } from "d-system";

const  Index =() => {
  const {user, isLoading,error} = useUser()
  console.log(user);
  console.log(isLoading);
  console.log(error);
  return (
    <>
      <Link
        href="/api/auth/login"
        text="Login"
      />
    </>
  );
}

export default Index