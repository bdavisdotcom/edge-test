"use client";


import { createSession } from "@/lib/session";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/button";
import { H1 } from "@/components/h1";
import { TextInputGroup } from "@/components/text-input-group";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "@/components/user-context";

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

const fieldSchema = {
    name: yup.string().required().label("Name"),
    email: yup.string().required().label("Email"),
    password: yup.string().required().label("Password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required().label("Confirm Password")
};

export default function Register() {
  const { setCurrentUser } = useUserContext();
  const router = useRouter();
  const schema = yup.object(fieldSchema);

  const form = useForm<yup.InferType<typeof schema>>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  
  const { errors } = form.formState;

  const onSubmit = async (data: RegisterParams) => {
    let token = "";
    let msg = "";
    try {
      const response = await axios.post("/api/auth/register", data);
      console.dir(response);
      token = response.data?.user?.jwt;
      createSession(token);
      setCurrentUser(response.data?.user);
    } catch (error: any) {
      const data = error.response?.data;
      msg = data.message;

      console.dir(data);
      token = "";
    }

    if (!token) {
      form.setError("root", { type: "custom", message: "Unable to login. Please ensure your email and password are correct" });
    } else {
        router.push("/");
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

          <TextInputGroup
              type="password"
              label="Password"
              name="password"
              form={form}
          />
          <TextInputGroup
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              form={form}
          />

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
