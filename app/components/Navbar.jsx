import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-zinc-50 text-black">
      <Link href="/" className="text-xl font-semibold">
        Dear Diary
      </Link>
      <Link
        href="/post"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Post
      </Link>
    </div>
  );
};

export default Navbar;
