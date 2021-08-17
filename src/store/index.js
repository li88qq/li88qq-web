import loginStore from "./modules/loginStore";

export function setupStore(app) {
    app.use(loginStore);
}

export {loginStore}

