import {includes} from 'lodash';

export default class EventBus {
    constructor() {
        this._events = {};
    }

    on(name, func) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
        if (includes(this._events[name], func)) {
            return;
        }
        this._events[name].push(func);
    }

    off(name, func) {
        if (!func) {
            this._events[name] = [];
            return;
        }
        this._events[name] = this._events[name].filter(function (f) {
            return f !== func;
        });
    }

    emit(name, ...args) {
        let funcs = this._events[name] || [];
        funcs.forEach(func => func(...args));
    }
}