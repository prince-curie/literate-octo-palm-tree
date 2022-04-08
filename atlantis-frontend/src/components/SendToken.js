import { useContext } from "react"
import { CustomersContext } from "./contexts/CustomersAddressProvider"
import { etherContext } from "./contexts/EtherProvider"
import contractABI from "./contractABI.json"

function SendToken(){
    const {excelAddress} = useContext(CustomersContext)
    const {provider} = useContext(etherContext)
    const sendHandle = async() => {
        if(provider){
            const signer = await provider.getSigner()
    
        //the amount and the address are here excelAddress.data.address or excelAddress.data.amount
        console.log(excelAddress)
        console.log(contractABI)
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