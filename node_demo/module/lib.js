exports.hello = 'hello';
exports.age = 27;

module.exports = function hello1() { }
setTimeout(() => {
    console.log(exports)
}, 1000);