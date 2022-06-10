import { Details } from "components/Details";
import { Header } from "components/Header";
import { Section } from "components/Section";
import { FC } from "react";
import classes from "styles/App.module.scss";

const App: FC = () => {
  return (
    <>
      <Header />
      <Section innerClassName={classes.details}>
        <Details />
      </Section>
    </>
  );
};

export default App;
