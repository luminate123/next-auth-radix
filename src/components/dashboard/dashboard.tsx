"use client"
import { Button, Flex, Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'


function HeaderDashboard() {
    const router = useRouter()
    
    return (
        <Flex justify="between" className='item-center mb-4'>
            <Heading>List Tasks</Heading>
            <Button onClick={() => router.push("/dashboard/tasks/new")}>
                Add Task
            </Button>
        </Flex>
    )
}

export default HeaderDashboard