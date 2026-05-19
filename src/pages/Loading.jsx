import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[140px]"></div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-24 h-24 rounded-full border-4 border-purple-500 border-t-transparent"
      />

      <h1 className="absolute mt-52 text-3xl font-bold text-purple-300">
        Generating your extension...
      </h1>

    </div>
  );
};

export default Loading;