const mongoDB = require("mongodb").MongoClient;


const db = {
    db: null
}

const connect = (done) => {
    const url = 'mongodb://localhost:27017';
    const client = new mongoDB(url);

    client.connect((err, mongo) => {
        if (err) done(err);
        db.db = mongo.db('login_system');
        done()
    })
    
}

const user = () => db.db.collection('user')
const admin = () => db.db.collection('admin')



module.exports = { user,admin, connect };