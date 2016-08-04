"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var toastr_1 = require('../components/toastr/toastr');
var _ = require('lodash');
var quotes = [
    {
        title: 'Come to Freenode',
        message: 'We rock at <em>#angularjs</em>',
        options: {
            allowHtml: true
        }
    },
    {
        title: 'Looking for bootstrap?',
        message: 'Try ui-bootstrap out!'
    },
    {
        title: 'Wants a better router?',
        message: 'We have you covered with ui-router'
    },
    {
        title: null,
        message: 'My name is Inigo Montoya. You killed my father. Prepare to die!',
    },
    {
        title: null,
        message: 'Titles are not always needed'
    },
    {
        title: null,
        message: 'Toastr rock!'
    },
    {
        title: 'What about nice html?',
        message: '<strong>Sure you <em>can!</em></strong>',
        options: {
            allowHtml: true
        }
    },
];
var types = ['success', 'error', 'info', 'warning'];
var DemoApp = (function () {
    function DemoApp(toastrService, viewContainerRef) {
        this.toastrService = toastrService;
        this.viewContainerRef = viewContainerRef;
        this.title = '';
        this.type = types[0];
        this.message = '';
        this.lastInserted = [];
        this.options = this.toastrService.toastrConfig;
        // necessary until we can accesses viewContainerRef in service
        toastrService.viewContainerRef = this.viewContainerRef;
        // setup
        // this.options = new ToastrConfig();
    }
    DemoApp.prototype.openToast = function () {
        // Clone current config so it doesn't change when ngModel updates
        var newConfig = _.cloneDeep(this.options);
        var ins = this.toastrService[this.type](this.message, this.title, newConfig);
        if (ins) {
            this.lastInserted.push(ins.toastId);
        }
    };
    DemoApp.prototype.openRandomToast = function () {
    };
    DemoApp.prototype.clearToasts = function () {
        this.toastrService.clear();
    };
    DemoApp.prototype.clearLastToast = function () {
        this.toastrService.clear(this.lastInserted.pop());
    };
    DemoApp = __decorate([
        core_1.Component({
            selector: 'demo-app',
            providers: [],
            templateUrl: 'demo-app/demo-app.html',
            styleUrls: ['demo-app/demo-app.css'],
            directives: [],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [],
        }), 
        __metadata('design:paramtypes', [toastr_1.ToastrService, core_1.ViewContainerRef])
    ], DemoApp);
    return DemoApp;
}());
exports.DemoApp = DemoApp;
//# sourceMappingURL=demo-app.js.map