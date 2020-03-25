const rootPath = ('../');
const config = require(rootPath + 'config');
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const dbConfigs = config.dbConnect;

const Currencies = (function initSchema() {
    const currenciesScheme = new Schema({
        currencyData: Object,
        update: Date
    });
    initDbConnection();
    return mongoose.model("Currencies", currenciesScheme);
})();

const CurrenciesHistory = (function initSchema() {
    const historyScheme = new Schema({
        historyData: Object,
        update: Date
    });
    initDbConnection();
    return mongoose.model("CurrenciesHistory", historyScheme);
})();

function initDbConnection() {
    mongoose.connect(`mongodb://${dbConfigs.host}:${dbConfigs.port}/currencies`, { useNewUrlParser: true, useUnifiedTopology: true });
}

function addNewRate(data) {
    initDbConnection();
    const currenciesRate = new Currencies({
        currencyData: data,
        update: Date.now()
    });
    return new Promise((resolve, reject) => {
        currenciesRate.save(function(err, data){
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}

function getRate(options = {}) {
    initDbConnection();
    return new Promise((resolve, reject) => {
        Currencies.find(options, function(err, docs){
            if(err){
                reject(err);
            }
            resolve(docs);
        });
    });
}

function dropCollection(){
    return new Promise((resolve, reject) => {
        db.dropCollection("currencies", function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function addToHistory(data) {
    initDbConnection();
    const currenciesHistory = new CurrenciesHistory({
        historyData: data,
        update: Date.now()
    });
    return new Promise((resolve, reject) => {
        currenciesHistory.save(function(err, data){
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}

function getHistory() {
    initDbConnection();
    return new Promise((resolve, reject) => {
        CurrenciesHistory.find({}, function(err, docs){
            if(err){
                reject(err);
            }
            resolve(docs);
        });
    });
}

function deleteFromHistory() {
    CurrenciesHistory.findOne({}).sort('update').deleteOne().exec();
}

module.exports = {
    addNewRate,
    getRate,
    dropCollection,
    addToHistory,
    getHistory,
    deleteFromHistory
};

