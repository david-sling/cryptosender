import { Add, BTCsymbol, Check, Trash } from "assets";
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
    amount,
    setAmount,
    selectedContacts,
    changeSplitAmount,
    summationSelected,
  } = useContacts();

  console.log({ amount });

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
        <div className={classes.sender}>
          <div className={classes.box}>
            <div className={classes.amount}>
              <div>
                <div className={classes.input}>
                  <BTCsymbol className={classes.symbol} />
                  <input
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    type="number"
                  />
                </div>
                <p className={classes.balance}>
                  Balance:{" "}
                  <span className={classes.sym}>
                    <BTCsymbol height={15} width={13} />
                  </span>
                  0000
                </p>
              </div>
              <div
                className={[
                  classes.status,
                  amount === summationSelected
                    ? classes.ready
                    : amount < summationSelected
                    ? classes.exceeding
                    : classes.remaining,
                ].join(" ")}
              >
                <p className={classes.text}>
                  {amount === summationSelected ? (
                    "Ready to send"
                  ) : (
                    <>
                      <BTCsymbol
                        className={classes.sym}
                        height={20}
                        width={18}
                      />
                      {Math.abs(amount - summationSelected)}{" "}
                      {amount < summationSelected ? "exceeding" : "remaining"}
                    </>
                  )}
                </p>
                <div className={classes.progress}>
                  <div
                    style={{ width: `${(summationSelected * 100) / amount}%` }}
                    className={classes.bar}
                  />
                </div>
              </div>
            </div>
            <div className={classes.split}>
              {selectedContacts.map((contact) => (
                <div className={classes.selectedContact} key={contact.address}>
                  <div>
                    <p className={classes.nickname}>{contact.nickname}</p>
                    <p className={classes.address}>{contact.address}</p>
                  </div>
                  <div className={classes.splitAmount}>
                    <BTCsymbol className={classes.sym} width={20} height={20} />
                    <input
                      onChange={(e) =>
                        changeSplitAmount(
                          contact.address,
                          parseFloat(e.target.value)
                        )
                      }
                      type="number"
                      value={contact.amount}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
