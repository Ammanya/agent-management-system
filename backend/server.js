const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const taskRoutes = require('./routes/taskRoutes'); 


app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/csv', csvRoutes);
app.use('/api/tasks', taskRoutes); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => console.log('MongoDB connection error:', err));
