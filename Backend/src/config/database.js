const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo';
// const url = 'mongodb+srv://GuScarpim:12345@cluster0-edmvi.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true';
mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;