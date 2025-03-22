"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/button";
import { H1 } from "@/components/h1";
import { TextInputGroup } from "@/components/text-input-group";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@/lib/types";
import { useUserContext } from "@/components/user-context";

type ProfileParams = {
  name: string;
  email: string;
};

const fieldSchema = {
    name: yup.string().required().label("Name"),
    email: yup.string().required().label("Email"),
};

export default function Profile() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserContext();
  const schema = yup.object(fieldSchema);
  
  const form = useForm<yup.InferType<typeof schema>>({
    defaultValues: { name: "", email: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
    
  const { errors } = form.formState;

  const onSubmit = async (data: ProfileParams) => {
    let token = "";
    let msg = "";
    try {
      console.log("User profile update submit");
      // const response = await axios.post("/api/auth/register", data);
      // console.dir(response);
      // token = response.data?.user?.jwt;
      // createSession(token);
    } catch (error: any) {
      const data = error.response?.data;
      msg = data.message;
      form.setError("root", { type: "custom", message: msg || "Unable to update profile"});

      console.dir(data);
    }
  };

  return (
    <div className="grid justify-items-center p-6">
      <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[480px] gap-2.5 flex flex-col mb-24 w-full"
          >
          <div className="border-b border-b-white mb-10">
              <H1 className="mb-2 text-center">Register</H1>
          </div>

          <TextInputGroup type="text" label="Name" name="name" form={form} />
          <TextInputGroup type="email" label="Email" name="email" form={form} />

          {errors.root && (
              <p className="text-orange text-sm font-medium mb-2">
              {errors.root.message}
              </p>
          )}

          <Button priority="primary" size="large">Register</Button>
      </form>
    </div>
    
  );
}
