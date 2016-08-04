"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var overlay_1 = require('./overlay/overlay');
var portal_1 = require('./portal/portal');
var overlay_container_1 = require('./overlay/overlay-container');
var ToastConfig = (function () {
    function ToastConfig() {
        // TODO: might not be needed
        // allowHtml: boolean = false;
        this.closeButton = false;
        // closeHtml: string = '<button>&times;</button>';
        // TODO: extended?
        // extendedTimeOut: number = 1000;
        // TODO: listeners for toast actions
        // onHidden: null;
        // onShown: null;
        // onTap: null;
        this.progressBar = false;
        this.timeOut = 5000;
        this.toastClass = 'toast';
        this.positionClass = 'toast-top-right';
        this.titleClass = 'toast-title';
        this.messageClass = 'toast-message';
        this.tapToDismiss = true;
        this.toastComponent = Toast;
    }
    ToastConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ToastConfig);
    return ToastConfig;
}());
exports.ToastConfig = ToastConfig;
var ToastrConfig = (function (_super) {
    __extends(ToastrConfig, _super);
    function ToastrConfig() {
        _super.apply(this, arguments);
        this.autoDismiss = false;
        // TODO:
        // containerId: string = 'toast-container';
        this.iconClasses = {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
        };
        this.maxOpened = 0;
        this.newestOnTop = true;
        this.preventDuplicates = false;
    }
    ToastrConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ToastrConfig);
    return ToastrConfig;
}(ToastConfig));
exports.ToastrConfig = ToastrConfig;
var ToastrService = (function () {
    function ToastrService(toastrConfig, overlay, injector) {
        this.toastrConfig = toastrConfig;
        this.overlay = overlay;
        this.injector = injector;
        this.index = 0;
        this.toasts = [];
        this.previousToastMessage = '';
    }
    ToastrService.prototype.success = function (message, title, optionsOverride) {
        var type = this.toastrConfig.iconClasses.success;
        return this._buildNotification(type, message, title, optionsOverride);
    };
    ToastrService.prototype.error = function (message, title, optionsOverride) {
        var type = this.toastrConfig.iconClasses.error;
        return this._buildNotification(type, message, title, optionsOverride);
    };
    ToastrService.prototype.info = function (message, title, optionsOverride) {
        var type = this.toastrConfig.iconClasses.info;
        return this._buildNotification(type, message, title, optionsOverride);
    };
    ToastrService.prototype.warning = function (message, title, optionsOverride) {
        var type = this.toastrConfig.iconClasses.warning;
        return this._buildNotification(type, message, title, optionsOverride);
    };
    ToastrService.prototype.clear = function (toastId) {
        // Call every toast's remove function
        for (var i = 0; i < this.toasts.length; i++) {
            if (toastId !== undefined) {
                if (this.toasts[i].toastId === toastId) {
                    this.toasts[i].portal.then(function (portal) { return portal._hostElement.component.remove(); });
                    return;
                }
            }
            else {
                this.toasts[i].portal.then(function (portal) { return portal._hostElement.component.remove(); });
            }
        }
    };
    ToastrService.prototype.remove = function (toastId) {
        var _a = this._findToast(toastId), index = _a.index, activeToast = _a.activeToast;
        if (!activeToast) {
            return false;
        }
        activeToast.overlayRef.then(function (ref) { return ref.detach(); });
        this.toasts.splice(index, 1);
        if (this.toastrConfig.maxOpened &&
            this.toasts.length && this.toasts.length >= this.toastrConfig.maxOpened) {
            this.toasts[+this.toastrConfig.maxOpened - 1].portal.then(function (portal) {
                if (portal._hostElement.component.state === 'inactive') {
                    portal._hostElement.component.activateToast();
                }
            });
        }
        if (!this.toasts.length) {
            this.overlay.dispose();
            activeToast.overlayRef.then(function (ref) { return ref.dispose(); });
        }
        return true;
    };
    ToastrService.prototype._findToast = function (toastId) {
        for (var i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].toastId === toastId) {
                return { index: i, activeToast: this.toasts[i] };
            }
        }
        return { index: null, activeToast: null };
    };
    ToastrService.prototype.isDuplicate = function (message) {
        for (var i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].message === message) {
                return true;
            }
        }
        return false;
    };
    ToastrService.prototype._buildNotification = function (type, message, title, optionsOverride) {
        if (optionsOverride === void 0) { optionsOverride = this.toastrConfig; }
        // max opened and auto dismiss = true
        if (this.toastrConfig.preventDuplicates && this.isDuplicate(message)) {
            return;
        }
        this.previousToastMessage = message;
        var keepInactive = false;
        if (+this.toastrConfig.maxOpened && this.toasts.length >= +this.toastrConfig.maxOpened) {
            keepInactive = true;
            if (this.toastrConfig.autoDismiss) {
                this.clear(this.toasts[this.toasts.length - 1].toastId);
            }
        }
        // pass current view to toast
        // this keeps the ToastrService as a singleton
        var resolvedProviders = core_1.ReflectiveInjector.resolve([
            new core_1.Provider('view', { useValue: this.viewContainerRef }),
            new core_1.Provider('ToastrService', { useValue: this }),
        ]);
        var child = core_1.ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
        var component = new portal_1.ComponentPortal(optionsOverride.toastComponent, this.viewContainerRef, child);
        var inserted = {
            toastId: this.index++,
            message: message,
        };
        var overlayRef = this.overlay.create(optionsOverride.positionClass);
        inserted.overlayRef = overlayRef;
        overlayRef.then(function (ref) {
            var p = ref.attach(component);
            inserted.portal = p;
            p.then(function (portal) {
                // TODO: explore injecting these values
                portal._hostElement.component.toastId = inserted.toastId;
                portal._hostElement.component.message = message;
                portal._hostElement.component.title = title;
                portal._hostElement.component.toastType = type;
                portal._hostElement.component.options = optionsOverride;
                if (!keepInactive) {
                    setTimeout(function () { return portal._hostElement.component.activateToast(); });
                }
                return portal;
            });
        });
        this.toasts.push(inserted);
        return inserted;
    };
    ToastrService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ToastrConfig, overlay_1.Overlay, core_1.Injector])
    ], ToastrService);
    return ToastrService;
}());
exports.ToastrService = ToastrService;
exports.TOASTR_PROVIDERS = [
    overlay_container_1.OverlayContainer,
    overlay_1.Overlay,
    core_1.provide(ToastrService, {
        useFactory: function (overlay, injector) {
            return new ToastrService(new ToastrConfig(), overlay, injector);
        },
        deps: [overlay_1.Overlay, core_1.Injector]
    })
];
var Toast = (function () {
    function Toast(toastrService) {
        this.toastrService = toastrService;
        // used to control animation
        this.state = 'inactive';
    }
    Toast.prototype.activateToast = function () {
        var _this = this;
        this.state = 'active';
        if (+this.options.timeOut !== 0) {
            this.timeout = setTimeout(function () {
                _this.remove();
            }, +this.options.timeOut);
        }
    };
    Toast.prototype.tapToast = function () {
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    Toast.prototype.remove = function () {
        var _this = this;
        if (this.state === 'removed') {
            return;
        }
        this.state = 'removed';
        setTimeout(function () { return _this.toastrService.remove(_this.toastId); }, 300);
    };
    Toast = __decorate([
        core_1.Component({
            selector: '[toast]',
            providers: [],
            template: "\n  <div @flyInOut=\"state\" class=\"{{options.toastClass}} {{toastType}}\" (click)=\"tapToast()\">\n    <button *ngIf=\"options.closeButton\" class=\"toast-close-button\" (click)=\"remove()\">\u00D7</button>\n    <div *ngIf=\"title\" class=\"{{options.titleClass}}\" [attr.aria-label]=\"title\">{{title}}</div>\n    <div *ngIf=\"message\" class=\"{{options.messageClass}}\" [attr.aria-label]=\"message\">\n      {{message}}\n    </div>\n    <!--TODO: allow html\n    <div ng-switch on=\"allowHtml\">\n      <div ng-switch-when=\"true\" ng-if=\"title\" class=\"{{titleClass}}\" ng-bind-html=\"title\"></div>\n      <div ng-switch-when=\"true\" class=\"{{messageClass}}\" ng-bind-html=\"message\"></div>\n    </div>\n    -->\n    <!-- TODO: progressbar\n    <progress-bar *ngIf=\"progressBar\"></progress-bar>\n    -->\n  </div>\n  ",
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('inactive', core_1.style({
                        opacity: 0
                    })),
                    core_1.state('active', core_1.style({
                        opacity: 1
                    })),
                    core_1.state('removed', core_1.style({
                        opacity: 0
                    })),
                    core_1.transition('inactive <=> active', core_1.animate('300ms ease-in')),
                    core_1.transition('active <=> removed', core_1.animate('300ms ease-in')),
                ]),
            ],
        }), 
        __metadata('design:paramtypes', [ToastrService])
    ], Toast);
    return Toast;
}());
exports.Toast = Toast;
//# sourceMappingURL=toastr.js.map