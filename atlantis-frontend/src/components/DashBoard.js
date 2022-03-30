import { useContext, useState } from "react";
import { etherContext } from "./contexts/EtherProvider";

function DashBoard() {
  const [address, setAddress] = useState(null)
  const {provider} = useContext(etherContext)
  const getAddress =async () => {
    if(provider){
      const signer = provider.getSigner()
      const res = await signer.getAddress()
    
      setAddress(res)
    } else {
      console.log("not connected")
    }
  }
  getAddress()
  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h4>DASHBOARD</h4>
        <div className="image">
          <img src="https://icon-library.com/images/admin-user-icon/admin-user-icon-24.jpg" alt="admin"/>
        </div>
       {provider &&  <p className="address">{String(address).slice(0,5)}..{String(address).slice(-5)}</p>}
        <div className="notification">
          <h4>NOTIFICATION</h4>
          <p>Maintenance Request</p>
          <p>The backend would be under Maintenance</p>
          <p>Time: 6pm To 11pm, 24 April, 2022</p>
          <p>Kindly Take Note All Admins</p>
        </div>
        <div className="dashboard-social"></div>
      </div>
    </div>
  );
}

export default DashBoard;
