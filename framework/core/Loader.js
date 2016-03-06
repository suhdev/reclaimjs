class Loader {
    constructor(DI, resourceResolver) {
        this.injector = DI;
        this.resolver = resourceResolver;
    }
    installModels() {
        let app = require(this.resolver.getAppPath('models/install'));
        if (typeof app.startUp === "function") {
            this.injector.injectFunction(app.startUp);
        }
    }
    installControllers() {
        let app = require(this.resolver.getAppPath('http/controllers/install'));
        if (typeof app.startUp === "function") {
            this.injector.injectFunction(app.startUp);
        }
    }
    controller(name, ctrl) {
        let a = new ctrl();
        this.injector.injectFunction(a.onInstall, a);
        this.injector.addInstance(name, a);
    }
    installServices() {
        let app = require(this.resolver.getAppPath('services/install'));
        if (typeof app.startUp === "function") {
            this.injector.injectFunction(app.startUp);
        }
    }
    static factory(DI, resolver) {
        return new Loader(DI, resolver);
    }
}
Loader.$inject = ['DI', 'resourceResolver'];
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map