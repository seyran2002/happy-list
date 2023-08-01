# Development Rules

_Learn by heart before coding_

Use [this link](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
for formatting `.md` files.

## Fonts

We are using `Source Sans Pro` font-family with 4 `font-weight`

- `font-weight: 300` Source Sans Pro light
- `font-weight: 400` Source Sans Pro regular
- `font-weight: 600` Source Sans Pro semiBold
- `font-weight: 700` Source Sans Pro bold

**Add only `font-weight` to change the weight of element. Default font is `Regular`.**

## Atomic design

The four stages of atomic design are. Every stage have own css file in assets/styles folder.

1. Atoms
2. Molecules
3. Organisms
4. Pages

### Atoms

These atoms include basic HTML elements like form labels, inputs, buttons,
and others that can’t be broken down any further without ceasing to be functional.

### Molecules

Molecules contain more than one atom.
For example, a form label, search input, and button can join together to create a search form molecule,
or navigation links can be a molecule

### Organisms

Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms.
For example header, footer are organisms. We should not write logic in organism,
because organism is reusable component.

### Pages

Pages are contained organisms. Javascript's logic should be managed from page. For example home page.
You can read more about Atomic Design
Methodology [here](https://atomicdesign.bradfrost.com/chapter-2/#advantages-of-atomic-design).

## Vue meta

Every page has it's own meta tags. Which we should write in the script's export default, and have like this structure

```
metaInfo() {
    return {
        title: 'Home',
        meta: [{ vmid: 'description', name: 'description', content: 'This is Home page' }],
    };
},

```

## Vuex store

We use Vuex as a state manager for our application. It serves as a centralized store for all the components in the
application.
You can read more about Vuex [here](https://v3.vuex.vuejs.org).

### Vuex Modules

For the purposes of avoiding the Vuex store bloating and making our Vuex store more manageable, we divide our store
into **modules**. Each module can contain its own state, mutations, actions, getters, and even nested modules (if there
is a need to do that).

If you want to create a new module, you should go to `src/store/modules` and create a new folder, which name is
the new module name. Then you should create `index.js` file inside this folder — this is the module entrypoint.

When you write a module, you should keep its state, mutations,
actions, getters **in separate files**, because it helps
to make our code more structured. Here is an example:

```
// store/modules/home/index.js

import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    state,
    ...mutations,
    ...actions,
    ...getters,
};
```

Then import your module into the `store/index.js`:

```
import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home
  },
});
```

Now your module is a part of the app global store!

### Mutation, action and getter types

When you write mutation, action or getter at first you should use **constants** for mutation, action and getter types.
This allows the code to take advantage of tooling like linters, and putting all constants in a single file allows your
collaborators to get an at-a-glance view of what mutations are possible in the entire application. The constant value
should look like this:

```
MUTATION_NAME: '[moduleName] MUTATION_NAME',
```

For example:

```
// store/types/mutation-types.js

export default {
  SET_USER_DATA: '[auth] SET_USERDATA',
  SET_TOKEN: '[auth] SET_TOKEN',
  LOGOUT_USER: '[auth] LOGOUT_USER',
  REMOVE_TOKEN: '[auth] REMOVE_TOKEN',
  SET_LANG: '[lang] SET_LANG',
  SET_COUNTS: '[lang] SET_COUNTS',
  SET_ANNIVERSARY_EVENTS: '[event] SET_ANNIVERSARY_EVENTS',
  SET_CURRENT_ANNIVERSARY: '[event] SET_CURRENT_ANNIVERSARY',
  SET_SS_EVENTS: '[event] SET_SS_EVENTS',
  SET_CURRENT_SS: '[event] SET_CURRENT_SS',
};

```

And use it inside your module:

```
// store/modules/home/mutations.js

import mutationTypes from '../../types/mutation-types';

const mutations = {
  [mutationTypes.SET_COUNTS](state, payload) {
    state.counts = payload;
  },
};

export default {
  mutations,
};

```

**Important**: if you want to dispatch an action from the vue component, you can make it by this way
using `actionTypes`:

```
methods: {
    login() {
        this.$store.dispatch(actionTypes.LOGIN, this.data);
    }
}
```

## Google Analytics

### How to add different services (like Yandex.Metrika) to GTM

1. Go to the `Tags` section and click the `Create button`.
2. Give the unique name for the tag.
3. Copy the service HTML code.
4. Click the `Tag Configuration` and select the `Custom HTML` inside side panel.
5. Paste the service HTML code to the `HTML` field.
6. Save the changes.

The example of service
adding: [Яндекс.Метрика через Google Tag Manager: инструкция по установке](https://romi.center/ru/learning/article/yandex-metrica-via-google-tag-manager-installation-instructions/)

### How to track calls-to-action using GTM

1. Select `Variables` in the side panel of GTM and then click `Configure`.
2. Inside opened menu enable `Clicks`.
3. Figure out which events you want to track on your website (it can be the click on button, click on link etc.)
4. Create the click trigger in GTM:

- Select `Triggers` in the side panel of GTM.
- Click new and select the unique name for trigger (for example, Short Instruction Click Trigger).
- Click `Trigger Configuration` and select `All Elements` under the click section.
- Select the `Some clicks` in `This triggers fires on`.
- Add your CTA link’s variables: for example, `Click Classes` `contains` `gtm-short-instruction`.
- Save changes.

5. Publish your container. You can name your version configuration with notes, or just click publish when the secondary
   box pops up.
6. Open your website in GTM "Preview and Debug Mode".
7. Open your website in the same browser in a new tab.
8. Create the tag that connects your trigger to a Google Analytics event:

- Create the unique name for tag, for example, Event - Short Instruction Click.
- Change the `Track Type` to `Event`.
- Label your category, action and label event tracking parameters with how you want them to appear in your Google
  Analytics Report.
- Scroll down and add your “trigger” that you created in Step 4.
- Save changes and publish your workspace.

9. Add `gtm-short-instruction` class to the element which you want to track.
10. It's ready!

The example of the
setup: [How to Track a “Button Click” Event in Google Analytics Using Google Tag Manager](https://zozimus.com/how-to-track-a-button-click-event-in-google-analytics-using-google-tag-manager/)
