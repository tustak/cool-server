const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

function validateInput(data) {
    let errors = {};

    let keys = Object.keys(data);

    keys.map(k => {

        if (k === 'email') {
            if (!Validator.isEmail(data[k])) {
                errors[k] = 'Email is invalid';
            }
        }

        if (k === 'repeatPassword') {
            if (!Validator.equals(data.password, data.repeatPassword)) {
                errors[k] = 'Passwords must match'
            }
        }

        if (Validator.isEmpty(data[k])) {
            errors[k] = k + ' is required';
        }

        return null

    });
    return errors
}

module.exports = validateInput;