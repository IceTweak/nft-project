// SPDX-License-Identifier: ISC
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ERC721 Token implementation
contract StarWarsNft is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("StarWars NFT", "SW") {}

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);

        return newItemId;
    }

    /// @dev Changes baseURI to ipfs directory with tokens properties
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs//linkToMyBase";
    }
}
