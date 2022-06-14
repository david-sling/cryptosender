import {
  Add,
  ArrowDown,
  BTClogo,
  BTCsymbol,
  Check,
  ETHlogo,
  ETHsymbol,
  POLYlogo,
  Send,
  Trash,
} from "assets";
import { ERC20Tokens } from "config/constants";
import { useWallet } from "context/wallet";
import { useContacts } from "hooks/useContacts";
import { Token } from "interfaces";
import { useState } from "react";
import { useMemo } from "react";
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
  const { currentChain, isMatic } = useWallet();

  const [selectedToken, setSelectedToken] = useState("ETH");
  const [isTokenSelectOpen, setIsTokenSelectOpen] = useState(false);

  const SelectedTokenLogo = useMemo(
    () =>
      selectedToken === "ETH"
        ? isMatic
          ? POLYlogo
          : ETHlogo
        : ERC20Tokens.find((token) => token.symbol === selectedToken)?.Logo ||
          (isMatic ? POLYlogo : ETHlogo),
    [selectedToken, isMatic]
  );

  const selectedTokenDetails = useMemo<Token>(
    () =>
      ERC20Tokens.find((token) => token.symbol === selectedToken) || {
        Icon: ETHsymbol,
        Logo: isMatic ? POLYlogo : ETHlogo,
        address: {},
        name: isMatic ? "MATIC" : "Ethereum",
        symbol: "ETH",
      },
    [selectedToken, isMatic]
  );

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
          <div className={classes.menu}>
            <div className={classes.coinSelect}>
              <div
                onClick={() => setIsTokenSelectOpen((p) => !p)}
                className={classes.clickable}
              >
                <SelectedTokenLogo />
                <ArrowDown className={classes.arrow} />
              </div>
              {isTokenSelectOpen && (
                <div className={classes.drop}>
                  {currentChain && (
                    <div
                      onClick={() => {
                        setSelectedToken(currentChain.symbol);
                        setIsTokenSelectOpen(false);
                      }}
                      className={classes.token}
                    >
                      <currentChain.Logo />
                      <div className={classes.text}>
                        <h3>{currentChain.currency}</h3>
                        <p>{currentChain.symbol}</p>
                      </div>
                    </div>
                  )}
                  {ERC20Tokens.map((token) => (
                    <div
                      onClick={() => {
                        setSelectedToken(token.symbol);
                        setIsTokenSelectOpen(false);
                      }}
                      className={classes.token}
                    >
                      <token.Logo />
                      <div className={classes.text}>
                        <h3>{token.name}</h3>
                        <p>{token.symbol}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className={classes.send}>
              <p>Send</p>
              <div className={classes.icon}>
                <Send />
              </div>
            </button>
          </div>
          <div className={classes.box}>
            <div className={classes.amount}>
              <div>
                <div className={classes.input}>
                  <selectedTokenDetails.Icon className={classes.symbol} />
                  <input
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    type="number"
                  />
                </div>
                <p className={classes.balance}>
                  Balance:{" "}
                  <span className={classes.sym}>
                    <selectedTokenDetails.Icon height={15} width={13} />
                  </span>
                  0000
                </p>
              </div>
              <div
                className={[
                  classes.status,
                  amount > 0
                    ? amount === summationSelected
                      ? classes.ready
                      : amount < summationSelected
                      ? classes.exceeding
                      : classes.remaining
                    : classes.exceeding,
                ].join(" ")}
              >
                <p className={classes.text}>
                  {amount > 0 ? (
                    amount === summationSelected ? (
                      "Ready to send"
                    ) : (
                      <>
                        <selectedTokenDetails.Icon
                          className={classes.sym}
                          height={20}
                          width={18}
                        />
                        {Math.abs(amount - summationSelected)}{" "}
                        {amount < summationSelected ? "exceeding" : "remaining"}
                      </>
                    )
                  ) : (
                    "Amount should be greater than 0"
                  )}
                </p>
                {amount > 0 && (
                  <div className={classes.progress}>
                    <div
                      style={{
                        width: `${(summationSelected * 100) / amount}%`,
                      }}
                      className={classes.bar}
                    />
                  </div>
                )}
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
                    <selectedTokenDetails.Icon
                      className={classes.sym}
                      width={20}
                      height={20}
                    />
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
