/*
 * Copyright 2018 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

let logger = require('../logger');

function Block(options) {
    this.options = options;
}

Block.DETAILS = {
    alias: 'b',
    description: 'block',
    commands: ['get', 'all'],
    options: {
        create: Boolean
    },
    shorthands: {
        s: ['--get'],
        a: ['--all']
    },
    payload: function(payload, options) {
        options.start = true;
    },
};

Block.prototype.run = function() {
    let instance = this,
        options = instance.options;

    // console.log('---> blocks: ' + JSON.stringify(options.argv.original[2]));

    if (options.get) {
        instance.runCmd('curl http://localhost:' + options.argv.original[2] + '/getBlock?index=' + options.argv.original[3]);
    }

    if (options.all) {
        instance.runCmd('curl http://localhost:' + options.argv.original[2] + '/blocks');
    }
};

Block.prototype.runCmd = function(cmd) {
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

exports.Impl = Block;
