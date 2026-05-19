import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PromptBox = () => {

  const [prompt, setPrompt] = useState("");

  const navigate = useNavigate();

  const handleGenerate = () => {

    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    navigate("/dashboard");
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center mt-14 gap-6 px-4"
    >

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your Chrome extension idea..."
        className="w-full max-w-3xl h-52 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white text-lg outline-none shadow-2xl"
      />

      <button
        onClick={handleGenerate}
        className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-purple-500/30 shadow-2xl"
      >
        Generate Extension
      </button>

    </motion.div>
  );
};

export default PromptBox;