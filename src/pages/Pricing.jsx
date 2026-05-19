const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-20">

      <h1 className="text-7xl font-black text-center">
        Pricing Plans
      </h1>

      <div className="grid grid-cols-3 gap-8 mt-20">

        <div className="bg-[#0b0b15] border border-purple-500/20 rounded-[35px] p-10">
          <h2 className="text-4xl font-bold">Free</h2>
          <p className="text-6xl mt-8 font-black">$0</p>
          <button className="mt-10 w-full py-4 rounded-2xl bg-purple-600 text-xl font-bold">
            Start Free
          </button>
        </div>

        <div className="bg-gradient-to-b from-purple-600/20 to-blue-500/10 border border-purple-500 rounded-[35px] p-10 shadow-[0_0_60px_rgba(120,90,255,0.2)]">
          <h2 className="text-4xl font-bold">Pro</h2>
          <p className="text-6xl mt-8 font-black">$19</p>
          <button className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-xl font-bold">
            Go Pro
          </button>
        </div>
        <div className="bg-[#0b0b15] border border-purple-500/20 rounded-[35px] p-10">
          <h2 className="text-4xl font-bold">Enterprise</h2>
          <p className="text-6xl mt-8 font-black">Custom</p>
          <button className="mt-10 w-full py-4 rounded-2xl bg-purple-600 text-xl font-bold">
            Contact Us
          </button>
        </div>

      </div>

    </div>
  );
};

export default Pricing;