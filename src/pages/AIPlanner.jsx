import React, { useState } from "react";
import { generateStudyPlan } from "../services/aiService";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  FiZap,
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiTarget,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";

const AIPlanner = () => {
  const [formData, setFormData] = useState({
    examDate: "",
    subjects: "",
    hours: "",
    weakSubject: "",
  });

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async (e) => {
    e.preventDefault();

    if (!formData.examDate || !formData.subjects || !formData.hours) {
      setError("Please fill exam date, subjects and study hours.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const goal = `Prepare for exam on ${formData.examDate}`;
      const subjectText = `Subjects: ${formData.subjects}. Weak subject: ${
        formData.weakSubject || "None"
      }`;

      const response = await generateStudyPlan(
        goal,
        formData.hours,
        subjectText
      );

      setPlan(response);
    } catch (err) {
      setError("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearPlan = () => {
    setPlan("");
    setError("");
  };

  return (
    <section className="min-h-screen bg-[#050914] text-white relative overflow-hidden p-4 sm:p-6 lg:p-8">
      <DashboardNavbar/>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-cyan-300 font-semibold text-sm flex items-center gap-2">
            <FiZap />
            Hmy Planner AI
          </p>

          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            AI Study Planner
          </h1>

          <p className="text-gray-400 mt-3 max-w-2xl">
            Generate a smart weekly study plan using Gemini AI based on exam
            date, subjects, weak areas and daily study hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-6">
          <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-6 h-fit">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <FiTarget className="text-cyan-300" />
              Study Details
            </h2>

            {error && (
              <div className="mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 flex items-start gap-3">
                <FiAlertCircle className="mt-1" />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={generatePlan} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 font-semibold">
                  Exam Date
                </label>
                <input
                  type="date"
                  value={formData.examDate}
                  onChange={(e) =>
                    setFormData({ ...formData, examDate: e.target.value })
                  }
                  className="mt-2 w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 font-semibold">
                  Subjects
                </label>
                <input
                  type="text"
                  placeholder="Math, Physics, Chemistry"
                  value={formData.subjects}
                  onChange={(e) =>
                    setFormData({ ...formData, subjects: e.target.value })
                  }
                  className="mt-2 w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 font-semibold">
                  Study Hours Per Day
                </label>
                <input
                  type="number"
                  placeholder="3"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  className="mt-2 w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 font-semibold">
                  Weak Subject
                </label>
                <input
                  type="text"
                  placeholder="Physics"
                  value={formData.weakSubject}
                  onChange={(e) =>
                    setFormData({ ...formData, weakSubject: e.target.value })
                  }
                  className="mt-2 w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-black flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <FiZap />
                {loading ? "Generating Plan..." : "Generate AI Plan"}
              </button>
            </form>
          </div>

          <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400">Generated Schedule</p>
                <h2 className="text-2xl font-black">Gemini AI Plan</h2>
              </div>

              {plan && (
                <button
                  onClick={clearPlan}
                  className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
                >
                  <FiRefreshCw />
                </button>
              )}
            </div>

            {loading ? (
              <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(56,189,248,0.35)] animate-pulse">
                  <FiZap className="text-3xl" />
                </div>

                <h3 className="text-2xl font-black mb-2">
                  Generating Smart Plan...
                </h3>

                <p className="text-gray-400 max-w-md">
                  Gemini AI is creating a personalized study plan for you.
                </p>
              </div>
            ) : plan ? (
              <div className="rounded-3xl bg-[#07111f] border border-white/10 p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                    <FiBookOpen />
                  </div>

                  <div>
                    <h3 className="text-xl font-black">Your AI Study Plan</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <FiCalendar />
                      Based on your exam timeline
                    </p>
                  </div>
                </div>

                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-sm sm:text-base">
                  {plan}
                </div>
              </div>
            ) : (
              <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                  <FiZap className="text-3xl" />
                </div>

                <h3 className="text-2xl font-black mb-2">
                  No Plan Generated Yet
                </h3>

                <p className="text-gray-400 max-w-md">
                  Fill your study details and Gemini AI will generate your
                  personalized weekly planner.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;