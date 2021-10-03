const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
    host: "mail.ghorbany.dev",
    port: 465,
    secure: true,
    auth: {
        user: "toplearn@ghorbany.dev",
        pass: "toplearn123456",
    },
    tls: {
        rejectUnauthorized: false,
    },
});


exports.sendEmail = (email, fullname, subject, message) => {
    const transporter = nodeMailer.createTransport(transporterDetails);
    transporter.sendMail({
        from: "toplearn@ghorbany.dev",
        to: email,
        subject: subject,
        html: `<div style='background:lightblue;width:30%;text-center;padding:6px;border-radius:8px;'><h1 style='color:red;'> سلام ${fullname}</h1><p style='color:blue;'>${message}</p></div>`,
    },
        (err, info) => {
            if (err) return console.log(err);
            console.log(info);
        });
};



// exports.sendEmail = (email, fullname, subject, message) => {
// const transporter = nodeMailer.createTransport(transporterdetails);
// transporter.sendMail({
//     from: "toplearn@ghorbany.dev",
//     to: "reza.attar1375@gmail.com",
//     subject: "Nodemailer Test",
//     text: "Simple Test Of Nodemailer",
// },
//     (err, info) => {
//         if (err) return console.log(err);
//         console.log(info);
//     });
// }
