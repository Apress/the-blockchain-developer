/*
 * Copyright 2018 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

var verbose = process.argv.indexOf('--verbose') !== -1;
var insane = process.argv.indexOf('--insane') !== -1;

if (verbose || insane)
    process.env.GH_VERBOSE = true;

if (insane)
    process.env.GH_VERBOSE_INSANE = true;

require('../cli_lib/cmd.js').run();
