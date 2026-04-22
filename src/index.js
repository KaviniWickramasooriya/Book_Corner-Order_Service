const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('./config/db');
require('dotenv').config(); // Load environment variables

const orderRoutes = require('./routes/order');

const app = express();

// SECURITY BEST PRACTICE 
app.use(helmet()); 

// CORS configuration is vital for cross-service communication [cite: 9, 10]
app.use(cors({
  origin: '*', // For production, replace with your frontend AWS URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Order Service running on http://localhost:${PORT}`);
});