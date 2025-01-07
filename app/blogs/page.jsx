"use client";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

const page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/pages");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="display flex flex-wrap justify-between px-6 mt-4 ">
        {posts.map((post, index) => (
          <Card
            key={post.id || index}
            id={post.id}
            title={post.title}
            content={post.content}
            date={new Date(post.date).toLocaleDateString("en-CA")}
          />
        ))}
      </div>
    </>
  );
};

export default page;
