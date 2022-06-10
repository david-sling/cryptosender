import { Contact } from "interfaces";
import { ChangeEvent, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useContacts = () => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);
  const [newContact, setNewContact] = useState<Contact>({
    address: "",
    nickname: "",
  });
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const newContactBinder = (key: keyof Contact) => ({
    value: newContact[key] as string,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setNewContact({ ...newContact, [key]: e.target.value }),
  });

  const toggleEditContacts = () => setIsEditingContacts((p) => !p);

  const addContact = () => {
    if (!newContact.address || !newContact.nickname) return;
    setContacts((p) => [...p, newContact]);
    setNewContact({ address: "", nickname: "" });
  };

  const deleteContact = (address: string) =>
    setContacts((p) => p.filter((c) => c.address !== address));

  const selectedContacts = useMemo(
    () =>
      contacts
        .filter(({ isSelected }) => isSelected)
        .map((contact) => ({ ...contact, amount: 0 })),
    [contacts]
  );

  const toggleSelect = (address: string) =>
    setContacts((p) =>
      p.map((contact) =>
        contact.address === address
          ? { ...contact, isSelected: !contact.isSelected }
          : contact
      )
    );

  return {
    contacts,
    selectedContacts,
    toggleSelect,
    isEditingContacts,
    toggleEditContacts,
    newContactBinder,
    newContact,
    addContact,
    deleteContact,
  };
};
