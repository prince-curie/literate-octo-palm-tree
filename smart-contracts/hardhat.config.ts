import dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
    solidity: {
        version: "0.8.4", 
        settings: {
            outputSelection: {
                "*": {
                "*": ["storageLayout"]
                }
            }
        }
    },
    // defaultNetwork: "rinkeby",
    // networks: {
    //     hardhat: {},
    //     rinkeby: {
    //         url: API_URL,
    //         accounts: [`0x${PRIVATE_KEY}`]
    //     },
    // },
    // etherscan: {
    //     apiKey: ETHERSCAN_API_KEY
    // }
};