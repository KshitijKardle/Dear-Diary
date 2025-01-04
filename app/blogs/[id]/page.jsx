"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
