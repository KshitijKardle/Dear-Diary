import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 transform rotate-1 notebook-page">
            <h1 className="text-4xl font-caveat mb-6 text-blue-600">
              Welcome to Your Digital Diary
            </h1>
            <p className="mb-6 text-gray-600 leading-relaxed">
              This is your personal space to reflect on your day, capture your
              thoughts, and preserve your memories. Every entry you write is a
              page in the story of your life.
            </p>

            <Link href="/blogs">Start Writing</Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          © {new Date().getFullYear()} My Digital Diary. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
