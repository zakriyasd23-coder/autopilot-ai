import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          Autopilot AI
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold leading-tight">
          Manage, Upload, Analyze & Automate
          <span className="text-cyan-400"> All Social Media</span>
          from One Dashboard
        </h1>

        <p className="text-slate-300 text-xl mt-8 max-w-3xl mx-auto">
          Connect YouTube, TikTok, Instagram, Facebook and
          manage analytics, uploads, automation, and AI
          insights from one powerful platform.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-cyan-400">
              Multi-Platform Management
            </h3>
            <p className="text-slate-300 mt-4">
              Connect and manage YouTube, TikTok,
              Instagram, and Facebook accounts in one
              place.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-cyan-400">
              AI Analytics Assistant
            </h3>
            <p className="text-slate-300 mt-4">
              Ask AI why your videos underperform and get
              optimization advice instantly.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-cyan-400">
              Upload & Automation
            </h3>
            <p className="text-slate-300 mt-4">
              Upload one video to multiple platforms or
              schedule posts automatically.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Connect your social media accounts securely",
            "Track analytics and performance in real time",
            "Upload or schedule content effortlessly",
            "Use AI to optimize and grow faster",
          ].map((step, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
            >
              <div className="text-cyan-400 text-2xl font-bold mb-4">
                0{index + 1}
              </div>
              <p className="text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold">
          Start Growing Smarter with Autopilot AI
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}