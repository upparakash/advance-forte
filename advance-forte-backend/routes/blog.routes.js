const express = require("express");
const router = express.Router();
const blogCtrl = require("../controllers/blog.controller");
const upload = require("../middleware/uploadBlogImage");
const auth = require("../middleware/auth"); // admin auth

router.get("/", blogCtrl.getBlogs);

router.post(
  "/",
  auth,
  upload.single("image"),
  blogCtrl.createBlog
);

router.put(
  "/:id",
  auth,
  upload.single("image"),
  blogCtrl.updateBlog
);

router.delete("/:id", auth, blogCtrl.deleteBlog);

module.exports = router;
