var express = require('express');
var Injector_1 = require('./Injector');
var events_1 = require('events');
var ResourceResolver_1 = require('./ResourceResolver');
var Localization_1 = require('./Localization');
var Database_1 = require('../database/Database');
var Loader_1 = require('./Loader');
var path = require('path');
var TemplateEngine_1 = require('./TemplateEngine');
class Application extends events_1.EventEmitter {
    constructor(basePath) {
        super();
        this.basePath = basePath;
        this.server = express();
        this.injector = new Injector_1.Injector();
        this.injector.register('basePath', basePath);
        this.injector.register('expressApp', this.server);
        this.startUp();
    }
    startUp() {
        let appConfig = require(path.resolve(this.basePath, './config/app.json')), services = require(path.resolve(this.basePath, './config/services.json'));
        this.injector.register('DI', this.injector);
        this.injector.register('appConfiguration', appConfig);
        this.injector.register('baseUrl', appConfig.baseUrl);
        this.injector.register('locale', appConfig.locale);
        this.injector.register('fallbackLocale', appConfig.fallbackLocale);
        this.injector.register('appName', appConfig.appName);
        this.injector.register('environment', appConfig.environment);
        this.injector.register('serverConfiguration', require(path.resolve(this.basePath, './config/server.json')));
        this.injector.register('siteConfiguration', require(path.resolve(this.basePath, './config/site.json')));
        this.injector.register('filesystemConfiguration', require(path.resolve(this.basePath, './config/filesystem.json')));
        this.injector.register('errorsConfiguration', require(path.resolve(this.basePath, './config/errors.json')));
        this.injector.register('environmentConfiguration', require(path.resolve(this.basePath, './config/environment.json')));
        this.injector.register('databaseConfiguration', require(path.resolve(this.basePath, './config/database.json')));
        this.injector.register('resourceResolver', ResourceResolver_1.ResourceResolver);
        this.injector.register('localization', Localization_1.Localization);
        this.injector.register('loader', Loader_1.Loader);
        this.injector.register('database', Database_1.Database);
        this.injector.register('templateEngine', TemplateEngine_1.TemplateEngine);
        for (let service in services) {
            this.injector.register(service + 'Configuration', services[service]);
        }
        this.configs.forEach((v) => {
            this.injector.injectFunction(v);
        });
        this.injector.get('loader').installModels();
        this.injector.get('loader').installServices();
        this.injector.get('loader').installControllers();
    }
    config(fn) {
        if (typeof fn !== "function") {
            throw Error("The configuration parameter must be a function");
        }
        this.configs.push(fn);
    }
    run(fn) {
        if (typeof fn !== "function") {
            throw Error("The run parameter must be a function");
        }
        this.runs.push(fn);
    }
    start() {
    }
    getServer() {
        return this.server;
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map