const rootPath = ('../');
const config = require(rootPath + 'config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfigs = config.dbConnect;

const Users = (function initSchema() {
    const usersScheme = new Schema({
        userName: String,
        pwd: String,
        created: Date
    });
    initDbConnection();
    return mongoose.model("Users", usersScheme);
})();

function initDbConnection() {
    return mongoose.connect(`mongodb://${dbConfigs.host}:${dbConfigs.port}/users`, { useNewUrlParser: true, useUnifiedTopology: true });
}

function createUser(data) {
    initDbConnection();
    const users = new Users({
        userName: data.userName,
        pwd: data.pwd,
        created: Date.now()
    });
    return new Promise((resolve, reject) => {
        users.save(function(err, data){
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}

function getUser(userName) {
    initDbConnection();
    return new Promise((resolve, reject) => {
        Users.find({userName}, function(err, docs){
            if(err){
                reject(err);
            }
            resolve(docs);
        });
    });
}

module.exports = {
    createUser,
    getUser
};

