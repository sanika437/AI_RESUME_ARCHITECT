const Login = () => {
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#0b0b15] border border-purple-500/20 rounded-[35px] p-10 shadow-[0_0_60px_rgba(120,90,255,0.15)]">

        <h1 className="text-5xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-4 text-lg">
          Login to continue building extensions
        </p>

        <div className="mt-10 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#11111b] border border-purple-500/20 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#11111b] border border-purple-500/20 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-xl hover:scale-105 transition-all">
            Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default Login;