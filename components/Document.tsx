"use client";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FormEvent, useEffect, useState, useTransition } from "react";

function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  console.log("Document data:");
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  //   const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={updateTitle} className="flex items-center space-x-2">
          {/* Update Title  */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      <div>
        {/* Manage User  */}

        {/* Avatars  */}
      </div>

      {/* Collaborative Editor  */}
    </div>
  );
}

export default Document;
