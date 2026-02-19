import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

/* =========================
   TYPES
========================= */
interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  created_at: string;
}

const API_URL = "http://localhost:5000/api/blogs";
const IMAGE_BASE = "http://localhost:5000";

/* =========================
   COMPONENT
========================= */
const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "General",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* =========================
     FETCH BLOGS
  ========================= */
  const fetchBlogs = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* =========================
     CREATE / UPDATE
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);

    const url = editing ? `${API_URL}/${editing.id}` : API_URL;
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    setOpen(false);
    setEditing(null);
    setImageFile(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "General",
    });

    fetchBlogs();
  };

  /* =========================
     DELETE BLOG
  ========================= */
  const deleteBlog = async (id: number) => {
    if (!confirm("Delete this blog?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBlogs();
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>

        {user.role === "admin" && (
          <button
            onClick={() => {
              setForm({
                title: "",
                excerpt: "",
                content: "",
                category: "General",
              });
              setEditing(null);
              setOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <Plus size={16} /> Add Blog
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            {/* <th className="p-3">Author</th> */}
            <th className="p-3">Date</th>
            <th className="p-3 w-24">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-3">
                {b.image && (
                  <img
                    src={`${IMAGE_BASE}${b.image}`}
                    alt={b.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-3 font-medium">{b.title}</td>
              <td className="p-3">{b.category}</td>
              {/* <td className="p-3">{b.author}</td> */}
              <td className="p-3">
                {new Date(b.created_at).toLocaleDateString()}
              </td>
              <td className="p-3 flex gap-2">
                {user.role === "admin" && (
                  <>
                    <button
                      onClick={() => {
                        setEditing(b);
                        setForm({
                          title: b.title,
                          excerpt: b.excerpt,
                          content: b.content,
                          category: b.category,
                        });
                        setOpen(true);
                      }}
                      className="text-blue-600"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => deleteBlog(b.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 w-full max-w-xl rounded space-y-4 relative"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold">
              {editing ? "Edit Blog" : "Add Blog"}
            </h2>

            <input
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <textarea
              required
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <textarea
              required
              placeholder="Content"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              className="w-full border p-2 rounded h-32"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Save Blog
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
