"use sever";
import { redirect } from "next/navigation";
import EditForm from "./EditForm";
import { getUserData } from "@/lib/session";

interface User {
  id: number;
  userName: string;
  email: string;
}

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const session = await getUserData(params.id);
  if (session?.id !== Number(params.id)) {
    return redirect("/login");
  }
  return <EditForm id={params.id} session={session as User} />;
}
