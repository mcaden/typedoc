"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TypedocReader_1;
const Path = require("path");
const FS = require("fs");
const _ = require("lodash");
const component_1 = require("../../component");
const options_1 = require("../options");
const declaration_1 = require("../declaration");
let TypedocReader = TypedocReader_1 = class TypedocReader extends options_1.OptionsComponent {
    initialize() {
        this.listenTo(this.owner, options_1.DiscoverEvent.DISCOVER, this.onDiscover, -150);
    }
    onDiscover(event) {
        if (event.mode !== options_1.OptionsReadMode.Fetch) {
            return;
        }
        if (TypedocReader_1.OPTIONS_KEY in event.data) {
            this.load(event, Path.resolve(event.data[TypedocReader_1.OPTIONS_KEY]));
        }
        else if (this.application.isCLI) {
            const file = Path.resolve('typedoc.js');
            if (FS.existsSync(file)) {
                this.load(event, file);
            }
        }
    }
    load(event, optionFile) {
        if (!FS.existsSync(optionFile)) {
            event.addError('The option file %s does not exist.', optionFile);
            return;
        }
        let data = require(optionFile);
        if (typeof data === 'function') {
            data = data(this.application);
        }
        if (!(typeof data === 'object')) {
            event.addError('The option file %s could not be read, it must either export a function or an object.', optionFile);
        }
        else {
            if (data.src) {
                if (typeof data.src === 'string') {
                    event.inputFiles = [data.src];
                }
                else if (_.isArray(data.src)) {
                    event.inputFiles = data.src;
                }
                else {
                    event.addError('The property \'src\' of the option file %s must be a string or an array.', optionFile);
                }
                delete data.src;
            }
            _.defaultsDeep(event.data, data);
        }
    }
};
TypedocReader.OPTIONS_KEY = 'options';
__decorate([
    component_1.Option({
        name: TypedocReader_1.OPTIONS_KEY,
        help: 'Specify a js option file that should be loaded. If not specified TypeDoc will look for \'typedoc.js\' in the current directory.',
        type: declaration_1.ParameterType.String,
        hint: declaration_1.ParameterHint.File
    })
], TypedocReader.prototype, "options", void 0);
TypedocReader = TypedocReader_1 = __decorate([
    component_1.Component({ name: 'options:typedoc' })
], TypedocReader);
exports.TypedocReader = TypedocReader;
//# sourceMappingURL=typedoc.js.map