import { Add, Check, Trash } from "assets";
import { useContacts } from "hooks/useContacts";
import { FC } from "react";
import classes from "styles/components/Transact.module.scss";
import { Section } from "./Section";

export const Transact: FC = () => {
  const {
    contacts,
    toggleSelect,
    isEditingContacts,
    toggleEditContacts,
    newContactBinder,
    newContact,
    addContact,
    deleteContact,
  } = useContacts();
  return (
    <Section className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.contacts}>
          <div className={classes.head}>
            <h2>Contacts</h2>
            <p className={classes.edit} onClick={toggleEditContacts}>
              {isEditingContacts ? "Save" : "Edit"}
            </p>
          </div>
          <div className={classes.list}>
            {contacts.map(({ nickname, address, isSelected }) => (
              <div
                key={address}
                className={[
                  classes.contact,
                  isSelected && !isEditingContacts
                    ? classes.selected
                    : classes.deselected,
                ].join(" ")}
                onClick={
                  isEditingContacts ? undefined : () => toggleSelect(address)
                }
              >
                <div>
                  <p className={classes.nickname}>{nickname}</p>
                  <p className={classes.address}>
                    {address.slice(0, 6)}...
                    {address.slice(address.length - 8, address.length)}
                  </p>
                </div>
                {isEditingContacts ? (
                  <Trash
                    onClick={() => deleteContact(address)}
                    className={classes.trash}
                  />
                ) : (
                  isSelected && <Check />
                )}
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addContact();
              }}
              className={[classes.contact, classes.newContact].join(" ")}
            >
              <div>
                <input
                  className={classes.nickname}
                  type="text"
                  placeholder="Add Contact"
                  {...newContactBinder("nickname")}
                />
                <input
                  className={classes.address}
                  type="text"
                  placeholder={newContact.nickname ? "Add Address" : ""}
                  {...newContactBinder("address")}
                />
              </div>
              {newContact.address && newContact.nickname && (
                <button className={classes.addBtn} type="submit">
                  <Add />
                </button>
              )}
            </form>
          </div>
        </div>
        <div className={classes.sender}></div>
      </div>
    </Section>
  );
};
