'use strict';

var hooks = function() {
    var outputDir = '../reports';
    this.After(function(scenario, callback) {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function(base64png) {
                var decodedImage = new Buffer(base64png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                callback();
            }, function(err) {
                callback(err);
            });
        } else {
            // createHtmlReport(outputDir);
            callback();
        }
    });

    // var createHtmlReport = function(sourceJson) {
    //     const report = require('cucumber-html-report');
    //     report.create({
    //         source:       '../reports/cucumber_report.json',      // source json
    //         dest:         '../reports',                   // target directory (will create if not exists)
    //         name:         'report.html',                 // report file name (will be index.html if not exists)
    //         template:     'mytemplate.html',             // your custom mustache template (uses default if not specified)
    //         title:        'Cucumber Report',             // Title for default template. (default is Cucumber Report)
    //         component:    'My Component',                // Subtitle for default template. (default is empty)
    //         logo:         './logos/cucumber-logo.svg',   // Path to the displayed logo.
    //         screenshots:  './screenshots',               // Path to the directory of screenshots. Optional.
    //     }).then(console.log)
    //       .catch(console.error);
    // };
};
module.exports = hooks;
