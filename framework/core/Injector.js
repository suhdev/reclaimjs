'use strict';
export class Injector {
    constructor() {
        this.components = {};
        this.instances = {};
        this.stack = [];
    }
    addInstance(name, c) {
        return this.instances[name] = c;
    }
    addComponent(name, c) {
        return this.components[name] = c;
    }
    _inject(name, c) {
        let a, all = [];
        if (c.$inject.length === 0) {
            return this.addInstance(name, c());
        }
        if (this.stack.indexOf(name) !== -1) {
            throw new Error('Circular dependency: ' + this.stack.join(' -> ') + ' -> ' + name);
        }
        this.stack.push(name);
        while ((a = c.$inject.shift())) {
            all.push(this.get(a));
        }
        this.stack.pop();
        return this.instances[name] = c.apply(null, all);
    }
    get(name) {
        if (this.instances[name]) {
            return this.instances[name];
        }
        if (!this.components[name]) {
            throw new Error('Component: ' + name + ' could not be found');
        }
        return this._inject(name, this.components[name]);
    }
    register() {
        let name, callback, c;
        if (arguments.length === 2) {
            if (typeof arguments[0] !== "string") {
                throw new Error('Injector: first argument must be of type string.');
            }
            name = arguments[0];
            if (!(arguments[1] instanceof Array)) {
                this.addInstance(name, arguments[1]);
                return this;
            }
            c = arguments[1];
            if (c.length === 0 || typeof c[c.length - 1] !== "function") {
                throw new Error('Injector: second argument is an empty Array!');
            }
            c[c.length - 1].$inject = c.slice(0, c.length - 1);
            this.addComponent(name, c);
            return this;
        }
        else if (arguments.length === 1) {
            c = arguments[0];
            if (typeof c === "function") {
                if (!c.name) {
                    throw new Error("Function parameter must have a name");
                }
                callback = c;
                callback.toString()
                    .replace(/^function[\s]+?[\S]+?\((.*?)\)/, function (e, v, k) {
                    callback.$inject = v.trim().length > 0 ? v.trim().split(/[\s,]+/) : [];
                    return e;
                });
                this.addComponent(callback.name, callback);
                return this;
            }
            else if (c instanceof Array &&
                typeof c[c.length - 1] === "function" &&
                c[c.length - 1].name) {
                callback = c[c.length - 1];
                callback.$inject = c.slice(0, c.length - 1);
                this.addComponent(callback.name, callback);
                return this;
            }
        }
        throw new Error('Invalid parameter');
    }
}
module.exports = Injector;
//# sourceMappingURL=Injector.js.map