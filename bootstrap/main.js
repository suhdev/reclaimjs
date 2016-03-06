'use strict';
let path = require('path');
var Application_1 = require('../framework/core/Application');
function startUp() {
    let application = new Application_1.Application(path.resolve(__dirname, '..'));
    main(application);
}
exports.startUp = startUp;
function main(application) {
    application.start();
}
//# sourceMappingURL=main.js.map