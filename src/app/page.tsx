'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Link } from "d-system";
import { useEffect } from "react";
import axios from "axios";

const  Index = () => {
  const {isLoading} = useUser()
 // console.log(user);
  //console.log(isLoading);
  //console.log(error);
  useEffect(() => {
    const get = async () => {
      if(!isLoading){
        await axios.get('/api/projects')
      }
    }
    void get()
  }, [isLoading])
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