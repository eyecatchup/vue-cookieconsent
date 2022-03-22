/* eslint-disable @typescript-eslint/camelcase */
var defaultOptions = {
    // See: https://github.com/orestbida/cookieconsent#all-configuration-options
    current_lang: 'de',
    auto_language: null,
    autoclear_cookies: true,
    cookie_name: 'cc_cookie',
    cookie_expiration: 365,
    force_consent: false,
    page_scripts: true,
    gui_options: {
        consent_modal: {
            layout: 'cloud',
            position: 'bottom center',
            transition: 'slide',
            swap_buttons: true // enable to invert buttons
        },
        settings_modal: {
            layout: 'box',
            // position: 'left',           // left/right
            transition: 'slide',
            swap_buttons: true
        }
    }
};
export default defaultOptions;
