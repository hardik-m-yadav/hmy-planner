import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { signup, login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      if (isRegister) {
        if (password !== confirmPassword) {
          return setError("Passwords do not match");
        }

        await signup(email, password);
        navigate("/dashboard");
      }

      if (isLogin) {
        await login(email, password);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050914] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-purple-600/30 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/25 blur-[150px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 py-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
              <FiZap />
              AI Powered Study Planner
            </div>

            <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight">
              Welcome to
              <br />
              Hmy{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Planner
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
              Organize study plans, track progress, manage tasks and stay
              focused with a clean AI-powered planner dashboard.
            </p>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-4">
              <InfoCard value="94%" label="Goal Success" />
              <InfoCard value="85%" label="Focus Boost" />
              <InfoCard value="24/7" label="AI Assistant" />
            </div>

            <div className="mt-9 max-w-xl rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Today’s Plan</p>
                  <h3 className="text-2xl font-black">Study Overview</h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400">
                  <FiZap />
                </div>
              </div>

              <Progress title="Mathematics" percent="82%" />
              <Progress title="Physics Revision" percent="64%" />
              <Progress title="Chemistry Notes" percent="48%" />
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400">
                  <FiZap />
                </div>
                <h1 className="text-2xl font-black">
                  Hmy{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Planner
                  </span>
                </h1>
              </div>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-white/[0.07] p-1 backdrop-blur-2xl shadow-[0_25px_90px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_30px_100px_rgba(56,189,248,0.18)]">
              <div className="rounded-[28px] bg-[#07111f]/95 p-6 sm:p-8">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-400 shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <FiZap className="text-2xl" />
                  </div>

                  <h2 className="text-3xl font-black tracking-tight">
                    {isLogin && "Welcome Back"}
                    {isRegister && "Create Account"}
                    {isForgot && "Reset Password"}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    {isLogin && "Continue your study planning journey"}
                    {isRegister && "Start your smart planner experience"}
                    {isForgot && "Enter your email to reset your password"}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {isRegister && (
                    <Input
                      icon={<FiUser />}
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}

                  <Input
                    icon={<FiMail />}
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {!isForgot && (
                    <div className="relative">
                      <Input
                        icon={<FiLock />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-300"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  )}

                  {isRegister && (
                    <Input
                      icon={<FiLock />}
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex cursor-pointer items-center gap-2 text-gray-400 transition hover:text-gray-300">
                        <input type="checkbox" className="accent-cyan-400" />
                        Remember me
                      </label>

                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="font-semibold text-cyan-300 transition hover:text-purple-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="group/btn flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 py-4 font-black text-white shadow-[0_0_30px_rgba(56,189,248,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(56,189,248,0.45)] active:scale-[0.98]"
                  >
                    {isLogin && "Enter Dashboard"}
                    {isRegister && "Create Account"}
                    {isForgot && "Send Reset Link"}
                    <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs font-semibold text-gray-500">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-3 font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10 hover:text-white">
                  Continue with Google
                </button>

                <p className="mt-7 text-center text-sm text-gray-400">
                  {isLogin && (
                    <>
                      New to Hmy Planner?{" "}
                      <button
                        onClick={() => setMode("register")}
                        className="font-bold text-cyan-300 transition hover:text-purple-300"
                      >
                        Create account
                      </button>
                    </>
                  )}

                  {isRegister && (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="font-bold text-cyan-300 transition hover:text-purple-300"
                      >
                        Login
                      </button>
                    </>
                  )}

                  {isForgot && (
                    <>
                      Back to{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="font-bold text-cyan-300 transition hover:text-purple-300"
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Input = ({ icon, type, placeholder, value, onChange }) => {
  return (
    <div className="group relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-cyan-300">
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-4 pl-12 pr-12 text-white outline-none placeholder:text-gray-500 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] focus:border-cyan-400/70 focus:bg-white/[0.1] focus:shadow-[0_0_28px_rgba(34,211,238,0.16)]"
      />
    </div>
  );
};

const InfoCard = ({ value, label }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.13]">
      <h4 className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
        {value}
      </h4>
      <p className="mt-1 text-sm font-semibold text-gray-400">{label}</p>
    </div>
  );
};

const Progress = ({ title, percent }) => {
  return (
    <div className="mb-4 rounded-2xl border border-white/10 bg-[#07111f] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 font-bold">
          <FiCheckCircle className="text-cyan-400" />
          {title}
        </p>
        <span className="text-sm font-black text-purple-300">{percent}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          style={{ width: percent }}
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
        />
      </div>
    </div>
  );
};

export default Auth;
