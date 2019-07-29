/*
 * Copyright 2018 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

let logger = require('../logger');

function Wallet(options) {
    this.options = options;
}

Wallet.DETAILS = {
    alias: 'w',
    description: 'wallet',
    commands: ['create'],
    options: {
        create: Boolean
    },
    shorthands: {
        c: ['--create']
    },
    payload: function(payload, options) {
        options.start = true;
    },
};

Wallet.prototype.run = function() {
    let instance = this,
        options = instance.options;

    if (options.create) {
        instance.runCmd('curl http://localhost:' + options.argv.original[2] + '/getWallet');
    }
};

Wallet.prototype.runCmd = function(cmd) {
    const { exec } = require('child_process');
    logger.log(cmd);
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            logger.log(`err: ${err}`);
            return;
        }
        logger.log(`stdout: ${stdout}`);
    });
};

exports.Impl = Wallet;
