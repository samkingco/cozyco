export default [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "partNumber",
        "type": "uint256"
      }
    ],
    "name": "getSupplySVGPart",
    "outputs": [
      {
        "internalType": "string",
        "name": "part",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sku",
        "type": "uint256"
      }
    ],
    "name": "tokenURIForSKU",
    "outputs": [
      {
        "internalType": "string",
        "name": "tokenBase64",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
