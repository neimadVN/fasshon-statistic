const _ = require('lodash');

UTILS = {};

UTILS.createQueryPointerTo = (className, objectId) => {
    if (className === 'User') {
        className = '_User';
    }

    return className + '$' + objectId;
};

module.exports = UTILS;