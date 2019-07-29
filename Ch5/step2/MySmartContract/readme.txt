To compile and interact with these Contracts. Ensure "ganache" and "truffle" are installed globally on your machine.
Then, open four terminals and run these commands;
1) > ganache-cli -p 8584
2) > truffle compile
3) > truffle migrate --reset
4) > truffle console --network development
    truffle(development)> HelloWorldContract.deployed().then(_app => { hello = _app })
    undefined
    truffle(development)> hello.greet()
    'Hello World'
    truffle(development)> MD5SmartContract.deployed().then(_app => { doc = _app })
    undefined
    truffle(development)> doc.sign('634ef85e038cea45bd20900fc97e09dc')
    truffle(development)> doc.signature()
    0x7869cd540ff8c3b2635ec87251f361e21ad3c72fbc2f79897b9816bec54b0a48