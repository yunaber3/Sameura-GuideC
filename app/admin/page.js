import { redirect } from "next/navigation";
import { getAllProperties } from "@/lib/content";

export default async function AdminIndexPage() {
  const properties = await getAllProperties();
  const first = properties.find((p) => p.enabled) || properties[0];
  redirect(`/admin/${first ? first.id : "sameura"}`);
}
