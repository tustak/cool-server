'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _graphql = require('graphql');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidationError = function (_GraphQLError) {
		_inherits(ValidationError, _GraphQLError);

		function ValidationError(errors) {
				_classCallCheck(this, ValidationError);

				if (typeof errors === 'string') {
						errors = [errors];
				}

				var _this = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, errors[0]));

				_this.state = errors.reduce(function (result, error) {
						if (Object.prototype.hasOwnProperty.call(result, error.key)) {
								result[error.key].push(error.message);
						} else {
								result[error.key] = [error.message];
						}
						return result;
				}, {});
				return _this;
		}

		return ValidationError;
}(_graphql.GraphQLError);
/*

class ValidationError extends Error {
	constructor(errors) {
		super('errors')
		this.message = errors
	}

	getErrors(){
		state = errors
	}

		this.state = errors.reduce((result, error) => {
			if (Object.prototype.hasOwnProperty.call(result, error.key)) {
		    	result[error.key].push(error.message)
		    } else {
		        result[error.key] = [error.message]
		    }
		    return result
		}, {})
}

*/

exports.default = ValidationError;