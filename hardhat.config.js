require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PVT_KEY]
    },
    ganache: {
      url: 'http://127.0.0.1:7545', // Replace with the Ganache network URL (by default, Ganache runs on http://127.0.0.1:7545)
      accounts: [process.env.PVT_KEY]
    }
  }
};