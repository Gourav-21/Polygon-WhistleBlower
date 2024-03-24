import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths:{
    artifacts:"../next-frontend/src/artifacts"
  },
  networks:{
    matic:{
      url:"https://polygon-mumbai.g.alchemy.com/v2/QuRKdyLAQm9CbmtyQ6IDirTwadluB3Yv",
      accounts:["91b2ebce2607265ce6cc6c8e80a78ccf32b509b5c7cc803e69af2407a0d2f3bf"],
    }
  }
};

export default config;
