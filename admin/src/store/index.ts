import type {App} from 'vue';
import {createPinia} from 'pinia';
import {useUserStore} from './modules/user'

export function setupStore(app: App<Element>) {
    const store = createPinia();
    app.use(store);
}

export {useUserStore};