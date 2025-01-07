"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";

export default function BlogPage() {
  const { id } = useParams(); // Get the dynamic route parameter
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/pages?id=${id}`); // Fetch blog by ID
        const data = await res.json();
        if (res.ok) {
          setBlog(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching the blog.");
        console.error(error);
      }
    }

    fetchBlog();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-2xl">
        <InfinitySpin />
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(0deg,_#222_1px,_transparent_1px)] bg-[size:100%_2rem] p-6 md:p-12">
      <article className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm rounded-lg p-8 shadow-xl">
        <header className="mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-serif text-gray-100">{blog.title}</h1>
          <time className="text-sm text-gray-100">{formattedDate}</time>
        </header>
        <div className="prose prose-invert prose-gray max-w-none">
          <p className="text-gray-300 leading-relaxed">{blog.content}</p>
        </div>
      </article>
    </div>
  );
}
