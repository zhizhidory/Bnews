let express = require("express")
let path =require("path")
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let NewsAPIRouter = require('./API/news');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/news', NewsAPIRouter);

app.listen(3000, function () {
    console.log('Example Nodejs Express listening on port 3000!');
});
 