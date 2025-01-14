"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dear Diary</h1>
        <nav>
          <Link href="/" className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link href="/about" className="px-3 py-2 rounded hover:bg-gray-700">
            About
          </Link>
          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
