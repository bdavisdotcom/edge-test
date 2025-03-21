import { Button } from "@/components/button";
import { H1 } from "@/components/h1";
import { TextInputGroup } from "@/components/text-input-group";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type Props = {
    registerMode: boolean;
    onSubmit: any;
}

const register = {
    name: yup.string().required().label("Name"),
    email: yup.string().required().label("Email"),
    password: yup.string().required().label("Password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required().label("Confirm Password")
};

const update = {
    name: yup.string().required().label("Name"),
    email: yup.string().required().label("Email"),
};

export function Profile({ registerMode, onSubmit }: Props) {

    const schema = yup.object(registerMode ? register : update);

    const form = useForm<yup.InferType<typeof schema>>({
        defaultValues: { email: "" },
        resolver: yupResolver(schema),
        mode: "onChange",
      });

    const { errors } = form.formState;

    return (
        <div className="grid justify-items-center p-6">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-[480px] gap-2.5 flex flex-col mb-24 w-full"
                >
                <div className="border-b border-b-white mb-10">
                    <H1 className="mb-2 text-center">{registerMode ? "Register" : "Profile" }</H1>
                </div>

                <TextInputGroup type="text" label="Name" name="name" form={form} />
                <TextInputGroup type="email" label="Email" name="email" form={form} />

                {registerMode ? 
                (<><TextInputGroup
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
                /></>) : <></>}

                {errors.root && (
                    <p className="text-orange text-sm font-medium mb-2">
                    {errors.root.message}
                    </p>
                )}

                <Button priority="primary" size="large">
                    {registerMode ? "Register" : "Update" }
                </Button>
            </form>
    </div>
    )
}