import { Details } from "components/Details";
import { Header } from "components/Header";
import { Section } from "components/Section";
import { ToggleChain } from "components/ToggleChain";
import { Transact } from "components/Transact";
import { FC } from "react";
import classes from "styles/App.module.scss";

const App: FC = () => {
  return (
    <>
      <Header />
      <Section innerClassName={classes.details}>
        <Details />
        <ToggleChain />
      </Section>
      <Transact />
    </>
  );
};

export default App;
