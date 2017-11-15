import { GraphQLError } from 'graphql'


class ValidationError extends GraphQLError {
  constructor(errors) {
  	if(typeof errors === 'string') {
  		errors = [errors]
  	}
    super(errors[0]);
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
}
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

export default ValidationError