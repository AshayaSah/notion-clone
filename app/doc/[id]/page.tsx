"use client";

import Document from "@/components/Document";

function DocumentPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4 flex flex-col flex-1 min-h-[80vh]">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;
