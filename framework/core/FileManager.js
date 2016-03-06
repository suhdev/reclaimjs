var events_1 = require('events');
class FileManager extends events_1.EventEmitter {
    constructor(storagePath, storageUrl) {
        super();
        this.storagePath = storagePath;
        this.storageUrl = storageUrl;
        this.emit('Created', {
            storagePath: storagePath,
            storageUrl: storageUrl
        });
    }
    setStorage(storage) {
        this.storage = storage;
    }
    store() {
    }
    static factory(storagePath, storageUrl) {
        return new FileManager(storagePath, storageUrl);
    }
}
FileManager.$inject = ['storagePath', 'storageUrl'];
exports.FileManager = FileManager;
//# sourceMappingURL=FileManager.js.map