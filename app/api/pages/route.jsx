import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch the blog post by ID
      const post = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
      });

      if (!post) {
        return NextResponse.json(
          {
            message: "Post not found",
          },
          { status: 404 }
        );
      }

      // Return the post with a 200 status code
      return NextResponse.json(
        {
          message: "Post fetched successfully",
          data: post,
        },
        { status: 200 }
      );
    } else {
      // Fetch all blog posts
      const posts = await prisma.blog.findMany({});

      // Return the posts with a 200 status code
      return NextResponse.json(
        {
          message: "Posts fetched successfully",
          data: posts,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // Handle any errors and return a 500 status code
    return NextResponse.json(
      {
        message: "Error fetching posts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Get the request body
    const { title, content, date } = await request.json();

    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);
    // Create a new blog post
    const post = await prisma.blog.create({
      data: {
        title,
        content,
        date: formattedDate,
      },
    });

    // Return the post with a 201 status code
    return NextResponse.json(
      {
        message: "Post created successfully",
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors and return a 500 status code
    return NextResponse.json(
      {
        message: "Error creating post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Get the ID from the URL
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        {
          message: "Post ID is required",
        },
        { status: 400 }
      );
    }

    // Delete the blog post
    const deletedPost = await prisma.blog.delete({
      where: {
        id: id,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Post deleted successfully",
        data: deletedPost,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors and return a 500 status code
    return NextResponse.json(
      {
        message: "Error deleting post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
