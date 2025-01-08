"use client";
import React from "react";
import SignOutButton from "./Signout";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <nav>
          <a href="/" className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </a>
          <a href="/" className="px-3 py-2 rounded hover:bg-gray-700">
            About
          </a>
          <a href="/register">register</a>
          <SignOutButton></SignOutButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
