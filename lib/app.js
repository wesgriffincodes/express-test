const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');


app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/users', userRoutes);



app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
