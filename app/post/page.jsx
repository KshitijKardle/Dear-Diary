"use client";
import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/pages", formData);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
          />
          <Input
            label="Content"
            value={formData.content}
            onChange={(e) => handleChange(e, "content")}
            isTextArea={true}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Post
          </button>
        </form>
      </div>
    </>
  );
}
