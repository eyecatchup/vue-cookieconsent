/* eslint-disable @typescript-eslint/camelcase */
const defaultOptions = {
    // See: https://github.com/orestbida/cookieconsent#all-configuration-options
    current_lang: 'de',
    auto_language: null,                     // default: null; could also be 'browser' or 'document'
    autoclear_cookies: true,                    // default: false
    cookie_name: 'cc_cookie',             // default: 'cc_cookie'
    cookie_expiration: 365,                     // default: 182
    force_consent: false,                        // default: false
    page_scripts: true,
    gui_options: {
        consent_modal: {
            layout: 'cloud',               // box/cloud/bar
            position: 'bottom center',     // bottom/middle/top + left/right/center
            transition: 'slide',           // zoom/slide
            swap_buttons: true            // enable to invert buttons
        },
        settings_modal: {
            layout: 'box',                 // box/bar
            // position: 'left',           // left/right
            transition: 'slide',            // zoom/slide
            swap_buttons: true
        }
    }
}

export default defaultOptions
