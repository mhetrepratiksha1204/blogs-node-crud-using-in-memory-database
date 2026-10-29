const blogsController = require("../controller/controller")

const express= require("express")
const router= express.Router()

router.get("/", blogsController.sendBlogs)
router.get("/:id", blogsController.sentBlogsId)
router.post("/", blogsController.cretorBlog)
router.patch("/:id", blogsController.updateBlog)
router.delete("/:id", blogsController.removeBlogs)




module.exports = router;



