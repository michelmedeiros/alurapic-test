var hooks = function() {
    this.After(function(scenario, next) {
        if(scenario) {
            browser.takeScreenshot().then(function(png) {
                var decodedImage = new Buffer(png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                next();
            }, function(err) {
                next(err);
            });
        }
    });
 };

module.exports = hooks;