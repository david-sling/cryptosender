import { Logo } from "assets";
import { FC } from "react";
import classes from "styles/components/Header.module.scss";
import { Section } from "components/Section";

export const Header: FC = () => {
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
        <button className={classes.connect}>Connect wallet</button>
      </div>
    </Section>
  );
};
