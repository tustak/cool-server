import {MongoClient, ObjectId} from 'mongodb'
//const MONGO_URL = 'mongodb://localhost:27017/tustak'
const MONGO_URL = process.env.mongoURL || 'mongodb://localhost:27017/tustak'

var db;
var Users;
var Items;
var Views;

const getModels = async () => {
	try {
	    db = await MongoClient.connect(MONGO_URL)

	    Users = db.collection('users')
	    Items = db.collection('items')
	    Views = db.collection('views')
	    return {Users, Items, Views}
	}
	catch (e) {
	    console.log(e)
	}
}

export default getModels