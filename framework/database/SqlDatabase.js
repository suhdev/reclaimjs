var knex = require('knex');
var bookshelf = require('bookshelf');
class SqlDatabase {
    constructor(injector, config) {
        this.injector = injector;
        this.knex = knex(config);
        this.bookshelf = bookshelf(this.knex);
    }
    query() {
        return this.knex;
    }
    model(fn) {
        fn(this.bookshelf, this.knex, this.injector);
    }
    static factory(injector, knexConfiguration) {
        return new SqlDatabase(injector, knexConfiguration);
    }
}
SqlDatabase.$inject = ['DI', 'knexConfiguration'];
exports.SqlDatabase = SqlDatabase;
//# sourceMappingURL=SqlDatabase.js.map