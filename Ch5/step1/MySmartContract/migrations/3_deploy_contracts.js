const MD5SmartContract = artifacts.require("MD5SmartContract.sol");

module.exports = function (deployer) {
    deployer.deploy(MD5SmartContract);
};