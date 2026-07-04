"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Main Menu" },
    { href: "/continue", label: "Continue" },
    { href: "/new-game", label: "New Game" },
    { href: "/settings", label: "Settings" },
    { href: "/credits", label: "Credits" },
  ];

  return (
    <header className="absolute top-0 left-0 w-full p-6 z-50">
      <nav className="flex items-center space-x-6 text-sm font-medium tracking-wide">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors hover:text-foreground",
              pathname === link.href ? "text-foreground font-semibold" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
