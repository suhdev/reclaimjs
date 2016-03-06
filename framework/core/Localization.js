var Core_1 = require('./Core');
class Localization {
    constructor(locale, resourceResolver) {
        this.locale = locale;
        this.resolver = resourceResolver;
    }
    get(key, data) {
        var k = key.split('.'), loc;
        if (k.length === 0) {
            return;
        }
        if (k.length === 1) {
            return require(this.resolver.getLocalizationPath(k[0]));
        }
        loc = require(this.resolver.getLocalizationPath(k.shift()));
        return Core_1.format(Core_1.getDataAt(loc, k.join('.')), data);
    }
    static factory(locale, resourceResolver) {
        return new Localization(locale, resourceResolver);
    }
}
Localization.$inject = ['locale', 'resourceResolver'];
exports.Localization = Localization;
exports.default = Localization;
//# sourceMappingURL=Localization.js.map