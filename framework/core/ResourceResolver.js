let path = require('path');
class ResourceResolver {
    constructor(DI, basePath, filesystemConfiguration) {
        this.injector = DI;
        this.basePath = basePath;
        this.storagePath = path.resolve(basePath, this.config.paths.storagePath);
        this.resourcesPath = path.resolve(basePath, this.config.paths.resourcesPath);
        this.publicPath = path.resolve(basePath, this.config.paths.publicPath);
        this.appPath = path.resolve(basePath, this.config.paths.appPath);
        this.viewsPath = path.resolve(basePath, this.config.paths.viewsPath);
        this.i18nPath = path.resolve(basePath, this.config.paths.i18nPath);
        this.config = filesystemConfiguration;
    }
    getResourcesPath(p = '') {
        return path.resolve(this.resourcesPath, p);
    }
    getViewsPath(p = '') {
        return path.resolve(this.viewsPath, p);
    }
    getLocalizationPath(p = '') {
        return path.resolve(this.i18nPath, p);
    }
    getBasePath(p = '') {
        return path.resolve(this.basePath, p);
    }
    getAppPath(p = '') {
        return path.resolve(this.appPath, p);
    }
    getPublicPath(p = '') {
        return path.resolve(this.publicPath, p);
    }
    getConfigPath(p = '') {
        return path.resolve(this.basePath, './config/', p);
    }
    static factory(DI, basePath, fileSystemConfig) {
        return new ResourceResolver(DI, basePath, fileSystemConfig);
    }
}
ResourceResolver.$inject = ['DI', 'basePath', 'filesystemConfiguration'];
exports.ResourceResolver = ResourceResolver;
exports.default = ResourceResolver;
//# sourceMappingURL=ResourceResolver.js.map