"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var demo_app_1 = require('./demo-app/demo-app');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
require('rxjs/Rx');
require('lodash');
var toastr_1 = require('./components/toastr/toastr');
platform_browser_dynamic_1.bootstrap(demo_app_1.DemoApp, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    core_1.Renderer,
    toastr_1.TOASTR_PROVIDERS
]);
//# sourceMappingURL=main.js.map