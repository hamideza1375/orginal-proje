const mongoose = require('mongoose');
// const { LikeModel } = require('./LikeModel');




const CommenteModel = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" }

});



const LikeModel = new mongoose.Schema({
    like: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user1" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course1" },
});

exports.LikeModel = mongoose.model("like", LikeModel);



const CourseModel = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    videoUrl: { type: String, required:true },
    imageUrl: { type: String, required:true },
    info: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    userLikeId: { type: mongoose.Schema.Types.ObjectId, ref: "user1" },
    like: [LikeModel],
    comment: [CommenteModel]
});

exports.CourseModel = mongoose.model("courses", CourseModel);