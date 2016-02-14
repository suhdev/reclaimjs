import * as express from 'express';
export class Application {
    constructor() {
        this.server = express();
    }
    config(fn) {
    }
    run(fn) {
    }
    getServer() {
        return this.server;
    }
}
//# sourceMappingURL=Application.js.map