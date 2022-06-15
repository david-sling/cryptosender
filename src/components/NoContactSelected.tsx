import { Logo } from "assets";
import { FC } from "react";
import classes from "styles/components/NoContactSelected.module.scss";

export const NoContactSelected: FC = () => (
  <div className={classes.container}>
    <div className={classes.logo}>
      <Logo />
      <div className={[classes.ripple, classes.r1].join(" ")} />
      <div className={[classes.ripple, classes.r2].join(" ")} />
    </div>
    <h2 className={classes.text}>Select a contact to Cryptosend</h2>
  </div>
);
