import { ethers } from "hardhat";

async function main() {
  // Addresses for initial donation splits
  const GOV_ADDRESS = "0x165CD37b4C644C2921454429E7F9358d18A45e14";
  const DAO_ADDRESS = "0x633b7218644b83D57d90e7299039ebAb19698e9C";

  const QuiltGeneratorUKR = await ethers.getContractFactory(
    "QuiltGeneratorUKR"
  );
  const quiltGenerator = await QuiltGeneratorUKR.deploy({
    gasLimit: ethers.BigNumber.from(14253000),
  });
  await quiltGenerator.deployed();
  console.log("Generator deployed to:", quiltGenerator.address);

  const QuiltsForUkraine = await ethers.getContractFactory("QuiltsForUkraine");
  const quiltsForUkraine = await QuiltsForUkraine.deploy(
    quiltGenerator.address,
    1337,
    GOV_ADDRESS,
    DAO_ADDRESS,
    {
      gasLimit: ethers.BigNumber.from(2069000),
    }
  );
  await quiltsForUkraine.deployed();
  console.log("Contract deployed to:", quiltsForUkraine.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
