import {createLoginGuard} from "./loginGuard";

export function setupGuard(router) {
    createLoginGuard(router);
}