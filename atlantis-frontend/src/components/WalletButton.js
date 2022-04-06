
import React, { useContext} from "react";

import { etherContext } from "./contexts/EtherProvider";

function WalletButton() {
  const { handleConnection, provider } = useContext(etherContext);


   

  return (
    <div className="wallet-button">
    <button onClick={handleConnection}>{provider ? "CONNECTED" : "CONNECT WALLECT"}</button>
    </div>
  );
}

export default WalletButton;
