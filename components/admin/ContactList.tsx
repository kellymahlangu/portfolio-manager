"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteContact, getContacts, updateContact } from "@/app/admin/actions";

export default function ContactList() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  const handleUpdateContact = async (id: string, data: Partial<Contact>) => {
    const updatedContact = await updateContact(id, data);
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    router.refresh();
  };

  const handleDeleteContact = async (id: string) => {
    await deleteContact(id);
    setContacts(contacts.filter((contact) => contact.id !== id));
    router.refresh();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contacts</h3>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </Button>
            </div>
            <p className="mb-2">
              <strong>Subject:</strong> {contact.subject || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Message:</strong> {contact.message}
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`responded-${contact.id}`}
                checked={contact.responded}
                onCheckedChange={(checked) =>
                  handleUpdateContact(contact.id, {
                    responded: checked as boolean,
                  })
                }
              />
              <label htmlFor={`responded-${contact.id}`}>Responded</label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id={`subscribed-${contact.id}`}
                checked={contact.isSubscribed}
                onCheckedChange={(checked) =>
                  handleUpdateContact(contact.id, {
                    isSubscribed: checked as boolean,
                  })
                }
              />
              <label htmlFor={`subscribed-${contact.id}`}>Subscribed</label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
