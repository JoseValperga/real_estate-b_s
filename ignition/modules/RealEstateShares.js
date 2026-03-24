const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RealEstateSharesModule", (m) => {
  const propertyName = "RoyalCity Tower";
  const totalShares = 100;
  const pricePerShare = m.getParameter("pricePerShare", "10000000000000000"); // 0.01 ETH en wei

  const realEstateShares = m.contract("RealEstateShares", [
    propertyName,
    totalShares,
    pricePerShare,
  ]);

  return { realEstateShares };
});