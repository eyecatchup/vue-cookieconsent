# `vue-cookieconsent`

A Vue plugin that wraps the awesome [Cookieconsent](https://github.com/orestbida/cookieconsent/) library.

Note: A Vue 2 compatible plugin will be published as `vue2-cookieconsent` soon.

---

![Cookie Consent cover](https://raw.githubusercontent.com/orestbida/cookieconsent/master/demo/assets/cover.png)

---

### Install

Run `npm install vue-cookieconsent`.
### Setup

In your `main.[js|ts]`:

```js
import CookieConsent from 'vue-cookieconsent'

import '../node_modules/vue-cookieconsent/vendor/cookieconsent.css'
//import './theme/cookieconsent_custom.css' // custom cookie consent styles

// See: https://github.com/orestbida/cookieconsent#all-configuration-options
const consentOptions = {}

const app = createApp(App)
  .use(CookieConsent, consentOptions)
  .use(router);
```
### Usage

The Cookieconsent instance is globally available via `this.$cc`, providing the full library API. See the Cookieconsent [API documentation](https://github.com/orestbida/cookieconsent/#api-methods) for all avilable methods.

Register a handler to be executed whenever the consent settings change:

```js
export default defineComponent({
    name: 'Foo',
    beforeCreate () {
        this.$cc.on('consent-changed', () => {
            console.log('cookie consent changed, new user preferences:', vm.$cc.getUserPreferences())
            // your business logic..
        })
    }
})
```
