import { Button, Card, Container, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";
import HeaderDashboard from "@/components/dashboard/dashboard";
import prisma from "@/libs/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectCard from "@/components/projects/ProjectCard";

async function loadTasks(userId: number) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const tasks = await loadTasks(parseInt(session?.user.id as string));
  return (
    <Container className="mt-10 px-10 lg:px-0">
      <HeaderDashboard />
      <Grid columns={{ initial: '1', md: '3' }} gap="3" width="auto">
        {tasks.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Grid>
    </Container>
  );
}
export default DashboardPage;