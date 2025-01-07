import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Link href="/blogs">view blogs</Link>
    </>
  );
}
