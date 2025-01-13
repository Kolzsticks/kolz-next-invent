"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Cloud,
  Users,
  BarChart2,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const sidebarLinks = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    color: "text-blue-500",
  },
  {
    label: "Products",
    icon: Package,
    color: "text-purple-500",
    children: [
      { href: "/products", label: "Manage Products" },
      { href: "/products/add", label: "Add Product" },
    ],
  },
  {
    label: "User Management",
    icon: Users,
    color: "text-orange-500",
    children: [
      { href: "/users/manage", label: "Manage Users" },
      { href: "/users/add", label: "Add Users" },
    ],
  },
  {
    label: "Sales",
    icon: ShoppingCart,
    color: "text-green-500",
    children: [
      { href: "/sales/manage", label: "Manage Sales" },
      { href: "/sales/add", label: "Add Sales" },
    ],
  },
  {
    href: "/categories",
    icon: Layers,
    label: "Categories",
    color: "text-red-500",
  },
  {
    href: "/media",
    icon: Cloud,
    label: "Media Library",
    color: "text-yellow-500",
  },
  {
    href: "/reports",
    icon: BarChart2,
    label: "Reports",
    color: "text-teal-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsCollapsed(mobile); // Collapse on mobile, expand on larger screens
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (isMobile) setIsCollapsed(true);
  };

  const toggleDropdown = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div
      className={`h-screen flex flex-col border-r bg-card text-muted-foreground transition-all duration-300 ${
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
        {!isCollapsed && <span className="text-lg font-bold">Admin Panel</span>}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-2">
        {sidebarLinks.map((link) =>
          link.children ? (
            <div key={link.label} className="space-y-1">
              <button
                onClick={() => toggleDropdown(link.label)}
                className={`flex w-full items-center space-x-3 rounded-md p-2 text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith(
                    link.children.find((child) => child.href)?.href || ""
                  )
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-blue-600/20 "
                }`}
              >
                <link.icon className={`h-5 w-5 shrink-0 ${link.color}`} />
                {!isCollapsed && <span>{link.label}</span>}
                {!isCollapsed && (
                  <span className="ml-auto">
                    {expandedItems[link.label] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
              </button>
              {!isCollapsed && expandedItems[link.label] && (
                <div className="ml-8 border-l-2 border-muted pl-4 space-y-1 transition-all duration-300">
                  {link.children.map((child) => (
                    <Link
                      prefetch={true}
                      key={child.href}
                      href={child.href}
                      onClick={handleLinkClick}
                      className={`block rounded-md p-2 text-sm font-medium transition-all duration-200 ${
                        pathname === child.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-blue-600/20 "
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              prefetch={true}
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 rounded-md p-2 text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-blue-600/20 "
              }`}
            >
              <link.icon className={`h-5 w-5 shrink-0 ${link.color}`} />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
