'use strict';
var Core_1 = require('./Core');
class Injector {
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
    hasComponent(name) {
        return this.components[name];
    }
    hasInstance(name) {
        return this.instances[name];
    }
    injectFunction(fn, ctx = null, ...args) {
        if (typeof fn !== "function") {
            throw new Error("Injector: provided argument is not a function");
        }
        let a, all = [];
        fn.$inject = fn.$inject || Core_1.extractArgumentsFromFunction(fn);
        if (!fn.$inject || fn.$inject.length === 0) {
            return fn.factory ? fn.factory() : fn();
        }
        while ((a = fn.$inject.shift())) {
            all.push(this.get(a));
        }
        return fn.factory ? fn.factory.apply(ctx, [].concat(all, Array.prototype.slice.call(args, 0))) : fn.apply(ctx, [].concat(all, Array.prototype.slice.call(args, 0)));
    }
    _inject(name, c) {
        let a, all = [];
        if (!c.$inject || c.$inject.length === 0) {
            return this.addInstance(name, c.factory ? c.factory() : c());
        }
        if (this.stack.indexOf(name) !== -1) {
            throw new Error('Circular dependency: ' + this.stack.join(' -> ') + ' -> ' + name);
        }
        this.stack.push(name);
        while ((a = c.$inject.shift())) {
            all.push(this.get(a));
        }
        this.stack.pop();
        return this.instances[name] = c.factory ? c.factory.apply(null, all) : c.apply(null, all);
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
        let name, callback, deps, temp;
        if (arguments.length === 0) {
            throw new Error('Injector: no agruments provided.');
        }
        if (arguments.length === 2) {
            if (typeof arguments[0] !== "string") {
                throw new Error('Injector: first argument must be of type string.');
            }
            if (arguments[2] === null) {
                throw new Error('Injector: second argument cannot be null');
            }
            name = arguments[0];
            callback = arguments[1];
            if (typeof callback === "string" ||
                typeof callback === "number" ||
                (typeof callback === "object" &&
                    !(callback instanceof Array))) {
                this.addInstance(name, callback);
                return this;
            }
        }
        else if (arguments.length === 1) {
            temp = arguments[0];
            if (typeof temp === "function") {
                if (!temp.name) {
                    throw new Error('Injector: anonymous functions are not supported.');
                }
                name = temp.name;
                callback = temp;
            }
            else if (temp instanceof Array) {
                if (typeof temp[temp.length - 1] !== "function" ||
                    !temp[temp.length - 1].name) {
                    throw new Error('Injector: last item in Array is not a function or function has no name.');
                }
                callback = temp[temp.length - 1];
                name = callback.name;
            }
            else {
                throw new Error('Injector: unknown parameter set provided');
            }
        }
        callback.$inject = callback.$inject ||
            (typeof callback.factory === "function" && Core_1.extractArgumentsFromFunction(callback.factory)) ||
            (Core_1.extractArgumentsFromFunction(callback));
        this.addComponent(name, callback);
        return this;
    }
}
exports.Injector = Injector;
exports.default = Injector;
//# sourceMappingURL=Injector.js.map