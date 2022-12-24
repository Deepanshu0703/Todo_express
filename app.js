const express =require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};
const today = new Date();
const day = today.toLocaleDateString('en-US', options);
const year = today.getFullYear();

const items = ["Take Medicine","Solve Problem of the day","Do Workout"];
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index', {day: day , items: items, year: year});
});

app.post('/', (req, res) => {
    const item = req.body.item;
    items.push(item);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);


// 
// app.get('/', (req, res) => {
//     res.render('index', {day: day});
// });


// // app.get('/', (req, res) => {
// //     res.sendFile(__dirname + '/index.html');
// // });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// }
// );

