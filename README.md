# ERC-20 Token Deployment using Hardhat

This repository contains a simple ERC-20 smart contract and a Hardhat deployment script to deploy the contract to the Ethereum network. The ERC-20 contract allows for the creation and management of a basic fungible token, which can be used for various purposes, including tokenizing assets, creating digital currencies, and facilitating decentralized applications.
<br />
<br />
## Prerequisites

To deploy the ERC-20 contract, you need the following software and tools:

1. [Node.js](https://nodejs.org) (version 12 or above)
2. [Hardhat](https://hardhat.org/) (installed globally)
3. [Ganache](https://www.trufflesuite.com/ganache) (for local development and testing)
<br />
<br />
## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-erc20-project.git
cd your-erc20-project
```

2. Install project dependencies:
```bash
npm install
```

3. Configure Ganache:

Download and install Ganache from https://www.trufflesuite.com/ganache.
Run Ganache and set up a new workspace.
<br />
<br />
## ERC-20 Contract
The ERC-20 smart contract is located in the contracts folder. The contract is named TokenContract.sol, and it includes the standard functions for ERC-20 tokens, such as retrieving total supply, balance of tokens for an address, transferring tokens, approving token spending, and more.
<br />
<br />
## Deployment Instructions
1. Compile the smart contract:
```bash
npx hardhat compile
```

2. Create a '.env' file in the project root folder and paste your account private key and infura key in the key value form which is indicated in the '.env.example' file
```bash 
PVT_KEY = Paste your account private key here
INFURA_KEY = Paste your infura key here
``` 

3. Deploy the ERC-20 contract to the Ethereum network:
```bash
npx hardhat run scripts/deploy.js --network ganache
```

4. The deployment script will execute, and once completed, you will see the address of the deployed contract displayed in the console.

5. Here is the link of the deployed smart contract and transactions on 
[etherscan](https://goerli.etherscan.io/address/0xd2a2b4771589bdd0c452898d3507b2b3a0e96636) (on goerli network)
<br />
<br />
## Testing
You can also run tests to ensure the ERC-20 contract functions as expected:


```bash
npx hardhat test
```
The test suite will execute, and you should see the results of the tests in the console.
<br />
<br />
## License
This smart contract is licensed under the MIT License.
