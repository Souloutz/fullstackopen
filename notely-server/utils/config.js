require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    PORT,
    MONGODB_URI,
    NODE_ENV,
};