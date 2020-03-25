const express = require('express');
const app = express();
const currency = require('./services/Currency');

/*app.all('*', (req, res) => {
   currency.getCurrencyRate();
   res.status(200).send('done');
});*/

app.use("/", require("./controllers"));

const server = app.listen('3500');
server.on('uncaughtException', err => {
    console.log(err);
});