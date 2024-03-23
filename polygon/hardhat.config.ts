import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths:{
    artifacts:"../next-frontend/src/artifacts"
  }
};

export default config;
