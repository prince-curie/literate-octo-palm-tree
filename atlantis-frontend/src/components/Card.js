
import { useContext } from "react";
import Loading from "./Helper/Loading"
import { ConnectionContext } from "./contexts/HandleConnection";

function Card() {
  const { totalSupply, totalDistributed, doSomthing, loading, totalReceivers} = useContext(ConnectionContext)
 
  doSomthing()
  return (
    <div className="menu-card">
      <div className="card">
        <h4>Total Bonus</h4>
        <p>{totalSupply}</p>
        <p>ALT-TOKEN</p>
      </div>
      <div className="card">
        <h4>TOTAL SENT</h4>
        {loading && <Loading />}
        <p>{totalDistributed}%</p>
      </div>
      <div className="card">
        <h4>TOTAL CLAIMED</h4>
        <p>{totalReceivers}</p>
      </div>
    </div>
  );
}

export default Card;
