const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const mongoUri = 'mongodb://mongodbacc:1wLvXuTBCeoC2i4yALjAB5PRoQgG5haNzGyijy8ozmmJjcIrIF2sknjMgmkgkrnk6mUT9QiosBIAihruTl3wIA%3D%3D@mongodbacc.mongo.cosmos.azure.com:10255/?ssl=true&appName=@mongodbacc@';

module.exports = () => mongoose.connect(mongoUri);
