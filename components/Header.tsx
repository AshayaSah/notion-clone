"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { SidebarTrigger } from "./ui/sidebar";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-200">
        <div className="flex items-center gap-2">
          <SidebarTrigger></SidebarTrigger>
          <h1 className="text-2xl font-bold">
            {user?.firstName}
            {`'s`} Space
          </h1>
        </div>

        {/* BreadCrums  */}
        {/* <Breadcrumbs></Breadcrumbs> */}

        <div>
          <SignedOut>
            <SignInButton mode="modal"></SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </header>
    </>
  );
}
export default Header;
