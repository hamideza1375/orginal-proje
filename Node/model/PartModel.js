const mongoose = require('mongoose');


const PartCourse = new mongoose.Schema({
    partTitle: { type: String, required: true },
    partPrice: { type: Number, required: true },
    partVideoUrl: { type: String, required: true },
    partInfo: { type: String, required: true },
    partLike: { type: Boolean, default: false },
    partId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" }
});


module.exports = mongoose.model("comment", PartCourse);