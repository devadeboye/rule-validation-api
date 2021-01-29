const isObject = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

const isArray = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor == Array;
}

const isString = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor == String;
}

function isNumber(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Number;
}

const isInvalidFieldType = (obj) => {            
    if (isObject(obj) === false && isArray(obj) ===false && isString(obj) === false){
        return true;
    }
}


module.exports = {
    isObject,
    isString,
    isArray,
    isInvalidFieldType,
    isNumber
};