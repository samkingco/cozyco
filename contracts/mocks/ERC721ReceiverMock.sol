//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.10;

import "../token/ERC721.sol";

contract ERC721ReceiverMock is ERC721, ERC721TokenReceiver {
    constructor() ERC721("Mock ERC721", "MOCK721") {}

    function tokenURI(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://mock.token/", id));
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return ERC721TokenReceiver.onERC721Received.selector;
    }
}
