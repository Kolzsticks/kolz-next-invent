"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderArchive,
  Image as ImageIcon,
  Users,
  FileText,
  Menu,
  BarChart2,
  PlusCircle,
  Layers,
  Cloud,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/sales/add", icon: PlusCircle, label: "Add Sale" },
  { href: "/sales", icon: ShoppingCart, label: "Manage Sales" },
  { href: "/products/add", icon: Package, label: "Add Product" },
  { href: "/products", icon: Package, label: "Manage Products" },
  { href: "/categories", icon: Layers, label: "Categories" },
  { href: "/media", icon: Cloud, label: "Media Library" },
  { href: "/users", icon: Users, label: "User Management" },
  { href: "/reports", icon: BarChart2, label: "Reports" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed
  const [isMobile, setIsMobile] = useState(false); // Track if the device is mobile

  useEffect(() => {
    // Check if the device is mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLinkClick = () => {
    // Collapse the sidebar only on mobile
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  return (
    <div
      className={`h-full flex flex-col border-r bg-card text-muted-foreground transition-all duration-300 ${
        isCollapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Header text visibility */}
        {!isCollapsed && <span className="text-lg font-bold">Admin Panel</span>}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 rounded-md p-2 text-sm font-medium transition-all duration-200 ${
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-foreground"
            }`}
          >
            <link.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer (Fixed to the bottom) */}
      <div className="mt-auto px-2 pb-4">
        <Button
          variant="default"
          size="sm"
          className="w-full rounded-md bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
