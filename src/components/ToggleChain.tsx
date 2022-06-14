import { useWallet } from "context/wallet";
import classes from "styles/components/ToggleChain.module.scss";
import { changeChain } from "utils";

export const ToggleChain = () => {
  const { isMatic } = useWallet();

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <div
          onClick={() => changeChain(3)}
          className={[
            classes.option,
            isMatic ? classes.inactive : classes.active,
          ].join(" ")}
        >
          <div className={classes.text}>
            <p>Ethereum</p>
            <p>Ethereum</p>
          </div>
        </div>
        <div
          onClick={() => changeChain(80001)}
          className={[
            classes.option,
            isMatic ? classes.active : classes.inactive,
          ].join(" ")}
        >
          <div className={classes.text}>
            <p>Polygon</p>
            <p>Polygon</p>
          </div>
        </div>
      </div>
      <div
        className={[
          classes.toggler,
          isMatic ? classes.matic : classes.polygon,
        ].join(" ")}
      ></div>
    </div>
  );
};
