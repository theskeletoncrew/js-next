import mime from 'mime';
// eslint-disable-next-line no-control-regex
export const removeEmptyChars = (value) => value.replace(/\u0000/g, '');
export const padEmptyChars = (value, chars) => value.padEnd(chars, '\u0000');
export const tryOr = (callback, defaultValue) => {
    try {
        return callback();
    }
    catch (error) {
        return defaultValue;
    }
};
export const tryOrNull = (cb) => tryOr(cb, null);
export const chunk = (array, chunkSize) => array.reduce((accumulator, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!accumulator[chunkIndex]) {
        accumulator[chunkIndex] = [];
    }
    accumulator[chunkIndex].push(item);
    return accumulator;
}, []);
export const zipMap = (left, right, fn) => left.map((t, index) => fn(t, right?.[index] ?? null, index));
export const randomStr = (length = 20, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    let result = '';
    const alphabetLength = alphabet.length;
    for (var i = 0; i < length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
    }
    return result;
};
export const getContentType = (fileName) => mime.getType(fileName);
export const getExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex < 0 ? null : fileName.slice(lastDotIndex + 1);
};
export const walk = (parent, cb, options) => {
    const recursiveWalk = (child) => walk(child, cb, options);
    if (parent && Array.isArray(parent)) {
        parent.forEach((child, index) => {
            cb(recursiveWalk, child, index, parent);
        });
    }
    else if (parent && typeof parent === 'object') {
        const keys = Object.keys(parent);
        if (options?.sortObjectKeys ?? true) {
            keys.sort();
        }
        keys.forEach((key) => {
            const child = parent[key];
            cb(recursiveWalk, child, key, parent);
        });
    }
};
//# sourceMappingURL=common.js.map