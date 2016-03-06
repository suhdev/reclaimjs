'use strict';
let fs = require('fs'), path = require('path');
class PageBuilder {
    constructor(resolver) {
        this.resolver = resolver;
    }
    fromPage(pageKey) {
        this.page = Object.assign({}, require(this.resolver.getConfigPath('pages/default.json')), require(this.resolver.getConfigPath('pages/' + pageKey)));
    }
    fromDefault() {
    }
    static factory(configurator) {
        return new PageBuilder(configurator);
    }
}
PageBuilder.$inject = ['PathConfigurator'];
exports.PageBuilder = PageBuilder;
exports.default = PageBuilder;
//# sourceMappingURL=PageBuilder.js.map