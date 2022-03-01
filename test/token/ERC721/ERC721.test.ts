import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC721Mock, ERC721ReceiverMock } from "typechain-types";

const firstTokenId = 1337;
const secondTokenId = 420;
const nonExistentTokenId = 13;

describe("ERC721", async () => {
  let token: ERC721Mock;
  let invalidReceiver: ERC721Mock;
  let validReceiver: ERC721ReceiverMock;
  const zero = ethers.constants.AddressZero;
  let owner: SignerWithAddress;
  let newOwner: SignerWithAddress;
  let approved: SignerWithAddress;
  let anotherApproved: SignerWithAddress;
  let operator: SignerWithAddress;
  let other: SignerWithAddress;

  before(async () => {
    [owner, newOwner, approved, anotherApproved, operator, other] =
      await ethers.getSigners();
  });

  beforeEach(async () => {
    const ERC721Mock = await ethers.getContractFactory("ERC721Mock");
    token = await ERC721Mock.deploy();
    invalidReceiver = await ERC721Mock.deploy();
    const ERC721ReceiverMock = await ethers.getContractFactory(
      "ERC721ReceiverMock"
    );
    validReceiver = await ERC721ReceiverMock.deploy();

    await token.mint(owner.address, firstTokenId);
    await token.mint(owner.address, secondTokenId);
  });

  describe("balanceOf", () => {
    it("returns the amount of tokens owned by the given address", async () => {
      expect(await token.balanceOf(owner.address)).to.equal(2);
    });

    it("returns 0", async () => {
      expect(await token.balanceOf(other.address)).to.equal(0);
    });

    it("reverts when querying the 0 address", async () => {
      await expect(token.balanceOf(zero)).to.be.revertedWith(
        "BalanceQueryForZeroAddress()"
      );
    });
  });

  describe("ownerOf", () => {
    it("returns the owner of a given token ID", async () => {
      expect(await token.ownerOf(firstTokenId)).to.equal(owner.address);
    });

    it("reverts when querying a non-existent token ID", async () => {
      await expect(token.ownerOf(nonExistentTokenId)).to.be.revertedWith(
        "NonExistent()"
      );
    });
  });

  describe("transfers", () => {
    const tokenId = firstTokenId;
    const data = "0x42";

    beforeEach(async function () {
      await token.approve(approved.address, tokenId);
      await token.setApprovalForAll(operator.address, true);
    });

    describe("transferFrom", () => {
      context("when called by the owner", () => {
        it("transfers the ownership of the given token ID to the given address", async function () {
          await token.transferFrom(owner.address, other.address, tokenId);
          expect(await token.ownerOf(tokenId)).to.be.equal(other.address);
        });

        it("emits a transfer event", async function () {
          expect(
            await token.transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Transfer")
            .withArgs(owner.address, other.address, tokenId);
        });

        it("clears the approval for the token ID", async function () {
          await token.transferFrom(owner.address, other.address, tokenId);
          expect(await token.getApproved(tokenId)).to.be.equal(zero);
        });

        it("emits an approval event", async function () {
          expect(
            await token.transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Approval")
            .withArgs(zero, other.address, tokenId);
        });

        it("adjusts owners balances", async function () {
          expect(await token.balanceOf(owner.address)).to.be.equal(2);
          expect(await token.balanceOf(other.address)).to.be.equal(0);
          await token.transferFrom(owner.address, other.address, tokenId);
          expect(await token.balanceOf(owner.address)).to.be.equal(1);
          expect(await token.balanceOf(other.address)).to.be.equal(1);
        });
      });

      context("when called by the approved individual", () => {
        it("transfers the ownership of the given token ID to the given address", async function () {
          await token
            .connect(approved)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.ownerOf(tokenId)).to.be.equal(other.address);
        });

        it("emits a transfer event", async function () {
          expect(
            await token
              .connect(approved)
              .transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Transfer")
            .withArgs(owner.address, other.address, tokenId);
        });

        it("clears the approval for the token ID", async function () {
          await token
            .connect(approved)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.getApproved(tokenId)).to.be.equal(zero);
        });

        it("emits an approval event", async function () {
          expect(
            await token
              .connect(approved)
              .transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Approval")
            .withArgs(zero, other.address, tokenId);
        });

        it("adjusts owners balances", async function () {
          expect(await token.balanceOf(owner.address)).to.be.equal(2);
          expect(await token.balanceOf(other.address)).to.be.equal(0);
          await token
            .connect(approved)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.balanceOf(owner.address)).to.be.equal(1);
          expect(await token.balanceOf(other.address)).to.be.equal(1);
        });
      });

      context("when called by the operator", () => {
        it("transfers the ownership of the given token ID to the given address", async function () {
          await token
            .connect(operator)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.ownerOf(tokenId)).to.be.equal(other.address);
        });

        it("emits a transfer event", async function () {
          expect(
            await token
              .connect(operator)
              .transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Transfer")
            .withArgs(owner.address, other.address, tokenId);
        });

        it("clears the approval for the token ID", async function () {
          await token
            .connect(operator)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.getApproved(tokenId)).to.be.equal(zero);
        });

        it("emits an approval event", async function () {
          expect(
            await token
              .connect(operator)
              .transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Approval")
            .withArgs(zero, other.address, tokenId);
        });

        it("adjusts owners balances", async function () {
          expect(await token.balanceOf(owner.address)).to.be.equal(2);
          expect(await token.balanceOf(other.address)).to.be.equal(0);
          await token
            .connect(operator)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.balanceOf(owner.address)).to.be.equal(1);
          expect(await token.balanceOf(other.address)).to.be.equal(1);
        });
      });

      context("when called by the owner without an approved user", () => {
        beforeEach(async () => {
          await token.approve(zero, tokenId);
        });

        it("transfers the ownership of the given token ID to the given address", async function () {
          await token
            .connect(operator)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.ownerOf(tokenId)).to.be.equal(other.address);
        });

        it("emits a transfer event", async function () {
          expect(
            await token
              .connect(operator)
              .transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Transfer")
            .withArgs(owner.address, other.address, tokenId);
        });

        it("clears the approval for the token ID", async function () {
          await token
            .connect(operator)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.getApproved(tokenId)).to.be.equal(zero);
        });

        it("emits an approval event", async function () {
          expect(
            await token
              .connect(operator)
              .transferFrom(owner.address, other.address, tokenId)
          )
            .to.emit(token, "Approval")
            .withArgs(zero, other.address, tokenId);
        });

        it("adjusts owners balances", async function () {
          expect(await token.balanceOf(owner.address)).to.be.equal(2);
          expect(await token.balanceOf(other.address)).to.be.equal(0);
          await token
            .connect(operator)
            .transferFrom(owner.address, other.address, tokenId);
          expect(await token.balanceOf(owner.address)).to.be.equal(1);
          expect(await token.balanceOf(other.address)).to.be.equal(1);
        });
      });

      context("when sent to the owner", () => {
        it("keeps ownership of the token", async function () {
          await token.transferFrom(owner.address, owner.address, tokenId);
          expect(await token.ownerOf(tokenId)).to.be.equal(owner.address);
        });

        it("emits a transfer event", async function () {
          expect(
            await token.transferFrom(owner.address, owner.address, tokenId)
          )
            .to.emit(token, "Transfer")
            .withArgs(owner.address, owner.address, tokenId);
        });

        it("clears the approval for the token ID", async function () {
          await token.transferFrom(owner.address, owner.address, tokenId);
          expect(await token.getApproved(tokenId)).to.be.equal(zero);
        });

        it("emits an approval event", async function () {
          expect(
            await token.transferFrom(owner.address, owner.address, tokenId)
          )
            .to.emit(token, "Approval")
            .withArgs(zero, owner.address, tokenId);
        });

        it("adjusts owners balances", async function () {
          expect(await token.balanceOf(owner.address)).to.be.equal(2);
          await token.transferFrom(owner.address, owner.address, tokenId);
          expect(await token.balanceOf(owner.address)).to.be.equal(2);
        });
      });

      it("should revert when previous owner is incorrect", async () => {
        await expect(
          token.transferFrom(other.address, other.address, tokenId)
        ).to.be.revertedWith("NotAuthorized()");
      });

      it("should revert when the sender is not authorized", async () => {
        await expect(
          token
            .connect(other)
            .transferFrom(owner.address, other.address, tokenId)
        ).to.be.revertedWith("NotAuthorized()");
      });

      it("should revert when the given token ID does not exist", async () => {
        await expect(
          token.transferFrom(owner.address, other.address, nonExistentTokenId)
        ).to.be.revertedWith("NonExistent()");
      });

      it("should revert when transferring to the zero address", async () => {
        await expect(
          token.transferFrom(owner.address, zero, tokenId)
        ).to.be.revertedWith("InvalidRecipient()");
      });
    });

    describe("safeTransferFrom", () => {
      it("transfers to ERC721 receiver", async function () {
        await token.functions["safeTransferFrom(address,address,uint256)"](
          owner.address,
          validReceiver.address,
          tokenId
        );
        expect(await token.ownerOf(tokenId)).to.be.equal(validReceiver.address);
      });

      it.skip("should revert when transferring to unsafe recipient", async () => {
        await expect(
          token.functions["safeTransferFrom(address,address,uint256)"](
            owner.address,
            invalidReceiver.address,
            tokenId
          )
        ).to.be.revertedWith("NotAuthorized()");
      });

      it("transfers to ERC721 receiver", async function () {
        await token.functions[
          "safeTransferFrom(address,address,uint256,bytes)"
        ](owner.address, validReceiver.address, tokenId, data);
        expect(await token.ownerOf(tokenId)).to.be.equal(validReceiver.address);
      });

      it.skip("should revert when transferring to unsafe recipient", async () => {
        await expect(
          token.functions["safeTransferFrom(address,address,uint256,bytes)"](
            owner.address,
            invalidReceiver.address,
            tokenId,
            data
          )
        ).to.be.revertedWith("NotAuthorized()");
      });
    });
  });

  describe("burning", () => {
    const tokenId = firstTokenId;

    it("adjusts the balance of the owner", async () => {
      expect(await token.balanceOf(owner.address)).to.equal(2);
      await token.burn(tokenId);
      expect(await token.balanceOf(owner.address)).to.equal(1);
    });

    it("emits a burn event", async () => {
      expect(await token.burn(tokenId))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, zero, tokenId);
    });

    it("reverts when burning a non-existent token", async () => {
      await expect(token.burn(nonExistentTokenId)).to.be.revertedWith(
        "NonExistent()"
      );
    });

    it("clears the approval for the token ID", async function () {
      await token.burn(tokenId);
      await expect(token.getApproved(nonExistentTokenId)).to.be.revertedWith(
        "NonExistent()"
      );
    });

    it("emits an approval event", async function () {
      expect(await token.burn(tokenId))
        .to.emit(token, "Approval")
        .withArgs(zero, zero, tokenId);
    });
  });
});
