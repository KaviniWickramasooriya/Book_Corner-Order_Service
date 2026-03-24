const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Order Service MongoDB Connected → BookCorner'))
  .catch(err => console.error('❌ MongoDB Connection Failed', err.message));

module.exports = mongoose;