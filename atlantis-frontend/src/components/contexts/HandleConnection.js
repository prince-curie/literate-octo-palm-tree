import React, { createContext, useState, useContext } from "react";
import { ethers } from "ethers"
import contractAbi from '../contractABI.json'
import atlantisContractAbi from "../atlantisContractABI.json"
import { etherContext } from './EtherProvider';
export const ConnectionContext = createContext();

function  HandleConnection(props) {
const {provider} = useContext(etherContext)
  const [totalSupply, setTotalSupply] = useState(0)
  const [loading, setLoading] = useState(false)
  const [totalDistributed, setTotalDistributed] = useState(0)
  const [totalReceivers, setTotalRecievers] = useState(0)
  const CONTRACT_ADDRESS = "0x037482A45b5EFf8FA80A5a0Bb35Be90C0deC6965"
  const ATLANTIS_CONTRACT = "0x120960e9E5B7d15eb5913e1E873bB19238bB1ab6"
  
  const doSomthing = async () => {
    if(provider){

        try {
          const {ethereum} = window;
          if(ethereum) {
              
              const signer = provider.getSigner()
              const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
              const atlantisContract = new ethers.Contract(ATLANTIS_CONTRACT, atlantisContractAbi.abi, signer);

              //total supply
              // console.log(atlantisContract)
              let totalSupply = await atlantisContract.totalSupply()
              let totalSup = ethers.utils.formatEther(totalSupply.toString())
              setTotalSupply(totalSup)
              
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
            
              setTotalRecievers(totalR)
              ///listering for an event on the contract
            try{
                contract.on("DistributionComplete", (numberOfReceivers, amount) => {
                console.log(numberOfReceivers)
                console.log(amount)
                setLoading(prevState => !prevState)
                
              })
            } catch {
              console.log("no event emitted")
            }
          }
      } catch (error) {
          console.log(error)
      }

    } else {
      console.log("not connected")
     
    }
  }
  return (
    <ConnectionContext.Provider value={{ totalSupply, totalDistributed, doSomthing, loading, totalReceivers }}>
      {props.children}
    </ConnectionContext.Provider>
  );
}

export default HandleConnection;
