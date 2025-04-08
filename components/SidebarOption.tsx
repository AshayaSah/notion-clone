"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`
        flex items-center justify-center
        p-2 
        rounded-md 
        transition-colors
        hover:bg-gray-200
        ${
          isActive
            ? "bg-gray-300 text-gray-900 font-medium border-l-4 border-blue-500"
            : "bg-transparent text-gray-700 border border-black hover:text-gray-900"
        }
      `}
    >
      <p className="truncate text-sm">{data.title}</p>
    </Link>
  );
}

export default SidebarOption;
