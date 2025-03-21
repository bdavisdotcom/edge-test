"use client";


import { createSession } from "@/lib/session";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Profile } from "@/components/profile";

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: RegisterParams) => {
    let token = "";
    let msg = "";
    try {
      const response = await axios.post("/api/auth/register", data);
      console.dir(response);
      token = response.data?.user?.jwt;
      createSession(token);
    } catch (error: any) {
      const data = error.response?.data;
      msg = data.message;
      console.dir(data);
      token = "";
    }

    if (!token) {
      setError(msg || "Unable to login. Please ensure your email and password are correct.");
    } else {
        router.push("/");
    }
  };

  return (
    <div>
      <Profile registerMode={true} onSubmit={onSubmit} />
      {error && (
        <p className="text-orange text-sm font-medium mb-2">
          {error}
        </p>)}
    </div>
    
  );
}
