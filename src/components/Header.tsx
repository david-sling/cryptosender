import { Logo } from "assets";
import { FC } from "react";
import classes from "styles/components/Header.module.scss";
import { Section } from "components/Section";
import { useWallet } from "context/wallet";

export const Header: FC = () => {
  const { connect, account } = useWallet();
  return (
    <Section className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.logo}>
          <Logo />
          <div className={classes.text}>
            <h1>Cryptosender</h1>
            <p>by David Sling</p>
          </div>
        </div>
        {account ? (
          <div className={classes.connected}>
            <div className={classes.dot} />
            <p>Connected</p>
          </div>
        ) : (
          <button onClick={connect} className={classes.connect}>
            Connect wallet
          </button>
        )}
      </div>
    </Section>
  );
};
