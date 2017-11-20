const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const _ = require('lodash');

const alphanumeric = [
    'username',
    'postalCode',
    'address',
    'apartment',
];

const alpha = [
    'firstName',
    'lastName',
    'countryOfBirth',
    'countryOfResidence',
    'cityOfResidence',
    'gender',

];

const numeric = [
    'phoneCode',
    'phoneNumber',
    'radiusOfSearch',
];

function validateInput(data, allowEmpty=false) {
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

        if (k === 'dateOfBirth') {

        }

        if (_.includes(alphanumeric, k)) {
            if (!Validator.isAlphanumeric(data[k])) {
                errors[k] = 'Value can only include letters and numbers'
            }
        }

        if (_.includes(alpha, k)) {
            if (!Validator.isAlpha(data[k])) {
                errors[k] = 'Value can only include letters'
            }
        }

        if (_.includes(numeric, k)) {
            if (!Validator.isNumeric(data[k])) {
                errors[k] = 'Value can only include numbers'
            }
        }

        if (allowEmpty === false) {
            if (Validator.isEmpty(data[k])) {
                errors[k] = k + ' is required';
            }
        }

        return null

    });

    return errors
}

module.exports = validateInput;