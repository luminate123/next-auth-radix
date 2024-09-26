"use client"
import React from 'react';
import { Link, Box, Button, Container, DropdownMenu, Flex, Heading, TabNav } from '@radix-ui/themes';
import NextLink from "next/link"
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation
import { useSession, signOut } from "next-auth/react";


function Navbar() {

    const { data: session } = useSession();
    console.log(session);

    const pathname = usePathname();
    return (
        <nav className='px-10 xl:px-0 bg-zinc-950 py-4'>
            <Container>
                <Flex direction="row" justify="between" gap="4" pb="2">
                    <Heading className='flex items-center '>
                        <NextLink href="/" passHref>CRUD NEXT.JS</NextLink>
                    </Heading>
                    <TabNav.Root size="2" >
                        {
                            !session && (
                                <>
                                    <TabNav.Link asChild active={pathname === '/auth/login'}>
                                        <NextLink href="/auth/login" passHref>Login</NextLink>
                                    </TabNav.Link>
                                    <TabNav.Link asChild active={pathname === '/auth/register'}>
                                        <NextLink href="/auth/register" passHref>Register</NextLink>
                                    </TabNav.Link>
                                </>
                            )
                        }

                        {
                            session && (

                                <>
                                    <TabNav.Link asChild active={pathname === '/dashboard'}>
                                        <NextLink href="/dashboard" passHref>Dashboard</NextLink>
                                    </TabNav.Link>
                                    <Flex className='flex items-center'>
                                        <DropdownMenu.Root >
                                            <DropdownMenu.Trigger>
                                                <Button variant="soft">
                                                    {session?.user?.name}
                                                    <DropdownMenu.TriggerIcon />
                                                </Button>
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content>
                                                <DropdownMenu.Item><a href="#">My Profile</a></DropdownMenu.Item>
                                                <DropdownMenu.Item >Setting</DropdownMenu.Item>
                                                <DropdownMenu.Separator />
                                                <DropdownMenu.Item color="red" onClick={() => signOut()}>
                                                    LogOut
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </Flex>

                                </>
                            )
                        }


                    </TabNav.Root>

                </Flex>
            </Container>

        </nav>
    )
}

export default Navbar