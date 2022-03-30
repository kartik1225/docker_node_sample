const express = require('express');
const mongoose = require('mongoose');
const {MONGO_IP, MONGO_USER, MONGO_PASSWORD, MONGO_PORT} = require("./config/config");
const app = express();

const dbUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/test?authSource=admin`;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true,}).then((r) => {
    console.log(`db connected$ ${dbUrl}`);
}).catch((e) => {
    console.log('something went wrong while connecting with database');
});


const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
});

const User = mongoose.model('user', UserSchema);


app.get('/new/:id', async (req, res) => {
    const {id} = req.params;
    const user = new User({name: id});
    await user.save();
    res.send(user);
})

app.get('/all', async (req, res) => {
    const result = await User.find();
    return res.send(result);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`app is connected at port ${port}`)
})
