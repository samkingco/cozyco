import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { QuiltGeneratorUKR, QuiltsForUkraine } from "typechain-types";

describe("Quilts for Ukraine", () => {
  const zero = ethers.constants.AddressZero;
  let quilts: QuiltsForUkraine;
  let quiltGenerator: QuiltGeneratorUKR;
  let owner: SignerWithAddress;
  let customer: SignerWithAddress;
  let govAddress: SignerWithAddress;
  let daoAddress: SignerWithAddress;

  beforeEach(async () => {
    [owner, customer, govAddress, daoAddress] = await ethers.getSigners();

    const QuiltGeneratorUKR = await ethers.getContractFactory(
      "QuiltGeneratorUKR"
    );
    quiltGenerator = await QuiltGeneratorUKR.deploy();

    const QuiltsForUkraine = await ethers.getContractFactory(
      "QuiltsForUkraine"
    );
    quilts = await QuiltsForUkraine.deploy(
      quiltGenerator.address,
      1337,
      govAddress.address,
      daoAddress.address
    );
  });

  describe("Deployment", () => {
    it("should initialise the contract", async () => {
      expect(await quilts.name()).to.equal("Quilts for Ukraine");
      expect(await quilts.symbol()).to.equal("QLTUKR");
      expect(await quilts.totalSupply()).to.equal(0);
      expect(await quilts.isSaleActive()).to.equal(false);
      expect(await quilts.seedFactor()).to.equal(1337);
      expect(await quilts.donationPayouts(1)).to.eql([
        govAddress.address,
        BigNumber.from(5000),
      ]);
      expect(await quilts.donationPayouts(2)).to.eql([
        daoAddress.address,
        BigNumber.from(5000),
      ]);
    });

    it("should set the correct owner", async () => {
      expect(await quilts.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", () => {
    it("should mint a quilt", async () => {
      await quilts.toggleSale();
      const price = await quilts.MIN_PRICE();
      expect(await quilts.connect(customer).mint(1, { value: price }))
        .to.emit(quilts, "Transfer")
        .withArgs(ethers.constants.AddressZero, customer.address, 1);
      expect(await quilts.balanceOf(customer.address)).to.equal(1);
      expect(await quilts.totalSupply()).to.equal(1);
    });

    it("should mint multiple quilts", async () => {
      await quilts.toggleSale();
      const price = await quilts.MIN_PRICE();
      const numTokens = 5;
      const mintResult = await quilts
        .connect(customer)
        .mint(numTokens, { value: price.mul(numTokens) });

      for (let i = 0; i < numTokens; i++) {
        expect(mintResult)
          .to.emit(quilts, "Transfer")
          .withArgs(ethers.constants.AddressZero, customer.address, i + 1);
      }
      expect(await quilts.balanceOf(customer.address)).to.equal(numTokens);
      expect(await quilts.totalSupply()).to.equal(numTokens);
    });
  });

  describe("payouts", () => {
    it("should set up payouts on deploy", async () => {
      await quilts.toggleSale();
      const price = await quilts.MIN_PRICE();
      const numTokens = 5;
      const startingContractBalance = await quilts.provider.getBalance(
        quilts.address
      );
      const startingGovBalance = await quilts.provider.getBalance(
        govAddress.address
      );
      const startingDAOBalance = await quilts.provider.getBalance(
        daoAddress.address
      );

      await quilts.mint(numTokens, { value: price.mul(numTokens) });
      expect(await quilts.provider.getBalance(quilts.address)).to.equal(
        startingContractBalance.add(price.mul(numTokens))
      );

      await quilts.donateProceeds();
      expect(await quilts.provider.getBalance(govAddress.address)).to.equal(
        startingGovBalance.add(price.mul(numTokens).div(2))
      );
      expect(await quilts.provider.getBalance(daoAddress.address)).to.equal(
        startingDAOBalance.add(price.mul(numTokens).div(2))
      );
    });

    it("should add a new donation address", async () => {
      expect(await quilts.donationPayouts(3)).to.eql([zero, BigNumber.from(0)]);
      await quilts.addDonationAddress(owner.address, 1000);
      expect(await quilts.donationPayouts(3)).to.eql([
        owner.address,
        BigNumber.from(1000),
      ]);
    });

    it("should edit donation shares", async () => {
      expect(await quilts.donationPayouts(1)).to.eql([
        govAddress.address,
        BigNumber.from(5000),
      ]);
      await quilts.editDonationShares(1, 1000);
      expect(await quilts.donationPayouts(1)).to.eql([
        govAddress.address,
        BigNumber.from(1000),
      ]);
    });
  });

  describe("tokenURI", () => {
    it("should fail when trying to get out of bounds token data", async () => {
      await expect(quilts.tokenURI(1)).to.be.revertedWith("NonExistent()");
    });
  });

  describe("Transfers", () => {
    it("should transfer tokens between accounts", async () => {
      await quilts.toggleSale();
      const price = await quilts.MIN_PRICE();

      // Mint 10 tokens to owner
      await quilts.mint(10, { value: price.mul(10) });
      expect(await quilts.balanceOf(owner.address)).to.equal(10);

      // Transfer some tokens
      await quilts.transferFrom(owner.address, customer.address, 1);
      expect(await quilts.balanceOf(customer.address)).to.equal(1);
      expect(await quilts.balanceOf(owner.address)).to.equal(9);
    });
  });
});
