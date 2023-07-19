require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/c66841626ba049a89a3bda5edf5bb634",
      accounts: ["8809a2e134cfb473f57e319289ec9d007253e9ef0863fb76437d842937abb803"]
    },
    ganache: {
      url: 'http://127.0.0.1:7545', // Replace with the Ganache network URL (by default, Ganache runs on http://127.0.0.1:7545)
      accounts: ['your mnemonic here']
  }
};