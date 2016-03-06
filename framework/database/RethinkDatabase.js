var rethinkdb = require('rethinkdb');
class RethinkDatabase {
    constructor(injector, config) {
        this.injector = injector;
        rethinkdb.connect(config, (err, conn) => {
            if (err) {
                throw err;
            }
            this.connection = conn;
        });
    }
    close() {
        this.connection.close();
    }
    static factory(injector, rethinkdbConfiguration) {
        return new RethinkDatabase(injector, rethinkdbConfiguration);
    }
}
RethinkDatabase.$inject = ['DI', 'rethinkdbConfiguration'];
exports.RethinkDatabase = RethinkDatabase;
//# sourceMappingURL=RethinkDatabase.js.map