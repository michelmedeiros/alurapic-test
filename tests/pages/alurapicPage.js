'use strict';
module.exports = {

    alurapicHomepage: {
        filtro: element(by.model('filtro')),
        fotos: element.all(by.repeater('foto in fotos | filter: filtro'))
    },

    go: function(site) {
        browser.get(site);
    },

    addFilter: function(arg) {
        var angular = this.alurapicHomepage;
        angular.filtro.sendKeys(arg);
    },

    getGraficoFaturamento: function() {
        return element(by.id('graficoFaturamento'));
    },

    getLabelGraficoFaturamento: function() {
        return this.replaceBreakLineWithSpace(this.getGraficoFaturamento()
            .element(by.className('ci-farol-ranking-text')).getText());
    },

    replaceBreakLineWithSpace: function(textElement) {
        return textElement.then(function(text) {
            text = text.replace(/(\r\n|\n|\r)/gm, " ");
            return text;
        });
    }

};
