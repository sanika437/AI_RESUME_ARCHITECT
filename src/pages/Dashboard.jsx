import {
  LayoutDashboard,
  Puzzle,
  Wand2,
  Files,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <div className="w-[280px] border-r border-purple-500/20 bg-[#050510] p-7 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-2xl font-bold">
              Ex
            </div>

            <h1 className="text-4xl font-bold">
              Extensio.ai
            </h1>

          </div>

          {/* MAIN */}
          <div className="mt-16">

            <p className="text-gray-500 text-sm tracking-[3px] mb-5">
              MAIN
            </p>

            <div className="space-y-4">

              {/* ACTIVE */}
              <div className="flex items-center gap-4 bg-purple-600/20 border border-purple-500/30 px-5 py-4 rounded-2xl text-purple-400">

                <LayoutDashboard size={22} />
                <span className="text-xl font-medium">
                  Dashboard
                </span>

              </div>

              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer text-gray-400">

                <Puzzle size={22} />
                <span className="text-xl">
                  My Extensions
                </span>

              </div>

              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer text-gray-400">

                <Wand2 size={22} />
                <span className="text-xl">
                  AI Builder
                </span>

              </div>

              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer text-gray-400">

                <Files size={22} />
                <span className="text-xl">
                  Templates
                </span>

              </div>

            </div>

          </div>

          {/* SETTINGS */}
          <div className="mt-20">

            <p className="text-gray-500 text-sm tracking-[3px] mb-5">
              SETTINGS
            </p>

            <div className="space-y-4">

              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer text-gray-400">

                <BarChart3 size={22} />
                <span className="text-xl">
                  Analytics
                </span>

              </div>

              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer text-gray-400">

                <Settings size={22} />
                <span className="text-xl">
                  Settings
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-[#02020a]">

        {/* TOPBAR */}
        <div className="border-b border-purple-500/20 px-10 py-6 flex items-center justify-between">

          {/* SEARCH */}
          <div className="w-[420px]">

            <input
              type="text"
              placeholder="Search extensions..."
              className="w-full bg-[#11111b] border border-purple-500/20 rounded-2xl px-6 py-5 text-xl outline-none text-gray-300 placeholder:text-gray-500"
            />

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl border border-purple-500/20 flex items-center justify-center text-gray-400 relative">

              <Bell size={24} />

              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-500"></div>

            </div>

            <div className="w-16 h-16 rounded-2xl border border-purple-500/20 flex items-center justify-center text-gray-400">

              <HelpCircle size={24} />

            </div>

            <button className="px-8 py-5 rounded-2xl bg-[#0d0d18] border border-purple-500/30 shadow-[0_0_30px_rgba(120,90,255,0.25)] flex items-center gap-3 text-2xl font-semibold hover:scale-105 transition-all">

              <Plus size={24} />
              New Extension

            </button>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-10">

          <h1 className="text-6xl font-bold">
            Your Extensions
          </h1>

          <p className="text-gray-500 text-2xl mt-3">
            Manage and iterate your AI-generated Chrome extensions
          </p>

          {/* TABS */}
          <div className="mt-10 flex gap-4 bg-[#0d0d18] border border-purple-500/20 w-fit rounded-2xl p-2">

            <button className="px-7 py-3 rounded-xl bg-purple-600/20 text-purple-400 text-xl">
              All
            </button>

            <button className="px-7 py-3 rounded-xl text-gray-500 text-xl">
              Live
            </button>

            <button className="px-7 py-3 rounded-xl text-gray-500 text-xl">
              Draft
            </button>

            <button className="px-7 py-3 rounded-xl text-gray-500 text-xl">
              Review
            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-5xl">

            {/* CARD */}
            <div className="bg-[#0b0b15] border border-purple-500/20 rounded-[30px] p-8 shadow-[0_0_30px_rgba(120,90,255,0.08)]">

              <p className="text-gray-500 text-lg uppercase tracking-wider">
                Total Built
              </p>

              <h1 className="text-7xl font-bold mt-4">
                6
              </h1>

              <div className="mt-5 inline-block px-5 py-2 rounded-full bg-green-500/10 text-green-400 text-lg">
                ↗ +3 this month
              </div>

            </div>

            {/* CARD */}
            <div className="bg-[#0b0b15] border border-purple-500/20 rounded-[30px] p-8 shadow-[0_0_30px_rgba(120,90,255,0.08)]">

              <p className="text-gray-500 text-lg uppercase tracking-wider">
                Published
              </p>

              <h1 className="text-7xl font-bold mt-4">
                3
              </h1>

              <div className="mt-5 inline-block px-5 py-2 rounded-full bg-green-500/10 text-green-400 text-lg">
                ✓ Live on store
              </div>

            </div>

            {/* CARD */}
            <div className="bg-[#0b0b15] border border-purple-500/20 rounded-[30px] p-8 shadow-[0_0_30px_rgba(120,90,255,0.08)]">

              <p className="text-gray-500 text-lg uppercase tracking-wider">
                Total Downloads
              </p>

              <h1 className="text-7xl font-bold mt-4">
                2.4k
              </h1>

              <div className="mt-5 inline-block px-5 py-2 rounded-full bg-green-500/10 text-green-400 text-lg">
                ↗ +18% week
              </div>

            </div>

            {/* SMALL CARD */}
            <div className="bg-[#0b0b15] border border-purple-500/20 rounded-[30px] p-8 shadow-[0_0_30px_rgba(120,90,255,0.08)]">

              <p className="text-gray-500 text-lg uppercase tracking-wider">
                Avg Build Time
              </p>

              <h1 className="text-7xl font-bold mt-4">
                7s
              </h1>

              <div className="mt-5 inline-block px-5 py-2 rounded-full bg-purple-500/10 text-purple-400 text-lg">
                 Lightning fast
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;