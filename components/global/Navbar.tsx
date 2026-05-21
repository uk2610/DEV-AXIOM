"use client";

import { BrainCircuit, ChevronDown, LogIn, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropdown";

interface NavLink {
  title: string;
  href?: string;
}

export const NAVLINKS: NavLink[] = [
  { title: "Features", href: "/#features" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Testimonials", href: "/#testimonials" },
  { title: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes (navigation occurs)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-white/10 text-white backdrop-blur-xl ${isOpen ? "bg-[#05060a]/95" : "bg-[#05060a]/82"}`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1250px] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-white text-black">
              <BrainCircuit className="size-5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Axiom Interview AI</span>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            <NavMenu />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex">
            <AuthBtns />
          </div>
          <Link
            href="/interview"
            className="hidden h-9 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-black transition hover:bg-cyan-100 md:inline-flex"
          >
            <Sparkles className="size-4" />
            Get Started
          </Link>

          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={toggleMenu}
            className="text-white hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            <ChevronDown
              className={`h-[1.2rem] w-[1.2rem] ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
            />
          </Button>
        </div>

        {/* Mobile menu dropdown - absolutely positioned */}
        <div
          className={`absolute top-full right-0 left-0 rounded-b-2xl border-b border-white/10 bg-[#05060a]/96 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden ${isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          style={{
            // maxHeight: isOpen ? '500px' : '0',
            overflow: "hidden",
          }}
        >
          <div className="mx-auto max-w-[1250px] px-4 py-4 md:px-6">
            <MobileNavMenu onItemClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5 text-sm font-medium">
      {NAVLINKS.map((item) => {
        const isActive = item.href && pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href || "#"}
            className={`rounded-md px-2.5 py-1.5 transition-colors ${isActive
                ? "bg-white/10 text-white font-semibold"
                : "text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileNavMenu({ onItemClick }: { onItemClick: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-1">
      {NAVLINKS.map((item, index) => {
        const isActive = item.href && pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href || "#"}
            onClick={onItemClick}
            className={`block rounded-md px-3 py-3 text-base font-medium transition-all duration-200 ${isActive
                ? "bg-white/10 text-white font-semibold"
                : "text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
            style={{
              animationDelay: `${index * 50}ms`,
              opacity: 0,
              transform: "translateY(10px)",
              animation: `slideInUp 0.3s ease-out ${index * 50}ms forwards`,
            }}
          >
            {item.title}
          </Link>
        );
      })}
      <div className="flex gap-2 py-1 md:hidden">
        <div className="flex-1" />

        <AuthBtns />
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const AuthBtns = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <div className="h-8 w-16 animate-pulse rounded-md bg-white/10"></div>
      </div>
    );
  }

  const user = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  };

  return (
    <div className="items-center gap-2">
      {session ? (
        <ProfileDropdown user={user} />
      ) : (
        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white transition hover:bg-white/10"
        >
          <LogIn className="size-4" />
          Login
        </Link>
      )}
    </div>
  );
};
