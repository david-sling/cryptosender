import { Linker } from "assets";
import { blockexplorer } from "config/constants";
import { useWallet } from "context/wallet";
import { ethers } from "ethers";
import { FC } from "react";
import classes from "styles/components/TransactionModal.module.scss";

interface Props {
  selectedContacts: {
    amount: number;
    nickname: string;
    address: string;
    isSelected?: boolean | undefined;
  }[];
  transactionReciepts: Record<
    string,
    ethers.providers.TransactionReceipt | undefined
  >;
  onClose: () => void;
}

export const TransactionModal: FC<Props> = ({
  selectedContacts,
  transactionReciepts,
  onClose,
}) => {
  const numberOfTransactions = selectedContacts.length;
  const numberOfSuccess = Object.values(transactionReciepts).filter(
    (i) => i
  ).length;
  const numberOfFailures = numberOfTransactions - numberOfSuccess;

  const transactionResult =
    numberOfFailures === numberOfTransactions
      ? "failure"
      : numberOfSuccess === numberOfTransactions
      ? "success"
      : "partial";

  const { isMatic } = useWallet();
  return (
    <>
      <div
        className={[classes.container, classes[transactionResult]].join(" ")}
      >
        {transactionResult === "failure" ? (
          <h1>
            Oops! Your transactions <span>failed</span>
          </h1>
        ) : transactionResult === "success" ? (
          <h1>
            Wohoo! Your transactions were <span>successful</span>
          </h1>
        ) : (
          <h1>
            Some of your transactions <span>failed</span>
          </h1>
        )}
        <div className={classes.transactionsWrapper}>
          <div className={classes.transactions}>
            {selectedContacts.map((contact) => (
              <div className={classes.transactionWrapper}>
                <div
                  key={contact.address}
                  className={[
                    classes.transaction,
                    transactionReciepts[contact.address]
                      ? classes.success
                      : classes.failure,
                  ].join(" ")}
                >
                  <div>
                    <p className={classes.nickname}>{contact.nickname}</p>
                    <p className={classes.address}>{contact.address}</p>
                  </div>
                  <div className={classes.message}>
                    Transaction{" "}
                    {transactionReciepts[contact.address]
                      ? "Success"
                      : "Failed"}
                  </div>
                </div>
                <div className={classes.linkWrapper}>
                  {transactionReciepts[contact.address]?.transactionHash && (
                    <a
                      href={(isMatic
                        ? blockexplorer.matic
                        : blockexplorer.ropsten)(
                        transactionReciepts[contact.address]?.transactionHash ||
                          ""
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={classes.link}>
                        <Linker />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onClose} className={classes.continue}>
          Continue
        </button>
      </div>
    </>
  );
};
