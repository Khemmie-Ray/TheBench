"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Seek", href: "/seek" },
  { name: "Assessor", href: "/assessor" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dy7el0ucd/image/upload/v1765131242/tb-mark_bcrtkz.svg"
            alt=""
            width={50}
            height={50}
          />
          <p className="hidden lg:block md:block font-bold ">TheBench</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex items-center gap-2 mb-8">
                <Image
                  src="https://res.cloudinary.com/dy7el0ucd/image/upload/v1765131242/tb-mark_bcrtkz.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <p>TheBench</p>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 text-base font-medium transition-colors hover:text-primary ${
                      pathname === link.href
                        ? "text-foreground"
                        : "text-foreground/70"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-6 pt-6 border-t">
                  <Button className="w-full">Connect Wallet</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

         
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/70"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
