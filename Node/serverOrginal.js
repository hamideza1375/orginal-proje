const mongoose = require('mongoose');
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config/config.env" });
const { setHeaders } = require("./middleware/headers");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const fileUpload = require("express-fileupload");
const course = require("./router/courseRouter");
const user = require("./router/userRouter");


const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(setHeaders);
app.use(express.static("public"));
app.use(express.static("node_modules"));


app.use(expressLayout);
app.set('view engine', 'ejs');
app.set("layout", "./mainLayout");
app.set('views', './views');


//* Session
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),

}));

app.use(fileUpload());

//* Flash
app.use(flash()); //req.flash





app.use(course)
app.use(user)




app.use((req, res) => {
    res.send("<h1 style='text-align:center;color:red; font-size:55px'> 404 </h1>");
});






mongoose.connect('mongodb://localhost:27017/amozesh',
    {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('db connected'))
    .catch((err) => console.error('db not connected', err));





const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

