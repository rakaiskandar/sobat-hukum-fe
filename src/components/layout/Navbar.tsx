"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import AppIcon from "../AppIcon";

const mainNavbar = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Our Lawyer",
    href: "/our-lawyer",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="">
      {/* Navbar Header */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <AppIcon />

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {mainNavbar.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`block py-2 px-3 rounded transition-all ${
                  isActive
                    ? "text-blue-500 font-semibold hover:text-blue-600"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="w-auto"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="w-auto"
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 py-4 mt-2">
          <div className="flex flex-col items-start px-4">
            {mainNavbar.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block w-full py-2 px-3 rounded transition-all ${
                    isActive
                      ? "text-blue-500 font-semibold hover:text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-4 w-full">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/login");
                }}
                variant="default"
                className="w-full"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/register");
                }}
                variant="outline"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
