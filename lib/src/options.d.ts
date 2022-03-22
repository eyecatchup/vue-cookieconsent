declare const defaultOptions: {
    current_lang: string;
    auto_language: null;
    autoclear_cookies: boolean;
    cookie_name: string;
    cookie_expiration: number;
    force_consent: boolean;
    page_scripts: boolean;
    gui_options: {
        consent_modal: {
            layout: string;
            position: string;
            transition: string;
            swap_buttons: boolean;
        };
        settings_modal: {
            layout: string;
            transition: string;
            swap_buttons: boolean;
        };
    };
};
export default defaultOptions;
