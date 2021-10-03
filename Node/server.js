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
const { SchamaMessageModels } = require('./model/SchamaMessageModels');




const express = require("express");
const io = require("socket.io");
const app = express();





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





const server = app.listen(4000, (err) => { console.log("App Listen to port 3010") })





const ioo = io(server);









let users = []


ioo.on("connection", (socket) => {

  let iid = socket.id


  socket.on("online", async (data) => {
    socket.join(data.roomNumber);
    users.push({ id: socket.id, nickname: data.nickname, gender: data.gender, roomNumber: data.roomNumber });

    const msgModel = await SchamaMessageModels.find()
    ioo.sockets.emit("mongoMsg", msgModel);

    ioo.sockets.emit("online", users);
  });



  socket.on("chat message", async (message) => {
    let ttt = await new SchamaMessageModels({ ...message }).save()


    ioo.to(message.roomNumber).emit("chat message", { ...message });
  });


  socket.on("deleteOne", async (id, data) => {
    let message = await SchamaMessageModels.findOne({ id: id })

    message.msgNm.push({ name: data.name })
    message.save()

    socket.emit("deleteOne", id);
  });


  socket.on("deleteMsg", async (id) => {
    await SchamaMessageModels.deleteOne({ id: id })
    ioo.sockets.emit("deleteMsg", id);
  });



  socket.on("pvChat", (data) => {
    ioo.sockets.emit("pvChat", data, iid, users);
  });



  socket.on("typing", (data) => {
    socket.broadcast.in(data.roomNumber).emit("typing", data);
  });



  socket.on("disconnect", (idid) => {
    const users1 = users.filter((user) => user.id !== socket.id)
    ioo.sockets.emit("online", users = users1);
  })



  socket.on("delRemove", (idid) => {
    console.log(idid);
    const users1 = users.filter((user) => user.id !== socket.id)
    ioo.sockets.emit("online", users = users1);
    // ioo.sockets.emit("delRemove", users = users1 );
  })

});




