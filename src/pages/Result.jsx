const Result = () => {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-14">

      <h1 className="text-6xl font-black">
        Extension Generated
      </h1>

      <div className="grid grid-cols-3 gap-8 mt-16">

        <div className="bg-[#0b0b15] rounded-[30px] p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-purple-400">
            manifest.json
          </h2>
        </div>

        <div className="bg-[#0b0b15] rounded-[30px] p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-purple-400">
                   content.js
          </h2>
        </div>

        <div className="bg-[#0b0b15] rounded-[30px] p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-purple-400">
            popup.html
          </h2>
        </div>

      </div>

      <button className="mt-16 px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-2xl font-bold">
        Download ZIP
      </button>

    </div>
  );
};

export default Result;