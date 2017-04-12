var alurapicPage = require('../pages/alurapicPage.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.Given(/^I go to "([^"]*)"$/, function(site) {
        console.log('I go to site: ' + site);
        alurapicPage.go(site);
    });

    this.When(/^I add "([^"]*)" in the search field$/, function(arg) {
        console.log('I search to site: ' + arg);
        alurapicPage.addFilter(arg);
    });

    this.Then(/^I should see results in the list$/, function(callback) {
        var fotos = alurapicPage.alurapicHomepage.fotos;
        fotos.get(0).getText().then(function(text) {
            expect(text).to.contain('Cachorro');
        });
        callback();
    });

    this.Then(/^I should see result graphic payment: "([^"]*)"$/, function(label, callback) {
        expect(alurapicPage.getLabelGraficoFaturamento()).to.eventually.equal(label).notify(callback);
    });

};
