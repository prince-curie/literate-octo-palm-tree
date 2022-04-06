import Loading from "./Helper/Loading"

function Card() {
  return (
    <div className="menu-card">
      <div className="card">
        <h4>Total Bonus</h4>
        <p>5,000</p>
        <p>ALT-TOKEN</p>
      </div>
      <div className="card">
        <h4>TOTAL SENT</h4>
        <Loading />
        <p>40%</p>
      </div>
      <div className="card">
        <h4>TOTAL CLAIMED</h4>
        <p>3000/5k</p>
      </div>
    </div>
  );
}

export default Card;
