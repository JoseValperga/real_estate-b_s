// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RealEstateShares {
    string public propertyName;
    uint256 public totalShares;
    uint256 public pricePerShare;
    uint256 public sharesSold;
    address public owner;

    mapping(address => uint256) public sharesOwned;

    event SharesPurchased(address indexed buyer, uint256 amount);

    constructor(
        string memory _propertyName,
        uint256 _totalShares,
        uint256 _pricePerShare
    ) {
        require(bytes(_propertyName).length > 0, "Property name required");
        require(_totalShares > 0, "Total shares must be greater than 0");
        require(_pricePerShare > 0, "Price per share must be greater than 0");

        propertyName = _propertyName;
        totalShares = _totalShares;
        pricePerShare = _pricePerShare;
        owner = msg.sender;
    }

    function buyShares(uint256 shareAmount) external payable {
        require(shareAmount > 0, "Share amount must be greater than 0");
        require(sharesSold + shareAmount <= totalShares, "Not enough shares available");
        require(msg.value == shareAmount * pricePerShare, "Incorrect ETH amount sent");

        sharesSold += shareAmount;
        sharesOwned[msg.sender] += shareAmount;

        emit SharesPurchased(msg.sender, shareAmount);
    }

    function getRemainingShares() external view returns (uint256) {
        return totalShares - sharesSold;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        payable(owner).transfer(balance);
    }
}