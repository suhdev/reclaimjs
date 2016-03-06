"use strict";
var readline_1 = require('readline');
class Stager {
    constructor() {
        let self = this;
        this.currentTask = null;
        this.tasks = [];
        this.executionStack = [];
        this.completer = this.complete.bind(this);
        this.readline = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout,
            completer: this.completer
        });
        this.readline.setPrompt('reclaimjs> ');
    }
    setCompletions(completions) {
        this.completions = completions;
    }
    complete(line, callback) {
        let hits = this.completions.filter((v) => {
            return v.indexOf(line) !== -1;
        });
        callback(null, [hits.length > 0 ? hits : this.completions, line]);
    }
    task(exc) {
        this.tasks.push(exc);
        return this;
    }
    execute() {
        console.log('Executing: ' + this.tasks.length + ' tasks');
        this.completions = [];
        this.executionStack = this.tasks.slice(0);
        this.next();
    }
    finish() {
        console.log('Execution finished...');
    }
    retry() {
        this.currentTask(this.readline, this);
    }
    next() {
        this.currentTask = this.executionStack.shift();
        if (this.currentTask) {
            console.log('Executing task: ' + this.currentTask.name);
            this.currentTask(this.readline, this);
        }
        else {
            this.finish();
        }
    }
}
exports.Stager = Stager;
//# sourceMappingURL=Stager.js.map