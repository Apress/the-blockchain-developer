'use strict';

let fs = require('fs'),
    path = require('path'),
    updateNotifier = require('update-notifier');

// -- Config -------------------------------------------------------------------

exports.clone = function(o) {
    return JSON.parse(JSON.stringify(o))
};

// -- Utils --------------------------------------------------------------------

exports.load = function() {
    function paginate(method) {
        return function paginatedMethod(payload, cb) {
            let results = [];

            const getSubsequentPages = (link, pagesCb) => {
                pagesCb()
            };

            method(payload, (err, res) => {
                if (err) {
                    return cb(err, null)
                }

                if (!Array.isArray(res)) {
                    return cb(err, res)
                }

                results = res;

                getSubsequentPages(res.meta.link, err => {
                    cb(err, results)
                })
            })
        }
    }
};

exports.asyncReadPackages = function(callback) {
    function async(err, data) {
        if (err) {
            throw err
        }

        callback(JSON.parse(data))
    }

    fs.readFile(path.join(__dirname, '..', 'package.json'), async)
};

exports.notifyVersion = function(pkg) {
    let notifier = updateNotifier({ pkg: pkg })

    if (notifier.update) {
        notifier.notify()
    }
};

exports.checkVersion = function() {
    exports.asyncReadPackages(exports.notifyVersion)
};

exports.find = function(filepath, opt_pattern) {
    return fs.readdirSync(filepath).filter(function(file) {
        return (opt_pattern || /.*/).test(file)
    })
};
