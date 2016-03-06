var nunjucks = require('nunjucks');
class TemplateEngine {
    constructor(viewsPath, config, appExpress) {
        this.environment = nunjucks.configure(viewsPath, Object.assign({}, config, { express: appExpress }));
    }
    static factory(viewsPath, templateEngineConfiguration, appExpress) {
        return new TemplateEngine(viewsPath, templateEngineConfiguration, appExpress);
    }
}
exports.TemplateEngine = TemplateEngine;
exports.default = TemplateEngine;
//# sourceMappingURL=TemplateEngine.js.map