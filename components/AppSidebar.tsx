"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NewDocument from "./NewDocument";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import {
  query,
  where,
  collectionGroup,
  DocumentData,
  doc,
} from "firebase/firestore";
import { use, useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

export default function AppSidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }

        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocument></NewDocument>

      {/* my Documents  */}
      <div className="mt-4">
        {groupedData.owner.length == 0 ? (
          <h2 className="text-center text-gray-500 font-semibold text-sm">
            No Documents Found
          </h2>
        ) : (
          <>
            <h2 className="text-center text-gray-500 font-semibold text-sm">
              My Documents
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              {groupedData.owner.map((doc) => (
                <SidebarOption
                  key={doc.id}
                  href={`/doc/${doc.id}`}
                  id={doc.id}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Shared to Me  */}
      <div className="mt-4">
        {groupedData.editor.length == 0 ? (
          <h2 className=" text-center text-gray-500 font-semibold text-sm">
            No Shared Documents Found
          </h2>
        ) : (
          <>
            <h2 className="text-center text-gray-500 font-semibold text-sm">
              Shared to Me
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              {groupedData.editor.map((doc) => (
                <SidebarOption
                  key={doc.id}
                  href={`/doc/${doc.id}`}
                  id={doc.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 className="text-xl font-bold mx-auto my-6">Notion Is Dead Now</h1>

          <SidebarGroupContent>
            <SidebarMenu>{menuOptions}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
