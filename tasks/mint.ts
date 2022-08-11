import { task } from "hardhat/config";
import { getContract } from "./helpers";

task("mint", "Mints from the NFT contract")
  .addParam("address", "The address to receive a token")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("Tpunks", hre);
    if (contract) {
      for (let i = 1; i <= 45; i++) {
        const transactionResponse = await contract.mintNFT(
          taskArguments.address,
          {
            gasLimit: 500_000,
          },
        );
        console.log(`Transaction Hash: ${transactionResponse.hash}`);
      }
    }
  });
