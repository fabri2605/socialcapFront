"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.i = void 0;
/** Function similar to python format used in i() context
 *  ex: tx = format("I am {} {}", names, surnames);
 *
 */
function format(template, ...args) {
    let i = 0;
    return template.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
}
exports.format = format;
/**
 * Helper which provides a context to the format function,
 * so we can define messages with placeholders:
 *
 *  , my_full_name: i("I am {} {}")
 *
 * and we use it as:
 *
 *    import { i as _ } from "~/i18n/messages"
 *    ...
 *    const names = "Mario", surnames = "Zito";
 *    console.log( _.my_full_name(names, surnames) );
 */
const i = (template) => {
    return (...args) => format(template, ...args);
};
exports.i = i;
