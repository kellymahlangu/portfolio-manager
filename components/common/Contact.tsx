"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { submitContact } from "@/app/actions";
import { PrivacyPolicyDialog } from "../privacy-policy-dialog";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    atm: true,
  });
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log(`{id: ${e.target.id}, value: ${e.target.value}}`);
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSubmited = await submitContact(formData);
    if (isSubmited) {
      toast.success(
        "You request has been submited and you'll be contacted as soon as possible"
      );
    } else {
      toast.error(
        "An Error has occured please try again, if error persists reload page or verify internet access"
      );
    }
  };

  return (
    <>
      <div className="w-1/2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleTextChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleTextChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject (Optional)</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleTextChange}
              required
              className="min-h-[150px]"
            />
          </div>
          <Button type="submit">Submit</Button>
          <p>
            By submitting this form, you consent to receive marketing messages
            in accordance with the <PrivacyPolicyDialog />.
          </p>
        </form>
      </div>
    </>
  );
}
