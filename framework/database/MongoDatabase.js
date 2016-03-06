var mongoose = require('mongoose');
class MongoDatabase {
    constructor(injector, mongooseConfiguration) {
        this.injector = injector;
        this.mongoose = mongoose.connect(mongooseConfiguration.uri, mongooseConfiguration.options);
    }
    schema(fn) {
        fn(this.injector, mongoose, mongoose.Schema);
    }
    model(fn) {
        fn(this.injector, this.mongoose, mongoose.Schema);
    }
    static factory(injector, mongooseConfiguration) {
        return new MongoDatabase(injector, mongooseConfiguration);
    }
}
MongoDatabase.$inject = ['DI', 'mongooseConfiguration'];
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=MongoDatabase.js.map