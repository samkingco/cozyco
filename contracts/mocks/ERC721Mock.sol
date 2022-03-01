//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.10;

import "../token/ERC721.sol";

contract ERC721Mock is ERC721 {
    constructor() ERC721("Mock ERC721", "MOCK721") {}

    function tokenURI(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://mock.token/", id));
    }

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }
}
