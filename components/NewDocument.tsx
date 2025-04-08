"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // For Next.js 13 and later
import { createNewDocument } from "@/actions/astions";

function NewDocument() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      try {
        const { docId } = await createNewDocument(); // Ensure this returns { docId }
        router.push(`/doc/${docId}`);
      } catch (error) {
        console.error("Error creating document:", error);
      }
    });
  };

  return (
    <div>
      <Button
        onClick={handleCreateNewDocument}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Creating..." : "New Document"}
      </Button>
    </div>
  );
}

export default NewDocument;
