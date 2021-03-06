export default [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "name",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "size",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "degradation",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "supplySkus",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "supplyCoords",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Quilt",
        "name": "quilt",
        "type": "tuple"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "tokenBase64",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "gasUsed",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "supplySkus",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "supplyCoords",
        "type": "uint256[]"
      }
    ],
    "name": "validateQuiltLayout",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
];
