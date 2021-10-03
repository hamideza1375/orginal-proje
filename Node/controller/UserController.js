const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var should = require('chai').should();
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);
const { sendEmail } = require("../config/mailer");
const UserModel = require('../model/UserModel');
const captchapng = require("captchapng");
let CAPTCHA_NUM = "";

const { userSchema } = require('../validator/userValid');
const PaymentModel = require('../model/PaymentModel');
const CourseModel = require('../model/CourseModel');





class UserController {

  async register(req, res) {
    try {
      // await userSchema.validate(req.body, { abortEarly: false })
      const { fullname, email, password } = req.body

      let userEmail = await UserModel.findOne({ email });
      if (userEmail)
        return res.status(400).send(" ایمیل موجود هست")

      let userFullname = await UserModel.findOne({ fullname });
      if (userFullname)
        return res.status(400).send(" نام کاربری موجود هست")

      const user1 = await UserModel.create({ fullname, email, password });
      // sendEmail(email, fullname, "خوش آمدی به وبلاگ ما", "خیلی خوشحالیم که به جمع ما ملحق شدی");
      return res.status(201).send({ message: "ثبت نام موفق آمیز بود" })
    } catch (err) {
      res.status(400).send(err)
      console.log(err)
    }
  }


  async login(req, res) {

  try{  let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('کاربری با این ایمیل یافت نشد');
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(400).send('کاربری با این پسورد یافت نشد');
     const users = {
        isAdmin: user.isAdmin,
        userId: user._id.toString(),
        email: user.email,
        fullname: user.fullname,
      }
    const token = await jwt.sign(users, "secret", {
      expiresIn: req.body.remember,
    });
    console.log(req.body.remember);
    // if (parseInt(req.body.captcha) === CAPTCHA_NUM)
  res.json({ token, userId: user._id.toString(),message:'موفق آمیز بود' });
 } catch(err){
   res.status(400).send(err)
   console.log(err)
 }
}


  async forgetPassword(req, res) {
    try{
    const { email } = req.body;
    console.log(email);
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "ایمیل موجود نیست" })
    }
    const resetLink = `http://localhost:3000/reset-password/${user._id}`;
    sendEmail(user.email, user.fullname, "فراموشی رمز عبور", `جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
    <a href="${resetLink}">لینک تغییر رمز عبور</a>`);
    res.status(200).send("good");
      }
  catch(err) {
    console.log(err)
    res.status(400).send("error")
  }
  }



  async resetPassword(req, res) {
    try{
    const { password, confirmPassword } = req.body;
    if(password === confirmPassword){
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.ststus(400).send("/404")
    user.password = password;
    await user.save();
    console.log("پسورد شما با موفقیت بروزرسانی شد")
      res.status(200).send("موفقیت بروزرسانی شد");}
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }


  async captcha(req, res) {
    try{
    CAPTCHA_NUM = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, CAPTCHA_NUM);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = Buffer.from(img, 'base64');
    res.send(imgbase64);
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }




  async confirmPayment(req, res) {
    try{
    const course = await CourseModel.findById(req.params.id);
    const response = await zarinpal.PaymentRequest({
      Amount: course.price.toString(),
      CallbackURL: 'http://localhost:4000/verifyPayment',
      Description: course.title,
      Email: req.user.email,
    });
    await new PaymentModel({
      user: req.user._id,
      fullname: req.user.fullname,
      email: req.user.email,
      title: course.title,
      price: course.price,
      paymentCode: response.authority
    }).save();
      console.log(response.url);
    res.status(200).send(response.url);
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }





  async verifyPayment(req, res) {
    try{
    const paymentCode = req.query.Authority;
    const status = req.query.Status;
    const payment = await PaymentModel.findOne({ paymentCode });
    const response = await zarinpal.PaymentVerification({
      Amount: payment.price, Authority: paymentCode
    });
    if (status === "OK") {
      payment.refId = response.RefID;
      payment.success = true;
      await payment.save();
      console.log(payment);
      res.render("./paymant", {
        pageTitle: "Pardakht",
        path: "/Pardakht",
        fullname: payment.fullname,
        email: payment.email,
        title: payment.title,
        price: payment.price,
        refId: response.RefID
      })
    } else {
      // res.send('<div style=" padding:3px 0 2rem; width:30%; border:1px solid silver; margin:5rem auto ; text-align:center"><h1 style="margin:1rem 0 2rem;" >خطا پرداخت انجام نشد</h1><button onclick="window.location.assign(`http://localhost:3000`)" style=" padding:6px; border:1px solid silver; border-radius:3%; background:yellow; text-decoration:none;">برگشت به صفحه اصلی</button></div>')
      res.send('<div style=" padding:3px 0 2rem; width:30%; border:1px solid silver; margin:5rem auto ; text-align:center"><h1 style="margin:1rem 0 2rem;" >خطا پرداخت انجام نشد</h1><button onclick="window.history.back()" style=" padding:6px; border:1px solid silver; border-radius:3%; background:yellow; text-decoration:none;">برگشت به صفحه اصلی</button></div>')
    }
       }
  catch(err) {
    console.log(err)
    res.status(400).send("error")
  }
  }

}


module.exports = new UserController();
