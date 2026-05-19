import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { useState, useEffect } from "react";
import { getAccounts, disconnectAccount } from "../lib/api";

type Account = {
  _id: string;
  platform: string;
  accountName: string;
  avatar: string;
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const loadAccounts = async () => {
    try {
      const res = await getAccounts();
      setAccounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleDisconnect = async (id: string) => {
    await disconnectAccount(id);
    loadAccounts();
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const youtubeAccounts = accounts.filter(
    (a) => a.platform === "YouTube"
  );

  const tiktokAccounts = accounts.filter(
    (a) => a.platform === "TikTok"
  );

  const instagramAccounts = accounts.filter(
    (a) => a.platform === "Instagram"
  );

  const facebookAccounts = accounts.filter(
    (a) => a.platform === "Facebook"
  );

  const renderPlatformCard = (
    title: string,
    accountsList: Account[],
    connectUrl?: string
  ) => (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 min-h-[320px] shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <a
          href={connectUrl || "#"}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl transition font-semibold"
        >
          Connect
        </a>
      </div>

      {accountsList.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-lg">
            No connected accounts
          </p>
        </div>
      ) : (
        <div
          className={`flex-1 flex flex-col gap-4 ${
            accountsList.length === 1
              ? "justify-center"
              : "justify-start"
          }`}
        >
          {accountsList.map((account) => (
            <div
              key={account._id}
              className="w-full flex items-center justify-between gap-4 bg-slate-800 p-4 rounded-xl"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={account.avatar}
                  alt={account.accountName}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">
                    {account.accountName}
                  </h3>

                  <p className="text-slate-400">
                    {account.platform}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleDisconnect(account._id)
                }
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition font-semibold shrink-0"
              >
                Disconnect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 p-6 z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-cyan-400">
            Autopilot AI
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            Dashboard
          </Link>

          <Link
            to="/platforms"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            Platforms
          </Link>

          <Link
            to="/uploads"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            Uploads
          </Link>

          <Link
            to="/scheduler"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            Scheduler
          </Link>

          <Link
            to="/ai"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            AI Assistant
          </Link>

          <Link
            to="/settings"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl text-left transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-3xl bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition"
        >
          ☰
        </button>

        <h1 className="text-4xl font-bold">
          Dashboard Overview
        </h1>
      </header>

      {/* MAIN */}
      <main className="pt-36 px-6 pb-10 md:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 auto-rows-fr">
          {renderPlatformCard(
            "YouTube",
            youtubeAccounts,
            "http://localhost:4000/api/oauth/google"
          )}

          {renderPlatformCard(
            "TikTok",
            tiktokAccounts
          )}

          {renderPlatformCard(
            "Instagram",
            instagramAccounts,
            "http://localhost:4000/api/instagram/login"
          )}

          {renderPlatformCard(
            "Facebook",
            facebookAccounts,
             "http://localhost:4000/api/meta/login"
            )}
        </div>
      </main>
    </div>
  );
}