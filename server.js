const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users'); // ✅ 保留一处！

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes); // ✅ 保留一处！

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(process.env.PORT || 4000, () => console.log('Server is running'));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
