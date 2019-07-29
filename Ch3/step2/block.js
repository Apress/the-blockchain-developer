/*
 * Copyright 2018 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
exports.BlockHeader = class BlockHeader {
    constructor(version, previousBlockHeader, merkleRoot, time, nBits, nounce) {
        this.version = version; // Version - at the time of writing there are 4 block versions. Version 1 is the genesis block (2009), Version 2 was a soft fork in Bitcoin Core 0.7.0 (2012). Version 3 blocks were a soft fork in Bitcoin Core 0.10.0 (2015). Version 4 blocks are BIP65 in Bitcoin Core 0.11.2 (2015).
        this.previousBlockHeader = previousBlockHeader; // previous block header hash - A SHA256(SHA256()) hash of previous block’s header. Ensures that previous block cannot be changed as this block needs to be changed as well.
        this.merkleRoot = merkleRoot; // merkle root hash - a merkle tree is a binary tree which holds all the hashed pairs of the tree.
        this.time = time; // a Unix epoch time when the miner started hashing the header.
    }
};

exports.Block = class Block {
    constructor(blockHeader, index, txns) {
        this.blockHeader = blockHeader;
        this.index = index; // GenesisBlock is the first block - block 0
        this.txns = txns; // txns is the raw transaction in the block.
    }
}