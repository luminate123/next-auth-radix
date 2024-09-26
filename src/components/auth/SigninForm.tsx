"use client";
import { Flex, TextField, Button, Text } from "@radix-ui/themes"
import { useState } from 'react'
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { toast } from "sonner";

function SigninForm() {

    const { control, handleSubmit, formState: { errors } } = useForm({
        values: {
            email: "",
            password: "",
        }
    });

    const router = useRouter()
    const [error, setError] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        })

        if (!res?.ok) {
            setError(res?.error)
        } else {
            router.push("/dashboard");
            toast.success("Welcome to the app")
            router.refresh()
            
        }


    });



    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="bg-red-500 text-xs text-white p-3 rounded mb-2">Email o contraseña incorrectas</p>
            )}
            <Flex direction="column" gap="2">
                <label htmlFor="email">email</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: {
                            message: "email is required",
                            value: true,
                        },

                    }}
                    render={({ field }) => {
                        return (

                            <TextField.Root
                                type="email"
                                placeholder="email@domain.com"
                                autoFocus
                                {...field}
                            >
                                <TextField.Slot>
                                    <EnvelopeClosedIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>

                        );

                    }}
                />

                {errors.email && <Text color="ruby" className="text-xs">
                    {errors.email.message}
                </Text>}

                <label htmlFor="password">password</label>

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            message: "password is required",
                            value: true,
                        },

                    }}
                    render={({ field }) => {
                        return (

                            <TextField.Root
                                type="password"
                                placeholder="******"
                                {...field}
                            >
                                <TextField.Slot>
                                    <LockClosedIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>

                        );

                    }}
                />
                {errors.password && <Text color="ruby" className="text-xs">
                    {errors.password.message}
                </Text>}

                <Button type="submit" mt="4">
                    Sign In
                </Button>

            </Flex>
        </form>

    )
}

export default SigninForm;