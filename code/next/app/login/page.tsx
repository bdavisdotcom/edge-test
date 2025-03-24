"use client";
import { Button } from "@/components/button";
import { H1 } from "@/components/h1";
import { TextInputGroup } from "@/components/text-input-group";
import { createSession } from "@/lib/session";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UserContext } from "@/components/user-context";
import { useContext } from "react";
import { useOverlay } from "@/components/overlays/overlays-provider";

type LoginParams = {
  email: string;
  password: string;
};

export const schema = yup.object({
  email: yup.string().required().label("Email"),
  password: yup.string().required().label("Password"),
});

export default function Login() {
  const { setCurrentUser } = useContext(UserContext);
  const router = useRouter();
  const { notify } = useOverlay();

  const form = useForm<yup.InferType<typeof schema>>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginParams) => {
    let token = "";
    let msg = "";

    try {
      const response = await axios.post("/api/auth/login", data);
      token = response.data?.user?.jwt;
      const user = response.data?.user;
      notify(
        `Login successful`
      );
      createSession(token);
      setCurrentUser(user);
    } catch (error: any) {
      msg = error.response?.data?.message;
      console.log(error);
      token = "";
    }

    if (token) {
      router.push("/");
    } else {
      form.setError("root", {
        type: "custom",
        message:
          msg || "Unable to login. Please ensure your email and password are correct.",
      });
    }
  };

  const { errors } = form.formState;

  return (
    <div className="grid justify-items-center p-6">
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[480px] gap-2.5 flex flex-col mb-24 w-full"
        >
        <div className="border-b border-b-white mb-10">
            <H1 className="mb-2 text-center">Login</H1>
        </div>

        <TextInputGroup type="email" label="Email" name="email" form={form} />
        <TextInputGroup
            type="password"
            label="Password"
            name="password"
            form={form}
        />

        {errors.root && (
            <p className="text-orange text-sm font-medium mb-2">
            {errors.root.message}
            </p>
        )}

        <Button loading={form.formState.isSubmitting} priority="primary" size="large">
            Login
        </Button>
        </form>
    </div>
  );
}
