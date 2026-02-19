import React, { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  created_at: string;
}

const API_URL = "http://localhost:5000/api/blogs";
const IMAGE_BASE = "http://localhost:5000";

const BlogCardList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  const timeAgo = (date: string) => {
    const diff = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 30) return `${diff} days ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {blogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={`${IMAGE_BASE}${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />

                {/* CATEGORY BADGE */}
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {blog.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col justify-between">
                {/* DATE */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(blog.created_at)}
                  <span className="mx-2">•</span>
                  <Clock size={16} className="mr-2" />
                  {timeAgo(blog.created_at)}
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
                  {blog.title}
                </h2>

                {/* EXCERPT */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <a
                    href={`/blogs/${blog.id}`}
                    className="text-blue-600 font-semibold flex items-center hover:underline"
                  >
                    Read Full Article
                    <ArrowRight size={16} className="ml-2" />
                  </a>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Tag size={14} className="mr-1" />
                    {blog.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogCardList;
