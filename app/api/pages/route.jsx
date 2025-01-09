import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch specific blog post, ensuring it belongs to the current user
      const post = await prisma.blog.findUnique({
        where: {
          id: parseInt(id),
          authorId: session.user.id, // Only fetch if it belongs to current user
        },
      });

      if (!post) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Post fetched successfully",
          data: post,
        },
        { status: 200 }
      );
    } else {
      // Fetch all blog posts for the current user
      const posts = await prisma.blog.findMany({
        where: {
          authorId: session.user.id,
        },
        orderBy: {
          date: "desc", // Most recent posts first
        },
      });

      return NextResponse.json(
        {
          message: "Posts fetched successfully",
          data: posts,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, date } = await request.json();

    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const post = await prisma.blog.create({
      data: {
        title,
        content,
        date: formattedDate,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    // Verify post ownership before deletion
    const post = await prisma.blog.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== session.user.id) {
      return NextResponse.json(
        { message: "Post not found or unauthorized" },
        { status: 403 }
      );
    }

    const deletedPost = await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Post deleted successfully",
        data: deletedPost,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
