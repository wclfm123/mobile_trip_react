/**
 * Created by WangChuan on 2017/9/2.
 */

/**
 * 克隆一个对象
 * @param obj 要克隆的对象
 * @return 克隆好的对象
 * */
// const _clone = (obj) => {
//     // Handle the 3 simple types, and null or undefined
//     if (null === obj || "object" != typeof obj) return obj;

//     // Handle Date
//     if (obj instanceof Date) {
//         var copy = new Date();
//         copy.setTime(obj.getTime());
//         return copy;
//     }

//     // Handle Array
//     if (obj instanceof Array) {
//         var copy = [];
//         for (var i = 0; i < obj.length; ++i) {
//             copy[i] = _clone(obj[i]);
//         }
//         return copy;
//     }

//     // Handle Object
//     if (obj instanceof Object) {
//         var copy = {};
//         for (var attr in obj) {
//             if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr]);
//         }
//         return copy;
//     }

//     throw new Error("Unable to copy obj! Its type isn't supported.");
// }
// export const clone = (obj) => {
//     return _clone(obj);
// }

/**
 * 简洁redux使用type
 */
const types = {};
let index = 0;
export const next = () => {
    return ++index;
};
export const type = (module, name) => {
    let moduleToUse = types[module];
    !moduleToUse && (moduleToUse = types[module] = {});
    !moduleToUse[name] && (moduleToUse[name] = next());
    return moduleToUse[name];
};
export const creator = (module) => {
    return (name) => type(module, name);
};
