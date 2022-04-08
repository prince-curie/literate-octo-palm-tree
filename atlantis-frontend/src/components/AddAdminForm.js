import React, {useContext, useState} from 'react';
import {ethers} from 'ethers'
import contractAbi from './contractABI.json'
import { etherContext } from './contexts/EtherProvider';


function AddAdminForm() {
    const [walletAddress, setWalletAddress] = useState('');
    const CONTRACT_ADDRESS = ""
    const { provider } = useContext(etherContext)
    const handleAddAddress = async () => {
        console.log(walletAddress)
        ///don't do anything if wallet address is empty
        if(!walletAddress){return}

        try {
            const {ethereum} = window;
            if(ethereum) {
                
                const signer = provider.getSigner()
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

                await contract.addAdmin(walletAddress);
                console.log("New admin added");
                setWalletAddress("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleRemoveAddress = (e) => [
        
        console.log(walletAddress)
    ]

    return (
        <div className='admin-section'>
           <div className="only-admin">
               <h4>ADMIN</h4>
               <p>only an admin can add or delete an address on theis platform</p>
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
           <button style={{ "color":"white", "backgroundColor":"darkRed"}} className="remove-admin-button" onClick={handleRemoveAddress} type="submit">
                    Remove Admin
            </button>
           <button style={{ "color":"white", "backgroundColor":"lightBlue"}} className="add-admin-button" onClick={handleAddAddress} type="submit">
                    Add Admin
            </button>
            </div>
           </form>
        
        
           </div>
        </div>
    )

}

export default AddAdminForm