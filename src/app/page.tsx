import { Heading, Container, Text, Box, Button, Blockquote } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect} from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page Description",
}


async function HomePage() {

  const session = await getServerSession(authOptions);
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('next-auth.session-token')

  if (session && hasCookie) {
    redirect("/dashboard");
  }


  return (
    <Container className="px-5 md:px-0">
      <Box className=" my-4 bg-slate-900 p-10 rounded-md">
        <Heading className="my-10" size="9">
          CRUD NEXT.JS RADIX
        </Heading>
        <Blockquote>
          hola como estas
        </Blockquote>
        <Button className="mt-10">
          <Link href="/auth/login">
            Ingresar
          </Link>
        </Button>
      </Box>
    </Container>
  )
}

export default HomePage