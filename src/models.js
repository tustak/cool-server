import {MongoClient, ObjectId} from 'mongodb'
import config from '../config'
//const MONGO_URL = 'mongodb://localhost:27017/tustak'
const MONGO_URL = config.mongoURL

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