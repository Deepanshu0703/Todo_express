const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const app = express();


//Mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });
const itemsSchema = new mongoose.Schema({
    name: String
});
const item = mongoose.model('item', itemsSchema);


app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};
const today = new Date();
const day = today.toLocaleDateString('en-US', options);
const year = today.getFullYear();

app.use(express.static('public'));

app.get('/', (req, res) => {

    item.find({}, (err, foundItems) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', { day: day, items: foundItems, year: year });
        }
    })
});

app.post('/', (req, res) => {
    const ite = req.body.item;
    const newItem = new item({
        name: ite
    });
    newItem.save();
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const id = req.body.checkbox;
    item.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
