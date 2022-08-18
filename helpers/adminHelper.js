const { ObjectId } = require("mongodb");
const { user, admin } = require("../connection/connect")
const passwordHash = require('password-hash')

module.exports = {
    login: ({ username, password }) => {
        return new Promise(async (resolve, reject) => {
            let findUser = await admin().findOne({ username })
            if (!findUser) {
                reject({ success: false, msg: 'user' })
            }
            let pass = await passwordHash.verify(password, findUser?.password);
            console.log(pass);
            if (pass) {
                console.log(pass);
                delete findUser.password
                resolve({ success: true, user: findUser })
            } else {
                reject({ success: false, msg: 'password' })
            }
        })
    },
    signup: ({ name, username, email, password }) => {
        return new Promise(async (resolve, reject) => {
            let findUser = await admin().findOne({ $or: [{ username }, { email }] })
            if (findUser?.username == username) {
                reject({ success: false, msg: 'username' })
            } else if (findUser?.email == email) {
                reject({ success: false, msg: 'email' })
            } else {
                password = await passwordHash.generate(password);
                admin().insertOne({ name, username, email, password }).then((res) => {
                    resolve({ success: true })
                    console.log(res);
                })
            }
        })
    },
    getUserData: () => {
        return new Promise(async (resolve, reject) => {
            let users = await user().find({}, { password: 0 }).toArray();
            resolve(users);
        })
    },
    getOneUser: (_id) => {
        return new Promise(async (resolve, reject) => {
            let userdata = await user().findOne({ _id: ObjectId(_id) })
            delete userdata.password
            resolve(userdata)
        })
    },
    editUSer: ({ name, email, username, _id }) => {
        return new Promise(async (resolve, reject) => {
            let userdata = await user().findOne({ _id: { $ne: ObjectId(_id) }, $or: [{ username }, { email }] });
            if (userdata?.username == username) {
                reject({ success: false, msg: 'username' })
            } else if (userdata?.email == email) {
                reject({ success: false, msg: 'email' })
            } else {
                user().updateOne({ _id: ObjectId(_id) }, { $set: { name, username, email } }).then((res) => {
                    resolve({ success: true })
                })
            }
        })
    },
    searchUser: (username) => {
        return new Promise(async (resolve, reject) => {
            let users = await user().findOne({ username }, { password: 0 });
            resolve(users);
        })
    },
    deleteUser: (_id) => {
        console.log(_id);
        return new Promise((resolve, reject) => {
            user().deleteOne({ _id: ObjectId(_id) }).then(async (res) => {
                let users = await user().find().toArray()
                resolve(users)
            })
        })
    }
}