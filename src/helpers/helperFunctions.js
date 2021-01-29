const isObject = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}
const isArray = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor == Array;
}
const isString = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor == String;
}

module.exports = {
    isObject,
    isString,
    isArray
};