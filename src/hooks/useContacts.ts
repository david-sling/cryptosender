import { Contact } from "interfaces";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useContacts = () => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);
  const [newContact, setNewContact] = useState<Contact>({
    address: "",
    nickname: "",
  });
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [splitEqual, setSplitEqual] = useState(true);
  const [amount, setAmount] = useState(0);
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

  const [selectedContacts, setSelectedContacts] = useState<
    {
      amount: number;
      nickname: string;
      address: string;
      isSelected?: boolean | undefined;
    }[]
  >([]);

  useEffect(() => {
    setSelectedContacts((p) => {
      const selected = contacts.filter(({ isSelected }) => isSelected);
      return selected.map((contact) => ({
        ...contact,
        amount: splitEqual
          ? amount / selected.length
          : p.find((c) => c.address === contact.address)?.amount || 0,
      }));
    });
  }, [contacts, amount, splitEqual]);

  const summationSelected = useMemo(
    () => selectedContacts.reduce((acc, curr) => acc + curr.amount, 0),
    [selectedContacts]
  );

  const changeSplitAmount = (address: string, split: number) => {
    setSelectedContacts((p) =>
      p.map((c) => (c.address === address ? { ...c, amount: split } : c))
    );
    if (splitEqual) setSplitEqual(false);
  };

  const toggleSelect = (address: string) =>
    setContacts((p) =>
      p.map((contact) =>
        contact.address === address
          ? { ...contact, isSelected: !contact.isSelected }
          : contact
      )
    );

  const resetTransaction = () => {
    setAmount(0);
    setContacts((p) => p.map((c) => ({ ...c, isSelected: false })));
    setSplitEqual(true);
  };

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
    amount,
    setAmount,
    summationSelected,
    changeSplitAmount,
    resetTransaction,
  };
};
