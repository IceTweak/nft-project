import { StarWarsNft__factory } from "#types/factories/StarWarsNft__factory";
import { StarWarsNft } from "#types/StarWarsNft";
import { ethers } from "hardhat";

async function main() {
  const nftFactory: StarWarsNft__factory = await ethers.getContractFactory(
    "StarWarsNft",
  );

  // Start deployment, returning a promise that resolves to a contract object
  const nftContract: StarWarsNft = await nftFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to address:", nftContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
