import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import HomePage from "./home/page";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
