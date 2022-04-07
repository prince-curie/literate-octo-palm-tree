import React, {useState} from 'react';
import {ethers} from 'ethers'
import contractAbi from './contractABI.json'


function AddAdminForm() {
    const [walletAddress, setWalletAddress] = useState('');
    const CONTRACT_ADDRESS = ""

    const handleSubmit = async () => {
        // don't do anything if wallet address is empty
        if(!walletAddress){return}

        try {
            const {ethereum} = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

                await contract.addAdmin(walletAddress);
                console.log("New admin added");
                setWalletAddress("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='addAdmin-form'>
            <input
            className='address-input'
            type="text"
            value={walletAddress}
            placeholder="enter wallet address"
            onChange={e => setWalletAddress(e.target.value)}
            />
            <button className='submitAdmin-button' onClick={handleSubmit}>
                    Add Admin
            </button>
        
        </div>
    )

}

export default AddAdminForm