"use client";

import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "./theme-toggle";
import { Package } from "lucide-react"; // Example icon (you can replace it)
import { handleSignOut } from "@/app/actions/authActions";

// Updated handleLogout function
const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  try {
    // Redirect to home page after signing out
    await handleSignOut();
  } catch (error) {
    console.error("Logout failed", error);
  }
  window.location.reload();
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 lg:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Icon and Title */}
          <Package className="h-6 w-6 text-primary" />{" "}
          {/* Replace Package with your icon */}
          <h1 className="text-xl font-semibold">InvyPro</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&dpr=2&q=80"
                    alt="Profile"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <span onClick={handleLogout}>
              <DropdownMenuItem >
              
                Log out
              </DropdownMenuItem>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
