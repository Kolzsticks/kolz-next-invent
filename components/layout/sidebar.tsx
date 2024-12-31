'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderArchive,
  Image as ImageIcon,
  Users,
  FileText,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

const sidebarLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/sales/add', icon: ShoppingCart, label: 'Add Sale' },
  { href: '/sales', icon: ShoppingCart, label: 'Manage Sales' },
  { href: '/products/add', icon: Package, label: 'Add Product' },
  { href: '/products', icon: Package, label: 'Manage Products' },
  { href: '/categories', icon: FolderArchive, label: 'Categories' },
  { href: '/media', icon: ImageIcon, label: 'Media Library' },
  { href: '/users', icon: Users, label: 'User Management' },
  { href: '/reports', icon: FileText, label: 'Reports' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'h-screen border-r bg-card text-muted-foreground transition-all duration-300',
        isCollapsed ? 'w-[60px]' : 'w-[240px]'
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {!isCollapsed && (
          <span className="font-bold text-lg">Admin Panel</span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 p-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center space-x-3 rounded-md p-2 text-sm font-medium transition-all duration-200',
              pathname === link.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted hover:text-foreground'
            )}
          >
            <link.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer (Optional) */}
      {!isCollapsed && (
        <div className="absolute bottom-4 w-full px-2">
          <Button variant="ghost" size="sm" className="w-full">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
