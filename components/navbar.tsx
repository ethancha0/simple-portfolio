'use client';

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Ethan Chao", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Curations", href: "/curations" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full items-stretch gap-6 py-8">
      <nav className="flex flex-col">
        {NAV_ITEMS.map(({ label, href }) => {
          const active = isActivePath(pathname, href);

          return (
            <Link
              key={href}
              variant="h5"
              href={href}
              sx={{
                color: active ? "text.secondary" : "common.white",
                "&:hover": { color: "#4ade80" },
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "white",
          borderRightWidth: 1,
          alignSelf: "stretch",
        }}
      />
    </div>
  );
}
