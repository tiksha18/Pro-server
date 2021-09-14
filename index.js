const express = require("express");
// import bodyParser from 'body-parser';
const cors = require('cors');
// import mongoose from 'mongoose';
const userRoutes = require('./routes/users.js');

const app = express();

// app.use(bodyParser.json({ limit : "30mb", extended : true }));
// app.use(bodyParser.urlencoded({ limit : "30mb", extended : true }));
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

app.use('/user', userRoutes);

//const CONNECTION_URL = 'mongodb+srv://cool-user:importantuser@cluster0.duav5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// const PORT = process.env.PORT || 5000;

// mongoose.connect( CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology : true })
//     .then( () => app.listen(PORT, () => console.log(`Server started at port : ${PORT}`)))
//     .catch( (error) => console.log(error.message));

app.listen(7000, () =>
{
    console.log("Server started at port 7000");
})