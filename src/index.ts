// @ts-ignore
import '../vendor/cookieconsent.js'
import defaultOptions from './options'

declare let initCookieConsent: any

const CookieConsentPlugin = {
    install (Vue: any, options: any) {
        // merge default and client options
        options = {...defaultOptions, ...options}
        
        if(options.debug) {
            console.log('[vue-cookieconsent] Install plugin', options)
        }

        // setup cookieconsent lib event handler
        // see: https://github.com/orestbida/cookieconsent/blob/master/Readme.md#available-callbacks
        options.onAccept = () => {
            if(options.debug) {
                console.log('[cookieconsent] onAccept fired!')
            }
            window.dispatchEvent(new Event('consentChanged'))
        }

        options.onChange = () => {
            if(options.debug) {
                console.log('[cookieconsent] onChange fired!')
            }
            window.dispatchEvent(new Event('consentChanged'))
        }

        // The concept of curried functions, allows us to have 
        // a named function with arguments AND later call `removeEventListener`.
        const curryFn = function(
            eventName: string, 
            fn: Function = () => { 
                if(options.debug) { console.log('[vue-cookieconsent] Cleanup on unmount'); }
        }) {
            return function curriedFn() {
                if(options.debug) {
                        console.log(`[vue-cookieconsent] Call "${eventName}" handler`);
                }
                fn()
            }
        }

        // @ts-ignore
        if (!window._cookieconsent) {
            if(options.debug) {
                console.log('[vue-cookieconsent] Init cookie consent lib', options)
            }

            // @ts-ignore
            window._cookieconsent = true
            
            // Assign custom property to the Vue instance
            Vue.config.globalProperties.$cc = initCookieConsent()

            // Register a Vue-like `on` method for the client to hook into lib events.
            // Note: `eventName` just exists to match the expected syntax for `on`.
            Vue.config.globalProperties.$cc.on = (eventName: string, fn: Function) => {
                window.addEventListener('consentChanged', curryFn(eventName, fn), false)
            }

            // This prevents, that scripts are NOT being updated.
            // @TODO Further debug why it happens 
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(Vue.config.globalProperties.$cc.run(options), 10)
            }, false); 
        }

        Vue.mixin({
            unmounted () {
                window.removeEventListener('consentChanged', curryFn(''))
            }
        })
 
    }
}

export default CookieConsentPlugin
