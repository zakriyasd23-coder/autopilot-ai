import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6">
          Manage All Social Media From One Dashboard
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mb-8 mx-auto">
          Connect YouTube, TikTok, Instagram, Facebook and automate everything
          from one powerful AI dashboard.
        </p>

        <Link
          to="/login"
          className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}