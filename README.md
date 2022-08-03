# NFT (ERC721 token) creation project

This repository includes an example implementation of a non-fungible token contract which uses ERC721 standard.
Base conrtract code inherited from OpenZeppelin implementation of [ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.2/contracts/token/ERC721/ERC721.sol) and [Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.2/contracts/access/Ownable.sol) Solidity 

### Contract deployment

This smart contract has been deployed to the Rinkeby testnet (I use [Alchemy API](https://dashboard.alchemyapi.io/) for that).
Project also uses [HardHat](https://hardhat.org/) environment for deploy and work with contract instances.
Deployment occurs by executing the following command

```bash
npx hardhat run ./deploy/Conrtact.ts --network rinkeby
```
