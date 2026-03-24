const hre = require("hardhat");

async function main() {
  const RealEstateShares = await hre.ethers.getContractFactory("RealEstateShares");

  const propertyName = "RoyalCity Tower";
  const totalShares = 100;
  const pricePerShare = hre.ethers.parseEther("0.01");

  const realEstateShares = await RealEstateShares.deploy(
    propertyName,
    totalShares,
    pricePerShare
  );

  await realEstateShares.waitForDeployment();

  console.log("RealEstateShares deployed to:", await realEstateShares.getAddress());
  console.log("Property Name:", await realEstateShares.propertyName());
  console.log("Total Shares:", (await realEstateShares.totalShares()).toString());
  console.log("Price Per Share:", hre.ethers.formatEther(await realEstateShares.pricePerShare()), "ETH");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});