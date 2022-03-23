var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// @ts-ignore
import '../vendor/cookieconsent.js';
import defaultOptions from './options';
var CookieConsentPlugin = {
    install: function (Vue, options) {
        console.log('[vue-cookieconsent] Install plugin', options);
        // merge default and client options
        options = __assign(__assign({}, defaultOptions), options);
        // setup cookieconsent lib event handler
        // see: https://github.com/orestbida/cookieconsent/blob/master/Readme.md#available-callbacks
        options.onAccept = function () {
            console.log('[cookieconsent] onAccept fired!');
            window.dispatchEvent(new Event('consentChanged'));
        };
        options.onChange = function () {
            console.log('[cookieconsent] onChange fired!');
            window.dispatchEvent(new Event('consentChanged'));
        };
        // The concept of curried functions, allows us to have 
        // a named function with arguments AND later call `removeEventListener`.
        var curryFn = function (eventName, fn) {
            if (fn === void 0) { fn = function () { console.log('[vue-cookieconsent] Cleanup on unmount'); }; }
            return function curriedFn() {
                console.log("[vue-cookieconsent] Call \"".concat(eventName, "\" handler"));
                fn();
            };
        };
        // @ts-ignore
        if (!window._cookieconsent) {
            console.log('[vue-cookieconsent] Init cookie consent lib', options);
            // @ts-ignore
            window._cookieconsent = true;
            // Assign custom property to the Vue instance
            Vue.config.globalProperties.$cc = initCookieConsent();
            // Register a Vue-like `on` method for the client to hook into lib events.
            // Note: `eventName` just exists to match the expected syntax for `on`.
            Vue.config.globalProperties.$cc.on = function (eventName, fn) {
                window.addEventListener('consentChanged', curryFn(eventName, fn), false);
            };
            // This prevents, that scripts are NOT being updated.
            // @TODO Further debug why it happens 
            document.addEventListener('DOMContentLoaded', function () {
                setTimeout(Vue.config.globalProperties.$cc.run(options), 10);
            }, false);
        }
        Vue.mixin({
            unmounted: function () {
                window.removeEventListener('consentChanged', curryFn(''));
            }
        });
    }
};
export default CookieConsentPlugin;
