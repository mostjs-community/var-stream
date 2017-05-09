"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var most_1 = require("most");
var multicast_1 = require("@most/multicast");
var VarStream = (function () {
    function VarStream(initialValue) {
        this._value = null;
        this._running = true;
        this._source = new multicast_1.MulticastSource(most_1.never().source);
        this._stream = new most_1.Stream(this._source);
        if (initialValue) {
            this._value = initialValue;
            most_1.defaultScheduler.asap(most_1.PropagateTask.event(this._value, this._source));
        }
    }
    VarStream.prototype.get = function () {
        return this._value;
    };
    VarStream.prototype.set = function (value) {
        if (this._running && value != this._value) {
            this._value = value;
            most_1.defaultScheduler.asap(most_1.PropagateTask.event(this._value, this._source));
            return value;
        }
        else {
            return null;
        }
    };
    VarStream.prototype.stream = function () {
        return this._stream;
    };
    VarStream.prototype.error = function (err) {
        most_1.defaultScheduler.asap(most_1.PropagateTask.error(err, this._source));
    };
    VarStream.prototype.end = function () {
        // Suppress get and set
        this._value = null;
        this._running = false;
        // Terminate the stream
        most_1.defaultScheduler.asap(most_1.PropagateTask.end(null, this._source));
    };
    return VarStream;
}());
exports.VarStream = VarStream;
