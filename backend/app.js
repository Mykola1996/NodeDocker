const express = require('express');
const mongoose = require('mongoose');


const { carRouter, userRouter } = require('./routes');
const { mainErrorHandler } = require("./errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRouter);
app.use('/users', userRouter);

app.use('*', (req, res, next) => {
    next(new Error('Route not fount'));
});

app.use(mainErrorHandler);
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        await app.listen(+process.env.PORT, process.env.HOST);
        console.log(`Server has started on port ${process.env.PORT}`);
    } catch (e) {
        console.log(e);
        console.log('Error!!!')
    }
}

start();