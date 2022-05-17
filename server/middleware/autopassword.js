const generator = require('generate-password');

let passwordGenerator = () => {
    return generator.generate({
        length: 6,
        strict: true,
        numbers: true
    });
}

module.exports = passwordGenerator