const db = require("../config/db");

/* =========================
   GET ALL BLOGS (PUBLIC)
========================= */
exports.getBlogs = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM advanceforteblogs ORDER BY created_at DESC"
  );
  res.json(rows);
};

/* =========================
   CREATE BLOG (ADMIN)
========================= */
exports.createBlog = async (req, res) => {
  const { title, excerpt, content, category } = req.body;

  const imagePath = req.file
    ? `/uploads/blogs/${req.file.filename}`
    : null;

  await db.query(
    `INSERT INTO advanceforteblogs
     (title, excerpt, content, category, image, author)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, excerpt, content, category, imagePath, req.user.name]
  );

  res.json({ message: "Blog created successfully" });
};

/* =========================
   UPDATE BLOG (ADMIN)
========================= */
exports.updateBlog = async (req, res) => {
  const { id } = req.params;

  let fields = { ...req.body };

  if (req.file) {
    fields.image = `/uploads/blogs/${req.file.filename}`;
  }

  await db.query(
    "UPDATE advanceforteblogs SET ? WHERE id=?",
    [fields, id]
  );

  res.json({ message: "Blog updated successfully" });
};

/* =========================
   DELETE BLOG (ADMIN)
========================= */
exports.deleteBlog = async (req, res) => {
  await db.query(
    "DELETE FROM advanceforteblogs WHERE id=?",
    [req.params.id]
  );
  res.json({ message: "Blog deleted successfully" });
};
