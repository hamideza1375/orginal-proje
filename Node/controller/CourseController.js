var fs = require('fs');
const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
// const CommentModel = require('../model/SchamaMessageModels');
const { CourseModel, LikeModel } = require('../model/CourseModel');
// const { LikeModel } = require('../model/LikeModel');
const { courseSchema, commentSchema, partSchema } = require('../validator/courseValid');
const PartModel = require('../model/PartModel');





class CourseController {


  async createCourse(req, res) {
    try {

      await courseSchema.validate(req.body, { abortEarly: false })
      const videoUrl = req.files ? req.files.videoUrl : {};
      const fileName2 = `${shortId.generate()}_${videoUrl.name}`;
      fs.writeFileSync(`${appRoot}/public/upload/${fileName2}`, videoUrl.data);

      const imageUrl = req.files ? req.files.imageUrl : {};
      const fileName = `${shortId.generate()}_${imageUrl.name}`;
      await sharp(imageUrl.data).toFile(`${appRoot}/public/upload/${fileName}`)
      const course = await new CourseModel({ title: req.body.title, info: req.body.info, price: req.body.price, videoUrl: fileName2, imageUrl: fileName, userId: req.user.userId }).save();
      res.status(200).json({ course })
    }
    catch (err) {
      res.status(400).send(err)
      console.log(err)
    }
  }

  // در شروع هشت سال دفاع مقدس ما یک برنامه نویس php کار نداشتیم تا قادر به شکست پروژه های شیمیایی صدام شود وهمان طور که مستجضر هستین عراق بمب های شیمیایی خود را از طریق html میزد و با php و asp.netCorde آن را ردیابی و رهگیری میکرد


  async getCourses(req, res) {
    try {
      const courses = await CourseModel.find();
      res.status(200).json({ courses });
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }

  }




  async getcourseId(req, res) {
    try {
      const course = await CourseModel.findById(req.params.id);
      res.status(200).send({ course })
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }

  }




  async editCourse(req, res) {
    try {
      const course = await CourseModel.findById(req.params.id);
      const { title, price, info } = req.body
      if (req.files) {
        let fileName = ""
        if (req.files.imageUrl) {
          const imageUrl = req.files.imageUrl;
          fileName = `${shortId.generate()}_${imageUrl.name}`;
          await sharp(imageUrl.data).toFile(`${appRoot}/public/upload/${fileName}`)
          fs.unlinkSync(`${appRoot}/public/upload/${course.imageUrl}`)
        }
        else fileName = course.imageUrl

        let fileName2 = ""
        if (req.files.videoUrl) {
          const videoUrl = req.files.videoUrl;
          fileName2 = `${shortId.generate()}_${videoUrl.name}`;
          fs.writeFileSync(`${appRoot}/public/upload/${fileName2}`, videoUrl.data);
          fs.unlinkSync(`${appRoot}/public/upload/${course.videoUrl}`)
        }
        else fileName2 = course.videoUrl

        course.title = title;
        course.price = price;
        course.info = info;
        course.imageUrl = fileName;
        course.videoUrl = fileName2;
        await course.save();
        res.status(200).json({ course })
      }
      else {
        course.title = title;
        course.price = price;
        course.info = info;
        course.imageUrl = course.imageUrl;
        course.videoUrl = course.videoUrl;
        await course.save();
        res.status(200).json({ course })
      }
    }
    catch (err) { console.log(err) }
  }



  async deleteCourse(req, res) {
    try {
      // const like = await LikeModel.findOne({ courseId: req.params.id });
      // await LikeModel.findByIdAndRemove(like._id)
      
      const course = await CourseModel.findById(req.params.id);
      const del = await CourseModel.findByIdAndRemove(req.params.id)
      fs.unlinkSync(`${appRoot}/public/upload/${course.imageUrl}`)
      fs.unlinkSync(`${appRoot}/public/upload/${course.videoUrl}`)
      res.status(200).send({ course });
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }




  async partCourse(req, res) {
    try {
      // await partSchema.validate(req.body, { abortEarly: false });

      const partVideoUrl = req.files ? req.files.partVideoUrl : {};
      const fileName2 = `${shortId.generate()}_${partVideoUrl.name}`;
      fs.writeFileSync(`${appRoot}/public/upload/${fileName2}`, partVideoUrl.data);

      const part = await new PartModel({ partId: req.params.id, partTitle: req.body.partTitle, partInfo: req.body.partInfo, partPrice: req.body.partPrice, partVideoUrl: fileName2 }).save();
      res.send({ part });
    }
    catch (err) {
      res.status(400).send(err)
      console.log(err)
    }
  }





  async editPartCourse(req, res) {
    try {
      const part = await PartModel.findById({ _id: req.params.id });
      const { partTitle, partPrice, partInfo } = req.body
      if (req.files) {

        let fileName2 = ""
        if (req.files.partVideoUrl) {
          const partVideoUrl = req.files.partVideoUrl;
          fileName2 = `${shortId.generate()}_${partVideoUrl.name}`;
          fs.unlinkSync(`${appRoot}/public/upload/${part.partVideoUrl}`)
          fs.writeFileSync(`${appRoot}/public/upload/${fileName2}`, partVideoUrl.data);
        }
        else fileName2 = course.partVideoUrl

        part.partTitle = partTitle;
        part.partPrice = partPrice;
        part.partInfo = partInfo;
        part.partVideoUrl = fileName2;
        await part.save();
        res.status(200).json({ part })
      }
      else {
        part.partTitle = partTitle;
        part.partPrice = partPrice;
        part.partInfo = partInfo;
        part.partVideoUrl = part.partVideoUrl;
        await part.save();
        res.status(200).json({ part })
      }
    }
    catch (err) {
      res.status(400).json({ part: err })
      console.log(err)
    }
  }




  async getPartCourse(req, res) {
    try {
      const part = await PartModel.find({ partId: req.params.id });
      res.send({ part });
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }


  async getSinglePartCourse(req, res) {
    try {
      const part = await PartModel.findById({ _id: req.params.id });
      res.send({ part });
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }



  
  async commentCourse(req, res) {
    try {
    const { fullname, email, message } = req.body;

      const course = await  CourseModel.findById({_id: req.params.id})
      const user = course.comment.push({ fullname, email, message });
      course.save()
      res.status(200).send({ user })
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }


  async getCommentCourse(req, res) {
    try {
      const course = await CourseModel.findById({ _id: req.params.id });
      const comment = course.comment;
      res.status(200).json({ comment })
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }









  async editLikeCourse(req, res) {
    try {
      const course = await CourseModel.findById({ _id: req.params.id });
      const ind = course.like.findIndex((l) => (l.userId == req.user.userId))
      if (!course.like[ind]) {
        course.like.push({ like: req.body.like, courseId: req.params.id, userId: req.user.userId  })
        await course.save()
        return res.status(200).send({ like: true })
      }
      else {
        course.like[ind].like = req.body.like
        course.save()
        return res.status(200).send({ like: course.like[ind].like })
      }
    } catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }




  async getTrueLike(req, res) {
    try {
      const course = await CourseModel.findById({ _id: req.params.id});
      const ind = course.like.findIndex((l) => (l.userId == req.user.userId))
      course.like[ind].like     
      //  
      res.status(200).send({ like2: course.like[ind].like })
    }
    catch (err) {
      console.log(err)
      res.status(400).send("error")
    }
  }



























  // async commentCourse(req, res) {
  //   try {
  //     // await commentSchema.validate(req.body, { abortEarly: false });
  //     const { fullname, email, message /*,recaptcha*/ } = req.body;
  //     const user = await new CommentModel({ fullname, email, message, commentId: req.params.id }).save();
  //     // sendEmail(email, fullname,
  //     //    "پیام از طرف وبلاگ",
  //     //     `$<p>{message} این پ</p>
  //     //      <br/> ایمیل کاربر : ${email}`);
  //     // if (parseInt(req.body.captcha) === CAPTCHA_NUM)
  //     res.status(200).send({ user })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }


  // async getCommentCourse(req, res) {
  //   try {
  //     const comment = await CommentModel.find({ commentId: req.params.id });
  //     res.status(200).json({ comment })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }


































  // async editLikeCourse(req, res) {
  //   try {
  //     const finsLike = await LikeModel.findOne({ courseId: req.params.id, userId: req.user.userId });

  //     if (!finsLike) {
  //       const createLike = await new LikeModel({ like: req.body.like, courseId: req.params.id, userId: req.user.userId }).save();

  //       const course = await CourseModel.findById({ _id: req.params.id});
  //       const finsCourse = course.like.push({ like: req.body.like, courseId: req.params.id, userId: req.user.userId  })
  //       await course.save()

  //       return res.status(200).send({ like: createLike.like })
  //     }
  //     else {
  //       finsLike.like = req.body.like
  //       await finsLike.save()

  //       const course = await CourseModel.findById({ _id: req.params.id });
  //       const ind = course.like.findIndex((l) => ( l.userId == req.user.userId  ))
  //       course.like[ind].like = req.body.like
  //       console.log(ind);


  //       course.save()
  //       return res.status(200).send({ like: finsLike })
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }












// db.additionalsubject.find({subject:{$all:['arts','music']}})  



  // async editLikeCourse(req, res) {
  //   try {
  //     const finsLike = await CourseModel.findOne({ _id: req.params.id, like: [{userId:req.user.userId}] })

  //     if (!finsLike) {
  //       const course = await CourseModel.findById({ _id: req.params.id});
  //       course.like.push({ like: req.body.like, userId: req.user.userId  })
  //       console.log('create')
  //       course.save()
  //       return res.status(200).send({ like: course })
  //     }
  //     else {
  //       finsLike.like.like= req.body.like
  //       console.log('edit')
  //       finsLike.save()
  //       return res.status(200).send({ like: finsLike })

  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }





  // async getLikeCourse(req, res) {
  //   try {
  //     const like = await CourseModel.findById({ _id: req.params.id });
  //     console.log(like)
  //     res.status(200).send({ like })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }



  // async getTrueLike(req, res) {
  //   try {
  //     const like2 = await CourseModel.findOne({ _id: req.params.id, like: {userId: req.user.userId }});
  //     console.log(like2)
  //     res.status(200).send({ like2: (like2.like) ? (true) : (false) })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }













  
  // async editLikeCourse(req, res) {
  //   try {
  //     const finsLike = await LikeModel.findOne({ courseId: req.params.id, userId: req.user.userId });
    
  //     if (!finsLike) {
  //       const course = await CourseModel.findOne({ _id: req.params.id});
  //       course.like.push({ like: req.body.like })
  //       course.save()
  //       const createLike = await new LikeModel({ like: req.body.like, courseId: req.params.id, userId: req.user.userId }).save();
  //       return res.status(200).send({ like: createLike.like })
   
  //     }
  //     else {
  //       const course = await CourseModel.findOne({ _id: req.params.id });
  //       course.like.like= req.body.like
  //       course.save()
  //       finsLike.like = req.body.like
  //       await finsLike.save()
  //       return res.status(200).send({ like: finsLike })
    
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }








   // async createCourse(req, res) {
  //   try {
  //     const like = await LikeModel({ like: req.body.like, courseId: req.params.id, userId: req.user.userId }).save();
  //     res.status(200).send({ like })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }


  // const createLike = await CourseModel.findById({ _id: req.params.id });
      // const like = course.like.push({like:req.body.like})
  //     createLike.like.save()







  // async editLikeCourse(req, res) {
  //   try {

  //     const course = await CourseModel.findById({ _id: req.params.id  });

  //     const like = course.like


      
  //     course.like.push({like:req.body.like})
  //     course.save()
  //     // const editLike = await LikeModel.findById({ _id: createLike.id });

  //   res.status(200).send({ like})
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }


  // async getLikeCourse(req, res) {
  //   try {
  //     // const like1 = await LikeModel.findOne ({ userId: req.user.userId, courseId: req.params.id});
  //     const course = await CourseModel.findById({ _id: req.params.id });
  //     const like = course.like
  //     res.status(200).send({like})
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }















  // async editLikeCourse(req, res) {
  //   try {
  //     const course = await CourseModel.findById({ _id: req.params.id });

  //     const like = course.like.push({ like: req.body.like })
  //     course.save()
  //     // const editLike = await LikeModel.findById({ _id: createLike.id });

  //     res.status(200).send({ like })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }


  // async getLikeCourse(req, res) {
  //   try {
  //     // const like1 = await LikeModel.findOne ({ userId: req.user.userId, courseId: req.params.id});
  //     const course = await CourseModel.findById({ _id: req.params.id });
  //     const like = course.like
  //     res.status(200).send({ like })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(400).send("error")
  //   }
  // }




  // async downVideo(req, res) {

  //  const downloader = new Downloader({
  //   url: `http://localhost:4000/upload/${req.body.downVideo}`,

  //   directory: `${appRoot}/public/upload2`,
  //  })
  //  try {
  //   const down = await downloader.download();
  //   res.send('good')
  //  }
  //  catch (error) { console.log('Download failed', error) }

  // }

}
module.exports = new CourseController();
