
import { useContext, useState } from "react";
import { etherContext } from "./contexts/EtherProvider";
import { ethers } from "ethers"
import contractAbi from './contractABI.json'
import Loading from "./Helper/Loading"

function Card() {
  const {provider} = useContext(etherContext)
  const [totalDistributed, setTotalDistributed] = useState(0)
  const [totalReceivers, setTotalRecievers] = useState(0)
  const CONTRACT_ADDRESS = "0x037482A45b5EFf8FA80A5a0Bb35Be90C0deC6965"
  
  const doSomthing = async () => {
    if(provider){

        try {
          const {ethereum} = window;
          if(ethereum) {
              
              const signer = provider.getSigner()
              const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

              console.log(contract)
              
              //total distributed
              let totalDistributed = await contract.totalDistributed()
              //converting big number
              let totalD = ethers.utils.formatEther(totalDistributed.toString());
              console.log(totalD, "total distributed")
              setTotalDistributed(totalD)
              //total recieved
              let totalReceivers = await contract.totalReceivers()
              //converting big number
              const totalR = ethers.utils.formatEther(totalReceivers.toString());
              console.log(totalR, "total received")
              setTotalRecievers(totalR)
              ///listering for an event on the contract
              // contract.on("DistributionComplete", (numberOfReceivers, amount) => {
              //   console.log(numberOfReceivers)
              //   console.log(amount)
              // })
          }
      } catch (error) {
          console.log(error)
      }

    } else {
      console.log("not connected")
     
    }
  }
  doSomthing()
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
        <p>{totalDistributed}%</p>
      </div>
      <div className="card">
        <h4>TOTAL CLAIMED</h4>
        <p>3000/5k</p>
      </div>
    </div>
  );
}

export default Card;
