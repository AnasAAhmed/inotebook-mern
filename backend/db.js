
const mongoose = require('mongoose')
const mongoURI = process.env.MONGOURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
}
module.exports = connectToMongo
