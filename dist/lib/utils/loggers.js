"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var Util = require("util");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Success"] = 4] = "Success";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = (function () {
    function Logger() {
        this.errorCount = 0;
    }
    Logger.prototype.hasErrors = function () {
        return this.errorCount > 0;
    };
    Logger.prototype.resetErrors = function () {
        this.errorCount = 0;
    };
    Logger.prototype.write = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log(Util.format.apply(this, arguments), LogLevel.Info);
    };
    Logger.prototype.writeln = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log(Util.format.apply(this, arguments), LogLevel.Info, true);
    };
    Logger.prototype.success = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log(Util.format.apply(this, arguments), LogLevel.Success);
    };
    Logger.prototype.verbose = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log(Util.format.apply(this, arguments), LogLevel.Verbose);
    };
    Logger.prototype.warn = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log(Util.format.apply(this, arguments), LogLevel.Warn);
    };
    Logger.prototype.error = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log(Util.format.apply(this, arguments), LogLevel.Error);
    };
    Logger.prototype.log = function (message, level, newLine) {
        if (level === void 0) { level = LogLevel.Info; }
        if (level === LogLevel.Error) {
            this.errorCount += 1;
        }
    };
    Logger.prototype.diagnostics = function (diagnostics) {
        var _this = this;
        diagnostics.forEach(function (diagnostic) {
            _this.diagnostic(diagnostic);
        });
    };
    Logger.prototype.diagnostic = function (diagnostic) {
        var output;
        if (diagnostic.file) {
            output = diagnostic.file.fileName;
            output += '(' + ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start).line + ')';
            output += ts.sys.newLine + ' ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, ts.sys.newLine);
        }
        else {
            output = ts.flattenDiagnosticMessageText(diagnostic.messageText, ts.sys.newLine);
        }
        switch (diagnostic.category) {
            case ts.DiagnosticCategory.Error:
                this.log(output, LogLevel.Error);
                break;
            case ts.DiagnosticCategory.Warning:
                this.log(output, LogLevel.Warn);
                break;
            case ts.DiagnosticCategory.Message:
                this.log(output, LogLevel.Info);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
var ConsoleLogger = (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleLogger.prototype.log = function (message, level, newLine) {
        if (level === void 0) { level = LogLevel.Info; }
        if (level === LogLevel.Error) {
            this.errorCount += 1;
        }
        var output = '';
        if (level === LogLevel.Error) {
            output += 'Error: ';
        }
        if (level === LogLevel.Warn) {
            output += 'Warning: ';
        }
        output += message;
        if (newLine || level === LogLevel.Success) {
            ts.sys.write(ts.sys.newLine);
        }
        ts.sys.write(output + ts.sys.newLine);
        if (level === LogLevel.Success) {
            ts.sys.write(ts.sys.newLine);
        }
    };
    return ConsoleLogger;
}(Logger));
exports.ConsoleLogger = ConsoleLogger;
var CallbackLogger = (function (_super) {
    __extends(CallbackLogger, _super);
    function CallbackLogger(callback) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        return _this;
    }
    CallbackLogger.prototype.log = function (message, level, newLine) {
        if (level === void 0) { level = LogLevel.Info; }
        if (level === LogLevel.Error) {
            this.errorCount += 1;
        }
        this.callback(message, level, newLine);
    };
    return CallbackLogger;
}(Logger));
exports.CallbackLogger = CallbackLogger;
//# sourceMappingURL=loggers.js.map