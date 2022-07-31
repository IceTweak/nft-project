import { Tpunks__factory } from "#types/factories/Tpunks__factory";
import { Tpunks } from "#types/Tpunks";
import { ethers } from "hardhat";

async function main() {
  const nftFactory: Tpunks__factory = await ethers.getContractFactory("Tpunks");

  /**  Start deployment, returning a promise
   * that resolves to a contract object
   */
  const nftContract: Tpunks = await nftFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to address:", nftContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
