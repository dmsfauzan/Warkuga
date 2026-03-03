"use client";

import { Coffee, Heart, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Coffee,
    title: "Premium Coffee",
    description:
      "Locally sourced beans roasted to perfection for the smoothest cup.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every dish prepared with passion using authentic family recipes.",
  },
  {
    icon: Users,
    title: "Community Hub",
    description:
      "A gathering place for friends, families, and coffee enthusiasts.",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Years Serving" },
  { value: 50, suffix: "+", label: "Menu Items" },
  { value: 10, suffix: "K+", label: "Happy Guests" },
];

// Animated counter hook
function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({
  value,
  suffix,
  label,
  animate,
}: {
  value: number;
  suffix: string;
  label: string;
  animate: boolean;
}) {
  const count = useCountUp(value, 1400, animate);
  return (
    <div className="stat-item">
      <div className="font-display text-3xl md:text-4xl font-bold text-primary">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-8px) rotate(1deg); }
          66%       { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes iconSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb, 120,80,40), 0); }
          50%       { box-shadow: 0 0 18px 4px rgba(var(--primary-rgb, 120,80,40), 0.18); }
        }
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 3rem; opacity: 1; }
        }

        /* Entrance */
        .anim-fade-up {
          opacity: 0;
          animation: fadeSlideUp 0.7s cubic-bezier(.22,1,.36,1) forwards;
        }
        .anim-fade-left {
          opacity: 0;
          animation: fadeSlideLeft 0.7s cubic-bezier(.22,1,.36,1) forwards;
        }

        /* Gradient text */
        .gradient-text-animate {
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.6), hsl(var(--primary)));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        /* Decorative line */
        .deco-line {
          display: inline-block;
          height: 3px;
          border-radius: 9999px;
          background: hsl(var(--primary));
          animation: lineExpand 0.6s cubic-bezier(.22,1,.36,1) both;
        }

        /* Float */
        .float-card { animation: float 6s ease-in-out infinite; }
        .float-card:nth-child(2) { animation-delay: -2s; }
        .float-card:nth-child(3) { animation-delay: -4s; }

        /* Feature card hover */
        .feature-card {
          transition: transform 0.35s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.35s ease,
                      background 0.3s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateX(8px) scale(1.02);
          animation: borderGlow 1.5s ease-in-out infinite;
        }
        .feature-card:hover .icon-wrapper {
          animation: iconSpin 0.6s cubic-bezier(.22,1,.36,1);
        }

        /* Icon wrapper pulse ring */
        .icon-wrapper {
          position: relative;
          transition: transform 0.3s ease;
        }
        .icon-wrapper::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 10px;
          border: 2px solid hsl(var(--primary) / 0.5);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover .icon-wrapper::after {
          opacity: 1;
          animation: pulseRing 1s ease-out infinite;
        }

        /* Stat hover */
        .stat-item {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .stat-item:hover { transform: scale(1.08); }

        /* Background orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(60px);
          opacity: 0.12;
          animation: gradientShift 8s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="section-padding bg-card overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Ambient orbs */}
        <div
          className="orb"
          style={{
            width: 400,
            height: 400,
            top: -100,
            left: -100,
            background:
              "radial-gradient(circle, hsl(var(--primary)), transparent)",
          }}
        />
        <div
          className="orb"
          style={{
            width: 300,
            height: 300,
            bottom: -80,
            right: -80,
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.7), transparent)",
            animationDelay: "-4s",
          }}
        />

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Text Content ── */}
            <div>
              {/* Badge */}
              <div
                className={visible ? "anim-fade-up" : ""}
                style={{ animationDelay: "0ms" }}
              >
                <span className="text-primary font-medium tracking-widest uppercase text-sm inline-flex items-center gap-2">
                  Our Story
                  <span className="deco-line" style={{ animationDelay: "0.4s" }} />
                </span>
              </div>

              {/* Headline */}
              <h2
                className={`font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6 ${visible ? "anim-fade-up" : ""}`}
                style={{ animationDelay: "120ms" }}
              >
                Di Mana Tradisi Bertemu{" "}
                <span className="gradient-text-animate">Kenyamanan Modern</span>
              </h2>

              {/* Body text */}
              <p
                className={`text-muted-foreground text-lg leading-relaxed mb-6 ${visible ? "anim-fade-up" : ""}`}
                style={{ animationDelay: "240ms" }}
              >
                Didirikan pada tahun 2025, WARKUGA lahir dari sebuah impian
                sederhana: untuk menciptakan ruang di mana warisan kuliner
                Indonesia yang kaya berpadu secara harmonis dengan budaya kafe
                kontemporer.
              </p>
              <p
                className={`text-muted-foreground leading-relaxed mb-8 ${visible ? "anim-fade-up" : ""}`}
                style={{ animationDelay: "320ms" }}
              >
                Nama kami menggabungkan "Warung" (warung tradisional Indonesia)
                dengan "Kuga" (keunggulan), yang mewakili komitmen kami untuk
                menyajikan makanan berkualitas tinggi dalam suasana hangat dan
                ramah. Setiap kunjungan adalah undangan untuk menikmati yang
                terbaik dari kedua dunia.
              </p>

              {/* Stats */}
              <div
                ref={statsRef}
                className={`grid grid-cols-3 gap-6 text-center ${visible ? "anim-fade-up" : ""}`}
                style={{ animationDelay: "420ms" }}
              >
                {stats.map((s) => (
                  <StatItem
                    key={s.label}
                    value={s.value}
                    suffix={s.suffix}
                    label={s.label}
                    animate={statsVisible}
                  />
                ))}
              </div>
            </div>

            {/* ── Feature Cards ── */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`feature-card flex gap-5 p-6 bg-background rounded-xl card-elevated float-card ${visible ? "anim-fade-left" : ""}`}
                  style={{ animationDelay: `${index * 150 + 200}ms` }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg gradient-bg flex items-center justify-center icon-wrapper">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;