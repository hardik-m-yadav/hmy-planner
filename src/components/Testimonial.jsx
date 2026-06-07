import React from "react";
import Slider from "react-slick";
import { motion } from "motion/react";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Class 12 Science Student",
    review:
      "Hmy Planner helped me organize Physics, Chemistry and Maths properly. The AI plan made my routine easier.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    role: "NEET Aspirant",
    review:
      "The weak topic suggestions helped me focus on chapters where I needed more practice.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Engineering Student",
    review:
      "The dashboard feels clean and motivating. Tracking study hours makes me consistent.",
    rating: 5,
  },
  {
    name: "Sneha Patil",
    role: "JEE Aspirant",
    review:
      "The AI timetable helped me balance revision, mock tests and daily practice.",
    rating: 5,
  },
  {
    name: "Kabir Singh",
    role: "College Student",
    review:
      "I stopped wasting time deciding what to study next. The planner guides me daily.",
    rating: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3200,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      {/* Moving Glow */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -35, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[-150px] w-[450px] h-[450px] bg-purple-600/25 blur-[160px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 35, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-[-160px] w-[500px] h-[500px] bg-sky-500/20 blur-[170px] rounded-full"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            Student Stories
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Students Are Studying
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              Smarter With AI
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-base md:text-lg leading-8">
            See how students use Hmy Planner to organize studies, improve focus,
            and stay consistent.
          </p>
        </motion.div>

        {/* Carousel */}
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-3 py-4">
              <div className="group min-h-[360px] relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] hover:bg-white/[0.07] backdrop-blur-xl p-7 transition-colors duration-700 ease-out hover:border-sky-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.22)]">
                {/* Smooth Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10" />

                <div className="absolute -right-24 -bottom-24 w-52 h-52 bg-purple-500/15 blur-[90px] rounded-full group-hover:bg-sky-500/20 transition-all duration-1000 ease-out" />

                <FaQuoteLeft className="relative z-10 text-4xl text-sky-300 mb-6 transition-transform duration-500 ease-out group-hover:scale-105" />

                <p className="relative z-10 text-gray-300 leading-8 mb-7 group-hover:text-gray-200 transition-colors duration-500">
                  “{item.review}”
                </p>

                <div className="relative z-10 flex items-center gap-1 text-yellow-400 mb-7">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center font-black text-xl shadow-lg shadow-purple-500/30 transition-transform duration-500 ease-out group-hover:scale-105">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-gray-400 text-sm">{item.role}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-7 h-[1px] bg-white/10 overflow-hidden">
                  <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-sky-400 transition-[width] duration-700 ease-out" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;