/* global require */


var args = require('yargs').argv;
var gutil = require('gulp-util');
var tsm = require('teamcity-service-messages');

function teamCityFinishHandler(results) {
    'use strict';

    var hasError = false;
    var showErrorCount = function (count, type) {
        if (count === 0)
            return;

        if (args.teamcity) {
            tsm.message({ text: 'TypeScript: ' + count.toString() + ' ' + (type !== '' ? type + ' ' : '') + (count === 1 ? 'error' : 'errors')});
        }
        gutil.log('TypeScript:', gutil.colors.magenta(count.toString()), (type !== '' ? type + ' ' : '') + (count === 1 ? 'error' : 'errors'));

        hasError = true;
    };
    showErrorCount(results.transpileErrors, '');
    showErrorCount(results.syntaxErrors, 'syntax');
    showErrorCount(results.globalErrors, 'global');
    showErrorCount(results.semanticErrors, 'semantic');
    showErrorCount(results.emitErrors, 'emit');
    if (results.emitSkipped) {
        if (args.teamcity) {
            tsm.buildProblem({description: 'TypeScript: emit failed'});
        }
        gutil.log('TypeScript: emit', gutil.colors.red('failed'));
    }
    else if (hasError) {
        if (args.teamcity) {
            tsm.buildProblem({description: 'TypeScript: emit succeeded (with errors)'});
        }
        gutil.log('TypeScript: emit', gutil.colors.cyan('succeeded'), '(with errors)');

    }
}

function teamCityReporter(options) {
    return {
        error: function (error) {
            if (args.teamcity) {
                tsm.buildProblem({description: error.message});
            } else {
                console.error(error.message);
            }
        },
        finish: teamCityFinishHandler
    };
}

module.exports = teamCityReporter;