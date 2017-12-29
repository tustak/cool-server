import {MongoClient, ObjectId} from 'mongodb'
//const MONGO_URL = 'mongodb://localhost:27017/tustak'
const MONGO_URL = process.env.mongoURL || 'mongodb://localhost:27017/tustak'

var db;
var Users;
var Items;
var Views;
var Reviews;
var Activities;
var Messages;
var Conversations;
var Transactions;
var Requests;

const getModels = async () => {
	try {
	    db = await MongoClient.connect(MONGO_URL)

	    Users = db.collection('users')
	    Items = db.collection('items')
	    Views = db.collection('views')
	    Reviews = db.collection('reviews')
	    Activities = db.collection('activities')
	    Messages = db.collection('messages')
	    Conversations = db.collection('conversations')
	    Transactions = db.collection('transactions')
	    Requests = db.collection('requests')
	    return {Users, Items, Views, Reviews, Activities, Messages, Conversations, Transactions, Requests}
	}
	catch (e) {
	    console.log(e)
	}
}

export default getModels