"use client";
import { Box, Button, Card, Container, Flex, Heading, TextArea, TextField } from "@radix-ui/themes";
import { useRouter, useParams } from "next/navigation";
import * as Form from '@radix-ui/react-form';
import axios from "axios";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { TrashIcon } from '@radix-ui/react-icons';
import { toast } from "sonner";
import { use, useEffect } from "react";
function HeaderDashboard() {
    const { register, handleSubmit, setValue } = useForm({
        values: {
            title: " ",
            description: "",
        }

    });
    const router = useRouter()
    const params = useParams() as { projectId: string }


    const onSubmit = handleSubmit(async (data) => {
        console.log(data)

        if (!params.projectId) {
            const res = await axios.post("/api/projects", data)
            if (res.status == 201) {
                toast.success("Task created successfully")
            }

        } else {
            const res = await axios.put("/api/projects/" + params.projectId, data)
            if (res.status == 200) {
                toast.success("Task updated successfully")
            }
        }

        router.push("/dashboard")
        router.refresh()
    });

    const handleDelete = async (projectId: string) => {
        console.log(projectId)
        const response = await axios.delete('/api/projects/' + projectId)

        if (response.status === 200) {
            toast.success("Task deleted successfully")
        }

        router.push("/dashboard")
        router.refresh()
    };

    useEffect(() => {
        if (params.projectId) {
            axios.get("/api/projects/" + params.projectId).then(res => {
                console.log(res)
                setValue("title", res.data.title)
                setValue("description", res.data.description)
            })
        }
    }, [])

    return (
        <>
            <Container size="1" height="100%" className="p-3 xl:p-0">
                <Flex className="h-[calc(100vh-10rem)] w-full items-center">
                    <Card className="w-full p-7 ">
                        <Heading>
                            {params.projectId ? "Edit Task" : "New Task"}
                        </Heading>
                        <Form.Root onSubmit={onSubmit}>
                            <Form.Field className="grid mb-[10px]" name="Title">
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Title</Form.Label>
                                </div>

                                <Form.Control asChild>

                                    <TextField.Root placeholder="Write the Title..." required
                                        {...register("title")}>
                                    </TextField.Root>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field className="grid mb-[10px]" name="question">
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                                        Description
                                    </Form.Label>

                                </div>
                                <Form.Control asChild>
                                    <Flex asChild className="h-40">
                                        <TextArea placeholder="Write the description..." required  {...register("description")} />
                                    </Flex>
                                </Form.Control>
                            </Form.Field>
                            <Form.Submit asChild>
                                <Button className="w-full" type="submit">
                                    {params.projectId ? "Edit Task" : "Create Task"}
                                </Button>
                            </Form.Submit>
                        </Form.Root>
                        {
                            params.projectId && (
                                <Button className="w-full my-4" color="red" onClick={() => handleDelete(params.projectId)}> <TrashIcon /> Delete Task</Button>
                            )
                        }
                    </Card>
                </Flex>
            </Container>
        </>
    );
}
export default HeaderDashboard;