import React, {useContext, useState} from 'react';
import {ethers} from 'ethers'
import contractAbi from './contractABI.json'
import { etherContext } from './contexts/EtherProvider';


function AddAdminForm() {
    const [walletAddress, setWalletAddress] = useState('');
    const CONTRACT_ADDRESS = "0xE61Cb4f798d2Df3B7202a93Cf4364b2D367e5F15";
    const { provider } = useContext(etherContext)



    const handleAddAddress = async () => {
       
        ///don't do anything if wallet address is empty
        if(!walletAddress){return}
        console.log(walletAddress)

        try {
            const {ethereum} = window;
            if(ethereum) {
                
                const signer = provider.getSigner()
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

                let response = await contract.addAdmin(walletAddress);
                console.log("New admin added, response: ", response);
                setWalletAddress("")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
    }


    const handleRemoveAddress = async (e) => {
        if(!walletAddress){return}
    
        
        if(provider){
            const {ethereum} = window;

            try {
                if(ethereum) {
                    const signer = provider.getSigner()
                    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
                    let response = await contract.removeAdmin(walletAddress);
                    console.log("Admin removed, response: ", response);
                    setWalletAddress("")
                }
            } catch (error) {
                console.log(error)
            }

        } else {
          console.log("not connected")
         
        }
    }


    return (
        <div className='admin-section'>
           <div className="only-admin">
               <h4>ADMIN</h4>
               <p>Only an admin can add or delete an address on theis platform</p>
           </div>
           <div className="addAdmin-form">
           <h4>ADDRESS</h4>
        
           <form className="admin-form" onSubmit={handleSubmit}>
           
           <input
            className='address-input'
            type="text"
            value={walletAddress}
            placeholder="enter wallet address"
            required
            onChange={e => setWalletAddress(e.target.value)}
            />
           <div className="form-buttons">
           <button style={{ "color":"#FFD4D4", "backgroundColor":"#C61717"}} className="remove-admin-button" onClick={handleRemoveAddress} type="submit">
                    Remove Admin
            </button>
           <button style={{ "color":"white", "backgroundColor":"#5B7AB7"}} className="add-admin-button" onClick={handleAddAddress} type="submit">
                    Add Admin
            </button>
            </div>
           </form>
        
        
           </div>
        </div>
    )

}

export default AddAdminForm