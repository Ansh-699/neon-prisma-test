const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); 
const cors = require('cors');
app.use(cors());





dotenv.config();

const app = express();
const port = process.env.PORT ;
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});