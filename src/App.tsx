import { Details } from "components/Details";
import { Header } from "components/Header";
import { Section } from "components/Section";
import { ToggleChain } from "components/ToggleChain";
import { Transact } from "components/Transact";
import { FC } from "react";
import classes from "styles/App.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App: FC = () => {
  return (
    <>
      <Header />
      <Section innerClassName={classes.details}>
        <Details />
        <ToggleChain />
      </Section>
      <Transact />
      <ToastContainer theme="colored" />
    </>
  );
};

export default App;
