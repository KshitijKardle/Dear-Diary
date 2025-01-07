"use client";
import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "", // Added date field
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
      router.push("/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error  creating post:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[linear-gradient(0deg,_#222_1px,_transparent_1px)] bg-[size:100%_2rem] p-6 md:p-12">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
          />
          <Input
            label="Date"
            value={formData.date}
            onChange={(e) => handleChange(e, "date")}
            type="date" // Added type for date input
          />
          <Input
            required
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
