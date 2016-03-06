var SqlDatabase_1 = require('./SqlDatabase');
var MongoDatabase_1 = require('./MongoDatabase');
var RethinkDatabase_1 = require('./RethinkDatabase');
class Database {
    constructor(DI) {
        this.injector = DI;
    }
    startUp() {
        if (this.injector.hasInstance('knexConfiguration')) {
            this.injector.register('sqlDatabase', SqlDatabase_1.SqlDatabase);
        }
        if (this.injector.hasInstance('rethinkdbConfiguration')) {
            this.injector.register('rethinkDatabase', RethinkDatabase_1.RethinkDatabase);
        }
        if (this.injector.hasInstance('mongooseConfiguration')) {
            this.injector.register('mongoDatabase', MongoDatabase_1.MongoDatabase);
        }
    }
    sql() {
        return this.injector.get('sqlDatabase');
    }
    mongodb() {
        return this.injector.get('mongoDatabase');
    }
    rethinkdb() {
        return this.injector.get('rethinkDatabase');
    }
    static factory(DI) {
        return new Database(DI);
    }
}
Database.$inject = ['DI'];
exports.Database = Database;
//# sourceMappingURL=Database.js.map