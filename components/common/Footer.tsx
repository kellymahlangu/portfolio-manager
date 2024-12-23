"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-6 px-4 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm">
            © {currentYear} Your Name | Tagline or Slogan
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://linkedin.com" className="hover:text-primary">
            <FaLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com" className="hover:text-primary">
            <FaGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://twitter.com" className="hover:text-primary">
            <FaXTwitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
