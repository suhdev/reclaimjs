var events_1 = require('events');
class ApplicationEventManager extends events_1.EventEmitter {
    constructor() {
        super();
    }
    static factory() {
        return new ApplicationEventManager();
    }
}
exports.ApplicationEventManager = ApplicationEventManager;
//# sourceMappingURL=ApplicationEventManager.js.map