exports.config = {
    //The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    //seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
    //chromeDriver: './node_modules/protractor/selenium/chromedriver.exe',
    //seleniumArgs: ['-Dwebdriver.ie.driver=./node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer.exe'],
    //seleniumArgs: ['-Dwebdriver.gecko.driver=./node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.9.0.exe'],

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    baseUrl: 'http://localhost:3030',

    ignoreUncaughtExceptions: true, //para protractor 4.0 nao parar de executar quando ocorre erro.

    capabilities: {
        'browserName': 'chrome'
    },

    //Caminho dos arquivos features
    specs: [
        'tests/features/*.feature'
    ],

    onPrepare: function() {
        //Ao iniciar o Protractor maximiza a tela do browser
        browser.driver.manage().window().maximize();

        //Desabilita animações ao executar testes e2e para ganho de performance
        var disableNgAnimate = function() {
          angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
            $animate.enabled(false);
          }]);
        };
        browser.addMockModule('disableNgAnimate', disableNgAnimate);

        var disableCssAnimate = function() {
            angular
                .module('disableCssAnimate', [])
                .run(function() {
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = '* {' +
                        '-webkit-transition: none !important;' +
                        '-moz-transition: none !important' +
                        '-o-transition: none !important' +
                        '-ms-transition: none !important' +
                        'transition: none !important' +
                        '}';
                    document.getElementsByTagName('head')[0].appendChild(style);
                });
        };
        browser.addMockModule('disableCssAnimate', disableCssAnimate);
    },

    //Configurações do Cucumber
    cucumberOpts: {
        require: ['tests/support/hooks.js', 'tests/step_definitions/photosDefinitions.js'],
        format: 'json:./tests/cucumber_report.json',
        tags: ['@Automatizar']
    }
};
