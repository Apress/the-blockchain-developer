/*
 * Copyright 2018 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

let base = require('../base'),
    logger = require('../logger');

function Version() {}

Version.DETAILS = {
    alias: 'v',
    description: 'Version.',
};

Version.prototype.run = function() {
    base.asyncReadPackages(this.printVersion)
};

Version.prototype.printVersion = function(pkg) {
    logger.log(pkg.name + ' ' + pkg.version)
};

exports.Impl = Version;
