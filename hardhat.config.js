require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_SEPOLIA_RPC =
  "https://eth-sepolia.g.alchemy.com/v2/ws8MSG_ngHJux7SoFIm880yTbZuvElml";
const NEXT_PUBLIC_PRIVATE_KEY =
  "3038e6efb1a52463c6146b0e733ab67a37cbc7f0c06202df31b745993b573547";

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: NEXT_PUBLIC_SEPOLIA_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};
