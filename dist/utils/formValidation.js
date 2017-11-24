'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');
var moment = require('moment');
var _ = require('lodash');

var alphanumeric = ['username', 'postalCode', 'address', 'apartment'];

var alpha = ['firstName', 'lastName', 'countryOfBirth', 'countryOfResidence', 'cityOfResidence'];

var numeric = ['phoneCode', 'phoneNumber', 'radiusOfSearch'];

var blacklist = [' áéíóúñ'];

function validateInput(data) {
    var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


    var errors = {};

    var keys = Object.keys(data);

    keys.map(function (k) {

        if (typeof data[k] !== 'string' && _typeof(data[k]) !== 'object') {
            data[k] = String(data[k]);
        }

        if (k === 'email') {
            if (!Validator.isEmail(data[k])) {
                errors[k] = 'Email is invalid';
            }
        }

        if (k === 'repeatPassword') {
            if (!Validator.equals(data.password, data.repeatPassword)) {
                errors[k] = 'Passwords must match';
            }
        }

        if (k === 'dateOfBirth') {
            var pattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
            if (!pattern.test(data[k])) {
                errors[k] = 'Invalid format.';
            } else {
                if (!moment(data[k], 'DD-MM-YYYY').isValid()) {
                    errors[k] = 'Invalid date. Probably you messed up date and month.';
                } else if (moment(data[k], 'DD-MM-YYYY').isBefore('1900-01-01')) {
                    errors[k] = 'Invalid date. Too old.';
                } else if (moment(data[k], 'DD-MM-YYYY').isAfter(moment())) {
                    errors[k] = 'Invalid date. It\'s on the future.';
                }
            }
        }

        if (k === 'gender') {
            if (data[k] !== 'Male' && data[k] !== 'Female' && data[k] !== 'LGBT' && data[k] !== '') {
                errors[k] = 'Invalid gender';
            }
        }

        if (_.includes(alphanumeric, k)) {
            if (!Validator.isAlphanumeric(Validator.blacklist(data[k], blacklist))) {
                errors[k] = 'Value can only include letters and numbers';
            }
        }

        if (_.includes(alpha, k)) {
            if (!Validator.isAlpha(Validator.blacklist(data[k], blacklist))) {
                errors[k] = 'Value can only include letters';
            }
        }

        if (_.includes(numeric, k)) {
            if (!Validator.isNumeric(Validator.blacklist(data[k], blacklist))) {
                errors[k] = 'Value can only include numbers';
            }
        }

        if (allowEmpty === false) {
            if (Validator.isEmpty(data[k])) {
                errors[k] = k + ' is required';
            }
        } else {
            if (data[k] === "") {
                delete errors[k];
            }
        }

        return null;
    });

    return errors;
}

module.exports = validateInput;