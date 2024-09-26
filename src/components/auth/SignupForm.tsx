"use client";
import { Flex, TextField, Button, Text } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form"
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRef, useState } from "react";

function SignupForm() {

    const { control, handleSubmit, formState: { errors } } = useForm({
        values: {
            name: "",
            email: "",
            password: "",
        }
    });

    const router = useRouter()
    const [error, setError] = useState("")
    const emailRef = useRef(null);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await axios.post("/api/auth/register", data)

            if (res.status === 201) {
                const result = await signIn("credentials", {
                    email: res.data.email,
                    password: data.password,
                    redirect: false
                })

                if (!result?.ok) {
                    console.log(result?.error)
                } else {
                    router.push("/dashboard");
                    toast.success("Welcome to the app")
                    router.refresh();

                }

            }
        } catch (error) {
            setError(error?.response?.status)
            if (error?.response?.status === 500 && emailRef.current) {
                emailRef.current.focus();
            }
        }

    })
    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="bg-red-500 text-xs text-white p-3 rounded mt-2 mb-2">Email ingresado no disponible</p>
            )}
            <Flex direction="column" gap="2">
                <label htmlFor="name">Name:</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: {
                            message: "Name is required",
                            value: true,
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root
                                type="text"
                                placeholder="Write your name"
                                autoFocus
                                {...field}
                            >
                                <TextField.Slot>
                                    <PersonIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        );
                    }}
                />
                {errors.name && <Text color="ruby" className="text-xs">
                    {errors.name.message}
                </Text>}

                <label htmlFor="email">email</label>


                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: {
                            message: "Email is required",
                            value: true,
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root
                                type="email"
                                placeholder="email@domain.com"
                                {...field} ref={emailRef} >
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
                            message: "Passwrod is required",
                            value: true,
                        },
                        minLength: {
                            message: "Password must be at least 6 caracteres",
                            value: 6,
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root
                                type="password"
                                placeholder="******"
                                {...field}>
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

                <Button type="submit">
                    Sign Up
                </Button>
            </Flex>
        </form>

    )
}

export default SignupForm;