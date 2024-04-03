"use sever";
import EditForm from "./EditForm";

export default function page({
  params,
}: {
  params: { id: string };
}) {
  return <EditForm id={params.id} />;
}
