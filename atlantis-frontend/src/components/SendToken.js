import { useContext } from "react"
import { CustomersContext } from "./contexts/CustomersAddressProvider"
import { etherContext } from "./contexts/EtherProvider"
import contractAbi from "./contractABI.json"
import {ethers} from 'ethers'
function SendToken(){
    const {excelAddress} = useContext(CustomersContext)
    const {provider} = useContext(etherContext)
    const CONTRACT_ADDRESS = "0x037482A45b5EFf8FA80A5a0Bb35Be90C0deC6965"
    const sendHandle = async() => {
        if(provider){
            try {
                const {ethereum} = window;
                if(ethereum) {
                    const address  = excelAddress.data.map(({address, amount}) => {
                        return address
                    })
                    const amount  = excelAddress.data.map(({address, amount}) => {
                        return amount
                    })
                    // const amount = excelAddress.data["amount"]
                    const signer = provider.getSigner()
                    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
                    console.log( address[0])
                    console.log(amount[0])
                    // console.log(contract)
                    let response = await contract.distributeToken(address[0], amount[0]);
                    console.log(response)
                 
                }
            } catch (error) {
                console.log(error)
            }
        //the amount and the address are here excelAddress.data.address or excelAddress.data.amount
 
        }else {
            console.log("Not connected")
        }
    }
return(
    <div>
        <button onClick={sendHandle} className="send-token-button">Send Token</button>
    </div>
)
}

export default SendToken