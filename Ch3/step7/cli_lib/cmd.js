/*
 * Copyright 2013-2018, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/node-gh/gh/blob/master/LICENSE.md
 *
 * @author Eduardo Lundgren <edu@rdo.io>
 */

'use strict';

// -- Requires -------------------------------------------------------------------------------------

require('babel-polyfill');

let async = require('async'),
    base = require('./base'),
    fs = require('fs'),
    logger = require('./logger'),
    nopt = require('nopt'),
    path = require('path');

// -- Utils ----------------------------------------------------------------------------------------

function hasCommandInOptions(commands, options) {
    if (commands) {
        return commands.some(function(c) {
            return options[c] !== undefined
        })
    }

    return false
}

function invokePayload(options, command, cooked, remain) {
    let payload;

    if (command.DETAILS.payload && !hasCommandInOptions(command.DETAILS.commands, options)) {
        payload = remain.concat();
        payload.shift();
        command.DETAILS.payload(payload, options);
    }
}

function findCommand(name) {
    let Command, commandDir, commandFiles, commandPath;

    commandDir = path.join(__dirname, 'cmds');
    commandPath = path.join(commandDir, name + '.js');

    if (fs.existsSync(commandPath)) {
        Command = require(commandPath).Impl
    } else {
        commandFiles = base.find(commandDir, /\.js$/i);
        commandFiles.every(function(file) {
            commandPath = path.join(commandDir, file);
            Command = require(commandPath).Impl;

            if (Command.DETAILS.alias === name) {
                return false
            }

            Command = null;
            return true
        })
    }

    return Command
}

function loadCommand(name) {
    let Command = findCommand(name),
        plugin;

    // If command was not found, check if it is registered as a plugin.
    if (!Command) {
        try {
            plugin = configs.getPlugin(name)
        } catch (e) {
            return null
        }

        Command = plugin.Impl;

        // If plugin command exists, register the executed plugin name on
        // process.env. This may simplify core plugin infrastructure.
        process.env.NODEGH_PLUGIN = name
    }

    return Command
}

exports.setUp = function() {
    let Command,
        iterative,
        operations = [],
        options,
        parsed = nopt(process.argv),
        remain = parsed.argv.remain,
        cooked = parsed.argv.cooked

    operations.push(function(callback) {
        base.checkVersion();

        callback()
    });

    operations.push(function(callback) {
        let module = remain[0];

        if (cooked[0] === '--version' || cooked[0] === '-v') {
            module = 'version'
        } else if (!remain.length || cooked.indexOf('-h') >= 0 || cooked.indexOf('--help') >= 0) {
            module = 'help'
        }

        Command = loadCommand(module);

        if (!Command) {
            logger.error('Command not found');
            return
        }

        options = nopt(Command.DETAILS.options, Command.DETAILS.shorthands, process.argv, 2);
        iterative = Command.DETAILS.iterative;
        cooked = options.argv.cooked;
        remain = options.argv.remain;
        options.number = options.number || [remain[1]];

        callback()
    });

    async.series(operations, function() {
        var iterativeValues;
        options.isTTY = {};
        options.isTTY.in = Boolean(process.stdin.isTTY);
        options.isTTY.out = Boolean(process.stdout.isTTY);

        // Try to retrieve iterative values from iterative option key,
        // e.g. option['number'] === [1,2,3]. If iterative option key is not
        // present, assume [undefined] in order to initialize the loop.
        iterativeValues = options[iterative] || [undefined];

        iterativeValues.forEach(function(value) {
            options = base.clone(options);

            // Value can be undefined when the command doesn't have a iterative
            // option.
            options[iterative] = value;
            invokePayload(options, Command, cooked, remain);
            new Command(options).run()
        })
    })
};

exports.run = function() {
    try {
        process.env.GH_PATH = path.join(__dirname, '../');

        this.setUp()
    } catch (e) {
        console.error(e.stack || e)
    }
};
