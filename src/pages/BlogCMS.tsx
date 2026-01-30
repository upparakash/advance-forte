import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
}

const BlogCMS: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Results',
    image: '',
    author: 'Admin'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPost.id) {
      setPosts(posts.map(p => p.id === currentPost.id ? currentPost as BlogPost : p));
    } else {
      const newPost: BlogPost = {
        ...currentPost as BlogPost,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([newPost, ...posts]);
    }
    setCurrentPost({ title: '', excerpt: '', content: '', category: 'Results', image: '', author: 'Admin' });
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Blog Management</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
          >
            <Plus size={20} />
            New Blog Post
          </button>
        </div>

        {isEditing && (
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{currentPost.id ? 'Edit' : 'Create'} Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={currentPost.title}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Blog title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    required
                    value={currentPost.category}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Results">Results</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Programs">Programs</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                <input
                  type="url"
                  required
                  value={currentPost.image}
                  onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  required
                  rows={3}
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                <textarea
                  required
                  rows={10}
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full blog content"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                >
                  <Save size={20} />
                  {currentPost.id ? 'Update' : 'Publish'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentPost({ title: '', excerpt: '', content: '', category: 'Results', image: '', author: 'Admin' });
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/40 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-xs text-blue-600 font-semibold mb-2">{post.category}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentPost(post);
                      setIsEditing(true);
                    }}
                    className="flex-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-200 transition-all duration-300"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-200 transition-all duration-300"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && !isEditing && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blog posts yet. Create your first post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCMS;
