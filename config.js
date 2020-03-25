module.exports = {
    dbConnect: {
        port: 27017,
        host: '127.0.0.1'
    },
    //delay 60 min
    currencyUpdateDelay: 60 * 60 * 1000,
    jwtSecret: "super_secret_key",
    jwtExpires: 60 * 60, // 1 hour
    tokenName: "auth_token",
    currencyHistoryLenght: 100
};