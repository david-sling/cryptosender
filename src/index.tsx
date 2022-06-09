import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "styles/index.scss";
import { WalletProvider } from "context/wallet";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
