import { Logo } from "assets";
import { useWallet } from "context/wallet";
import classes from "styles/components/UnsupportedChainModal.module.scss";
import { changeChain } from "utils";

export const UnsupportedChainModal = () => {
  const { currentChain } = useWallet();
  if (currentChain) return null;
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Logo width={140} height={200} />
        </div>
        <div className={classes.content}>
          <div className={classes.exclamation}>
            <p>!</p>
          </div>
          <div className={classes.error}>
            You are not connected to a supported chain, try these
          </div>
          <div className={classes.buttons}>
            <button onClick={() => changeChain(80001)}>Polygon Mumbai</button>
            <button onClick={() => changeChain(3)}>Ethereum Rinkeby</button>
          </div>
        </div>
      </div>
    </>
  );
};
