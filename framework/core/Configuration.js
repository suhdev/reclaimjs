var events_1 = require('events');
var Core_1 = require('./Core');
class Configuration extends events_1.EventEmitter {
    constructor(resolver) {
        super();
        this.config = {
            app: require(resolver.getConfigPath('app.json')),
            site: require(resolver.getConfigPath('site.json')),
            user: require(resolver.getConfigPath('user.json'))
        };
    }
    set(key, value) {
        Core_1.setDataAt(this.config, key, value, '.');
    }
    get(key) {
        return Core_1.getDataAt(this.config, key, '.');
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map