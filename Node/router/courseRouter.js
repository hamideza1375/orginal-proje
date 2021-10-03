const router = require('express').Router();
const Course = require('../controller/CourseController');
const Auth = require('../middleware/Auth');


router.post('/createcourse', Auth, Course.createCourse);
router.get('/getcourses', Course.getCourses);
router.get('/getcourseId/:id', Course.getcourseId);
router.put('/editcourse/:id', Course.editCourse);
router.delete('/deletecourse/:id', Course.deleteCourse);


router.put('/editlikecourse/:id', Auth, Course.editLikeCourse);
router.get('/gettruelike/:id', Auth, Course.getTrueLike);


router.post('/partcourse/:id', Course.partCourse);
router.get('/getpartcourse/:id', Course.getPartCourse);
router.get('/getSinglePartCourse/:id', Course.getSinglePartCourse);


router.put('/editpartcourse/:id', Course.editPartCourse);


router.post('/commentcourse/:id', Course.commentCourse);
router.get('/getcommentcourse/:id', Course.getCommentCourse);
router.put('/editpartcourse/:id', Course.editPartCourse);







module.exports = router;
