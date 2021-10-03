const mongoose = require('mongoose');




const SchamaSender = new mongoose.Schema({
    name: String,
    gender: String
})

const SchamaMsgNm = new mongoose.Schema({
    name: String,
})


const SchamaMessageModels = new mongoose.Schema({
    msgNm: [SchamaMsgNm],
    id: Number,
    roomNumber: String,
    msg: String,
    sender: { type: SchamaSender },
    createdAt: { type: Date, default: new Date() },
})

exports.SchamaMessageModels = mongoose.model('messageqqq16h', SchamaMessageModels)
