const { user } = require("../connection/connect")
const passwordHash = require('password-hash')
let log = console.log

module.exports = {
    signup: (data) => {
        const { username, email, password } = data;
        return new Promise(async (resolve, reject) => {
            let finduser = await user().findOne({ $or: [{ email }, { username }] })
            if (!finduser) {
                data.password = await passwordHash.generate(password)
                user().insertOne(data).then(res => {
                    delete data.password;
                    resolve(data);
                })
            } else {
                if (finduser.username == username) {
                    reject('username')
                } else {
                    reject('email')
                }
            }
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            const { username, password } = data;
            user().findOne({ username }).then(async (data) => {
                if (data == null) {
                    reject({ msg: 'user',success:false })
                }

                let pass = await passwordHash.verify(password, data?.password)
                if (pass) {
                    resolve({ success: true,data })
                } else {
                    reject({ msg: 'password', success: false })
                }
            })
        })
    }
}