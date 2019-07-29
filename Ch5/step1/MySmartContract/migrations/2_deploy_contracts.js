const HelloWorldContract = artifacts.require("HelloWorldContract.sol");

module.exports = function (deployer) {
    deployer.deploy(HelloWorldContract);
};