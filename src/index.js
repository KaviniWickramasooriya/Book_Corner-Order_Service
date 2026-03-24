const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('./config/db');

const orderRoutes = require('./routes/order');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Order Service running on http://localhost:${PORT}`);
});