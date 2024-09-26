import { Container, Card, Heading, Flex, Text, Link } from '@radix-ui/themes';
import SignupForm from "@/components/auth/SignupForm";
import NavLink from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function RegisterPage() {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('next-auth.session-token')

  if (session && hasCookie) {
    redirect("/dashboard");
  }
  
  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-[calc(100vh-10rem)] w-full items-center">
          <Card className="w-full p-7 ">
            <Heading>Sign Up</Heading>
            <SignupForm />
            <Flex justify="between" my="4">
              <Text>
                Already have an account?
              </Text>
              <Link asChild>
                <NavLink href="/auth/login" passHref>
                  Sign In
                </NavLink>

              </Link>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </>
  )
}

export default RegisterPage