"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PrivacyPolicyDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Privacy Policy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Privacy Policy
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> December 25, 2024
            </p>

            <section>
              <h2 className="text-lg font-semibold">Introduction</h2>
              <p>
                Your privacy is important to me. This Privacy Policy outlines
                how I collect, use, and protect your information when you visit
                my website. By using my site, you agree to the terms outlined in
                this policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Information I Collect</h2>
              <p>
                When you use my website, I may collect the following personal
                information:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Contact Details: Name, email address, phone number, or any
                  other information you provide through my contact form.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                How I Use Your Information
              </h2>
              <p>I collect your contact details for the following purposes:</p>
              <ul className="list-disc list-inside ml-4">
                <li>To respond to your inquiries or messages.</li>
                <li>
                  To communicate about services or projects if you reach out to
                  me.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                Information Sharing and Disclosure
              </h2>
              <p>
                I value your privacy and will not share, sell, or rent your
                personal information to third parties. I may disclose your
                information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>To comply with legal obligations or requests.</li>
                <li>To protect the rights and safety of my users or others.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Data Security</h2>
              <p>
                I take reasonable measures to protect your personal information
                from unauthorized access, disclosure, alteration, or
                destruction. However, no method of transmission over the
                Internet or electronic storage is completely secure, and I
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Access the personal information I hold about you.</li>
                <li>Request corrections to your personal information.</li>
                <li>Request the deletion of your personal information.</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact me at
                contact@kellymahlangu.co.za .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Third-Party Links</h2>
              <p>
                My website may contain links to third-party websites. I am not
                responsible for the privacy practices or content of these sites.
                Please review their privacy policies before providing any
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                Changes to This Privacy Policy
              </h2>
              <p>
                I may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated &quot;Effective Date.&quot; I
                encourage you to review this policy periodically to stay
                informed.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Contact Me</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact me at:
              </p>
              <address className="mt-2 not-italic">
                Kelly Mahlangu
                <br />
                contact@kellymahlangu.co.za
                <br />
                063 552 1576
              </address>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
