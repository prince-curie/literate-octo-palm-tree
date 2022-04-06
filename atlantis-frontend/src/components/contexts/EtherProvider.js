import React, { createContext, useState } from "react";
import { ethers } from "ethers";
export const etherContext = createContext();
function EtherProvider(props) {
  const [provider, setProvider] = useState(null);
  

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  async function handleConnection() {
    const getProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await requestAccount();
    setProvider(getProvider);

  }
console.log("done")
  return (
    <etherContext.Provider value={{ provider, handleConnection, requestAccount }}>
      {props.children}
    </etherContext.Provider>
  );
}

export default EtherProvider;
