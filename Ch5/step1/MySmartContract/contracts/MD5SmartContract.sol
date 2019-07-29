pragma solidity ^0.5.0;
contract MD5SmartContract {
  bytes32 public signature;
  event signEvent(bytes32 signature);
  constructor() public {
  }
  function sign(string memory document) public {
    signature = sha256(bytes(document));
    emit signEvent(signature);
  }
}
