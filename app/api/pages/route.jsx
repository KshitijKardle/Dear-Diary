import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session.user);

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const post = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
        include: { author: true }, // Include author details
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
      const posts = await prisma.blog.findMany({
        include: { author: true }, // Include author details
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
        authorId: session.user.id, // Add the author ID from the session
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

    // Verify post ownership
    const post = await prisma.blog.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized or post not found" },
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
