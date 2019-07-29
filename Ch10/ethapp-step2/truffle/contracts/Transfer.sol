pragma solidity ^0.5.0;

contract Transfer {
  address payable from;
  address payable to;

  constructor() public {
    from = msg.sender;
  }

  event Pay(address _to, address _from, uint amt);

  function pay( address payable _to ) public payable returns (bool) {
      to = _to;
      to.transfer(msg.value);
      emit Pay(to, from, msg.value);
      return true;
  }
}
