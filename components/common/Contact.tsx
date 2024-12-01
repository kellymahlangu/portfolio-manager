"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/app/_actions/contact";
import { useToast } from "@/hooks/use-toast";
import { TiThumbsOk } from "react-icons/ti";
import { FaRegFaceSadTear } from "react-icons/fa6";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSubmited = await submitContact({ name, email, subject, message });
    toast(
      isSubmited
        ? {
            title: "Thank You for Reaching Out!",
            description:
              "Your message has been successfully sent. I’ll get back to you as soon as possible. Have a great day!",
            action: <TiThumbsOk className="w-20 h-20" />,
          }
        : {
            variant: "destructive",
            title: "Oops! Something Went Wrong.",
            description:
              "There was an error submitting your information. Please try again or check your internet connection.",
            action: <FaRegFaceSadTear className="w-20 h-20" />,
          }
    );
  };

  return (
    <div className="w-1/2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="subject">Subject (Optional)</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="min-h-[150px]"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
