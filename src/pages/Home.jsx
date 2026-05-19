import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f7fb] overflow-hidden relative text-black">

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(130,90,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(130,90,255,0.15) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
        }}
      />

      {/* PURPLE GLOW */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-400/30 blur-[140px] rounded-full z-0"></div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-xl">

            <FaBolt className="text-white text-xl" />

          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Extensio.ai
          </h1>

        </div>

        <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
          Get Started
        </button>

      </nav>

      {/* HERO SECTION */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-8 py-3 rounded-full border border-purple-300 bg-purple-200/30 backdrop-blur-xl text-purple-500 font-semibold tracking-wide"
        >
          • POWERED BY CLAUDE AI · NOW IN PUBLIC BETA
        </motion.div>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-[90px] leading-[0.95] font-black tracking-tight"
        >
          Build Chrome Extensions
          <br />

          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            with AI
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 max-w-5xl text-[32px] leading-relaxed text-black/60"
        >
          Describe any Chrome extension in plain English and watch
          Extensio.ai engineer, package, and deliver it — production-ready
          in seconds. No IDE, no Stack Overflow, no frustration.
        </motion.p>

        {/* PROMPT BOX */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-20 w-full max-w-6xl rounded-[40px] bg-[#09090f] border border-white/10 shadow-[0_0_80px_rgba(120,90,255,0.25)] overflow-hidden"
        >

          {/* TOP BAR */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">

            <div className="w-4 h-4 rounded-full bg-red-400"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <div className="w-4 h-4 rounded-full bg-green-400"></div>

            <p className="ml-5 text-gray-500 text-lg">
              describe your extension idea
            </p>

          </div>

          {/* TEXTAREA */}
          <textarea
            placeholder="A reading-mode toggle that strips ads and clutter from articles..."
            className="w-full h-[280px] bg-transparent resize-none outline-none p-10 text-4xl text-gray-400 placeholder:text-gray-500"
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center px-8 py-8 border-t border-white/10">

            <p className="text-gray-500 text-xl">
              ⌘ + Enter to generate
            </p>

            <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-semibold shadow-[0_0_40px_rgba(120,90,255,0.6)] hover:scale-105 transition-all duration-300">
               Generate Extension
            </button>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Home;