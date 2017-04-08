exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to this directory.
    specs: [
        'tests/features/*.feature'
    ],

    resultJsonOutputFile: 'report.json',

    baseURL: 'http://localhost:3030/',

    cucumberOpts: {
        format: ['json:tests/reports/results.json', 'pretty'],
        require: [
            'tests/features/step_definitions/**/*.js',
            'tests/support/hooks.js'
        ],

        tags: false,
        format: 'pretty',
        profile: false,
        'no-source': true
    }
};
