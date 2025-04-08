import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  auth();

  const { id } = params;
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
