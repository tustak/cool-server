import {MongoClient, ObjectId} from 'mongodb'
const MONGO_URL = 'mongodb://localhost:27017/tustak'

var db;
var Users;
var Items;

const getModels = async () => {
	try {
	    db = await MongoClient.connect(MONGO_URL)

	    Users = db.collection('users')
	    Items = db.collection('items')
	    return {Users, Items}
	}
	catch (e) {
	    console.log(e)
	}
}

export default getModels