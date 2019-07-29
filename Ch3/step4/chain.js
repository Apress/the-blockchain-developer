let Block =  require("./block.js").Block,
    BlockHeader =  require("./block.js").BlockHeader,
    moment = require("moment"),
    CryptoJS = require("crypto-js"),
    level = require('level'),
    fs = require('fs'),
    db;

let createDb = (peerId) => {
    let dir = __dirname + '/db/' + peerId;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        db = level(dir);
        storeBlock(getGenesisBlock());
    }
}

let getGenesisBlock = () => {
    let blockHeader = new BlockHeader(1, null, "0x1bc3300000000000000000000000000000000000000000000", moment().unix());
    return new Block(blockHeader, 0, null);
};

let getLatestBlock = () => blockchain[blockchain.length-1];

let addBlock = (newBlock) => {
    let prevBlock = getLatestBlock();
    if (prevBlock.index < newBlock.index && newBlock.blockHeader.previousBlockHeader === prevBlock.blockHeader.merkleRoot) {
        blockchain.push(newBlock);
        storeBlock(newBlock);
    }
}

let storeBlock = (newBlock) => {
    db.put(newBlock.index, JSON.stringify(newBlock), function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        console.log('--- Inserting block index: ' + newBlock.index);
    })
}

let getDbBlock = (index, res) => {
    db.get(index, function (err, value) {
        if (err) return res.send(JSON.stringify(err));
        return(res.send(value));
    });
}

let getBlock = (index) => {
    if (blockchain.length-1 >= index)
        return blockchain[index];
    else
        return null;
}

let blockchain = [getGenesisBlock()];

const generateNextBlock = (txns) => {
    const prevBlock = getLatestBlock(),
        prevMerkleRoot = prevBlock.blockHeader.merkleRoot;
    nextIndex = prevBlock.index + 1,
        nextTime = moment().unix(),
        nextMerkleRoot = CryptoJS.SHA256(1, prevMerkleRoot, nextTime).toString();

    const blockHeader = new BlockHeader(1, prevMerkleRoot, nextMerkleRoot, nextTime);
    const newBlock = new Block(blockHeader, nextIndex, txns);
    blockchain.push(newBlock);
    storeBlock(newBlock);
    return newBlock;
};

if (typeof exports != 'undefined' ) {
    exports.addBlock = addBlock;
    exports.getBlock = getBlock;
    exports.blockchain = blockchain;
    exports.getLatestBlock = getLatestBlock;
    exports.generateNextBlock = generateNextBlock;
    exports.createDb = createDb;
    exports.getDbBlock = getDbBlock;
}
