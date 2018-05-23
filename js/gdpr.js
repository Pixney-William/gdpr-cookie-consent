require('./cookieconsent');
import * as Gdpr from './loadScripts';

var pGdprContent = {
    "message": "This website uses cookies to ensure you get the best experience on our website.",
    "dismiss": "Got it!",
    "allow": "Allow cookies",
    "link": "Learn more",
    "href": "https://cookiesandyou.com/"
}
var pGdprConf = {
    // Google Analytics
    "ga_account": "UA-37178042-1",
    "ga_link_attr":1,
    "ga_anon":1,

    // Statcounter
    'sc_project': 11693851,
    'sc_invisible': 1,
    'sc_security': 27227997,
}


window.addEventListener("load", function() {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#3937a3"
            },
            "button": {
                "background": "#e62576"
            }
        },
        "theme": "edgeless",
        "type": "opt-in",
        "content": pGdprContent,

        // When initalised
        onInitialise: function(status) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type == 'opt-in' && didConsent) {
                // enable cookies
                Gdpr.loadGoogleAnalytics(pGdprConf.ga_account,pGdprConf.ga_link_attr,pGdprConf.ga_anon);
            }
            if (type == 'opt-out' && !didConsent) {
                // disable cookies
            }
        },

        // Status change
        onStatusChange: function(status, chosenBefore) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type == 'opt-in' && didConsent) {
                Gdpr.loadGoogleAnalytics(pGdprConf.ga_account,pGdprConf.ga_link_attr,pGdprConf.ga_anon);
            }
            if (type == 'opt-out' && !didConsent) {}
        },


        // Revoke
        onRevokeChoice: function() {
            var type = this.options.type;
            if (type == 'opt-in') {}
            if (type == 'opt-out') {
               // window['ga-disable-UA-XXXXX-Y'] = true;
            }
        },
    })
});