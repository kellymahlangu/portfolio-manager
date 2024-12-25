"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
// import { ReactComponent as FullLogo} from './../../public/logo-full.svg';
import { useTheme } from "next-themes";

type headerInfo = {
  title: string;
  hasExp: boolean;
};

// interface HeaderProps {
//   name: string;
//   logo: React.JSX.Element | null;
// }

export function Header({ hasExp }: headerInfo) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoLink = `https://kellymahlangu.sirv.com/portfolio/logo-full_${
    theme === "light" ? "light" : "dark"
  }.svg`;

  return (
    <header className="z-50 shadow-sm fixed w-screen backdrop-blur-md bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="#home" className="flex items-center">
              <img
                src={logoLink}
                className="h-64 w-64"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href="#about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#skills"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Projects
                  </Link>
                </li>
                {hasExp && (
                  <li>
                    <Link
                      href="#exp"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Experiance
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    href="#contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
