import { useWallet } from "context/wallet";
import { FC } from "react";
import classes from "styles/components/Details.module.scss";

export const Details: FC = () => {
  const { account, currentChain, balance } = useWallet();
  return (
    <div className={classes.container}>
      <h2>User Details</h2>
      {account ? (
        <table>
          <tr>
            <th>Wallet Address</th>
            <td>{account}</td>
          </tr>
          <tr>
            <th>Network</th>
            <td>{currentChain?.name}</td>
          </tr>
          <tr>
            <th>Balance</th>
            <td>
              {balance} {currentChain?.currency || "ETH"}
            </td>
          </tr>
        </table>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
};
