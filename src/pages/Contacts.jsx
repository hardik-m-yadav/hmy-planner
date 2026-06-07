import React from "react";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

const Contact = () => {
  return (
    <section className="relative min-h-screen bg-[#050914] mt-4 overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="absolute -top-40 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-cyan-300 font-semibold tracking-wider uppercase">
            Contact Me
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Let's Build Something Amazing
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            Have a project idea, collaboration opportunity, or just want to
            connect? Feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="rounded-[30px] bg-white/[0.06] border border-white/10 backdrop-blur-2xl p-8">
            <h3 className="text-3xl font-black mb-6">
              Get In Touch
            </h3>

            <div className="space-y-5">
              <a
                href="mailto:hardik.m.yadav4149@email.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <FiMail />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold">Hardik.m.yadav4149@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/hardik-m-yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <FiGithub />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">GitHub</p>
                  <p className="font-semibold">github.com/hardik-m-yadav</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/hardik-yadav-713635406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <FiLinkedin />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <p className="font-semibold">
                    www.linkedin.com/in/hardik-yadav-713635406
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="rounded-[30px] bg-white/[0.06] border border-white/10 backdrop-blur-2xl p-8">
            <form className="space-y-5">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Email
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Message
                </label>

                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-5 text-gray-500" />

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none resize-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-black flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;