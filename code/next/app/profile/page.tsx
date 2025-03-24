"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/button";
import { H1 } from "@/components/h1";
import { TextInputGroup } from "@/components/text-input-group";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@/lib/types";
import { UserContext } from "@/components/user-context";
import { getSession } from "@/lib/session";
import axios from "axios";
import { useOverlay } from "@/components/overlays/overlays-provider";

type ProfileParams = {
  name: string;
  // email: string;
};

const fieldSchema = {
    name: yup.string().required().label("Name"),
    // email: yup.string().required().label("Email"),
};

export default function Profile() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { notify } = useOverlay();
  const schema = yup.object(fieldSchema);
  const[message, setMessage] = useState<string>("");

  const form = useForm<yup.InferType<typeof schema>>({
    defaultValues: { name: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
    
  const { errors } = form.formState;

  useEffect(() => {
    const session = getSession();
    if (!session) {
      return router.push("/");
    }
  }, []);

  useEffect(() => {
    form.reset({ name: currentUser?.name });
  }, [currentUser, form.reset]);

  const onSubmit = async (data: ProfileParams) => {
    let token = "";
    let msg = "";
    try {
      const response = await axios.post("/api/user", { ...currentUser, ...data });
      const { user } = response.data;

      notify(
        `Profile updated`
      );

      setCurrentUser({ ...currentUser, ...user });

    } catch (error: any) {
      console.dir(error);
      const data = error.response?.data;
      msg = data?.message;
      form.setError("root", { type: "custom", message: msg || "Unable to update profile"});
    }
  };

  return (
    <div className="grid justify-items-center p-6">
      <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[480px] gap-2.5 flex flex-col mb-24 w-full"
          >
          <div className="border-b border-b-white mb-10">
              <H1 className="mb-2 text-center">Update Profile</H1>
          </div>

          <TextInputGroup type="text" label="Name" name="name" form={form} />
          {/* <TextInputGroup type="email" label="Email" name="email" form={form} /> */}

          {errors.root && (
              <p className="text-orange text-sm font-medium mb-2">
              {errors.root.message}
              </p>
          )}

          {message && (
            <p className="text-green text-md font-medium mb-2">
              {message}
            </p>
          )}

          <Button loading={form.formState.isSubmitting} priority="primary" size="large">Update</Button>
      </form>
    </div>
    
  );
}
