const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
