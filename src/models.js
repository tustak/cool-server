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

const getModels = async () => {
	try {
	    db = await MongoClient.connect(MONGO_URL)

	    const viewSchema = 

	    Users = db.collection('users')
	    Items = db.collection('items')
	    Views = db.collection('views')
	    Reviews = db.collection('reviews')
	    Activities = db.collection('activities')
	    Messages = db.collection('messages')
	    Conversations = db.collection('conversations')
	    return {Users, Items, Views, Reviews, Activities, Messages, Conversations}
	}
	catch (e) {
	    console.log(e)
	}
}

export default getModels