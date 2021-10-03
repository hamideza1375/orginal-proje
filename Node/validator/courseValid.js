const Yup = require("yup");



exports.courseSchema = Yup.object().shape({
    title: Yup .string().required(),

    price: Yup.number().required(),

    info: Yup.string().required(),

});



exports.commentSchema = Yup.object().shape({
    fullname: Yup.string().required(),

    email: Yup.string().email().required(),

    message: Yup.string().min(4).max(600).required(),

    recaptcha: Yup.string().required()

});


exports.partSchema = Yup.object().shape({
    partTitle: Yup.string().required(),

    partInfo: Yup.string().required(),
});