"use client";

import { FaGithub, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PrivacyPolicyDialog } from "../privacy-policy-dialog";
import Link from "next/link";
import { MailIcon } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bottom-0 flex justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm">
            © {currentYear} Kelly Mahlangu | Better Code For All
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          {/* <a href="https://linkedin.com" className="hover:text-primary">
            <FaLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a> */}

          <Link href="tel:+27635221576" className="hover:text-primary">
            <FaPhone className="h-5 w-5" />
            <span className="sr-only">Phone</span>
          </Link>
          <Link href="mailto:contact@kellymahlangu.co.za">
            <MailIcon className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            target="_blank"
            href="https://wa.me/+27635221576/?text=Let's%20connect%20about%20your%20idea"
            className="hover:text-primary"
          >
            <FaWhatsapp className="h-5 w-5" />
            <span className="sr-only">WhatsApp</span>
          </Link>
          <Link
            target="_blank"
            href="https://github.com/kellymahlangu"
            className="hover:text-primary"
          >
            <FaGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            target="_blank"
            href="https://x.com/KellyMahlanguSA?t=e_OC9xpfJSmaqX09Zf24OQ&s=09"
            className="hover:text-primary"
          >
            <FaXTwitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <PrivacyPolicyDialog />
        </div>
      </div>
    </footer>
  );
}
