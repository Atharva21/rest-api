const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//MIDDLEWARE
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db!'));

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port: ${port}`));