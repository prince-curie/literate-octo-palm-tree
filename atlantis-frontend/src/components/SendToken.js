import { useContext } from "react"
import { CustomersContext } from "./contexts/CustomersAddressProvider"
import { etherContext } from "./contexts/EtherProvider"

function SendToken(){
    const {excelAddress} = useContext(CustomersContext)
    const {provider} = useContext(etherContext)
    const sendHandle = () => {
        //the amount and the address are here excelAddress.data.address or excelAddress.data.amount
        console.log(excelAddress)
    }
return(
    <div>
        <button onClick={sendHandle} className="send-token-button">Send Token</button>
    </div>
)
}

export default SendToken