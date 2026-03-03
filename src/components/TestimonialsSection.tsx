"use client";

import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Wijaya",
    role: "Food Blogger",
    content:
      "WARKUGA has become my go-to spot for authentic Indonesian comfort food. The Nasi Goreng Special is absolutely divine, and the atmosphere is so cozy!",
    rating: 5,
  },
  {
    name: "Ahmad Pratama",
    role: "Regular Customer",
    content:
      "Best coffee in town! The Kopi Susu Gula Aren is perfectly balanced. I've been coming here every morning for the past year.",
    rating: 5,
  },
  {
    name: "Linda Kusuma",
    role: "Business Owner",
    content:
      "Perfect place for casual business meetings. Great food, excellent service, and the WiFi is super fast. Highly recommend!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "University Student",
    content:
      "Affordable prices, generous portions, and a welcoming atmosphere. WARKUGA feels like a home away from home.",
    rating: 5,
  },
];

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Animated Stars ── */
function StarRating({ rating, animate }: { rating: number; animate: boolean }) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setFilled(i);
      if (i >= rating) clearInterval(id);
    }, 120);
    return () => clearInterval(id);
  }, [animate, rating]);

  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5"
          style={{
            fill: i < filled ? "hsl(var(--accent, 38 92% 50%))" : "transparent",
            color: "hsl(var(--accent, 38 92% 50%))",
            transition: "fill 0.2s ease, transform 0.25s cubic-bezier(.22,1,.36,1)",
            transform: i < filled ? "scale(1)" : "scale(0.7)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Single Card ── */
function TestimonialCard({
  testimonial,
  index,
  sectionVisible,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
  sectionVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    if (!sectionVisible) return;
    const t = setTimeout(() => setCardVisible(true), index * 140 + 100);
    return () => clearTimeout(t);
  }, [sectionVisible, index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="tcard relative p-6 md:p-8 bg-background rounded-2xl card-elevated overflow-hidden"
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible
          ? "translateY(0) scale(1)"
          : "translateY(32px) scale(0.96)",
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1)`,
      }}
    >
      {/* Gradient corner wash on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, hsl(var(--primary)/.07) 0%, transparent 55%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />

      {/* Animated border glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: hovered
            ? "0 0 0 1.5px hsl(var(--primary)/.35), 0 8px 30px hsl(var(--primary)/.12)"
            : "0 0 0 0 transparent",
          transition: "box-shadow 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Quote icon — floats + fades in */}
      <div
        className="absolute top-6 right-6"
        style={{
          opacity: cardVisible ? 0.12 : 0,
          transform: cardVisible ? "rotate(0deg) scale(1)" : "rotate(-20deg) scale(0.5)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(.22,1,.36,1) 0.3s",
          animation: cardVisible ? "quoteFloat 5s ease-in-out infinite 0.8s" : "none",
        }}
      >
        <Quote className="w-12 h-12 text-primary" />
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} animate={cardVisible} />

      {/* Content — typewriter-style fade per word */}
      <p
        className="text-foreground leading-relaxed mb-6 relative z-10"
        style={{
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s",
        }}
      >
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div
        className="flex items-center gap-4 relative z-10"
        style={{
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? "translateX(0)" : "translateX(-16px)",
          transition: "opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(.22,1,.36,1) 0.5s",
        }}
      >
        {/* Avatar with ripple on hover */}
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-lg"
            style={{
              transform: hovered ? "scale(1.12)" : "scale(1)",
              transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
              boxShadow: hovered ? "0 4px 16px hsl(var(--primary)/.4)" : "none",
            }}
          >
            {testimonial.name.charAt(0)}
          </div>
          {/* Pulse ring */}
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "2px solid hsl(var(--primary)/.4)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.3)" : "scale(1)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          />
        </div>

        <div>
          <h4
            className="font-semibold text-foreground"
            style={{
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.25s ease",
            }}
          >
            {testimonial.name}
          </h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>

      {/* Bottom shimmer line on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: hovered ? "0%" : "50%",
          width: hovered ? "100%" : "0%",
          height: 2,
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          transition: "width 0.4s cubic-bezier(.22,1,.36,1), left 0.4s cubic-bezier(.22,1,.36,1)",
          borderRadius: "0 0 16px 16px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════ */
const TestimonialsSection = () => {
  const { ref: headerRef, inView: headerVisible } = useInView(0.2);
  const { ref: gridRef, inView: gridVisible } = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmerText {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes quoteFloat {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-6px) rotate(4deg); }
        }
        @keyframes lineExpand {
          from { width:0; opacity:0; }
          to   { width:2.5rem; opacity:1; }
        }
        @keyframes ambientDrift {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(20px,-20px) scale(1.05); }
          66%      { transform:translate(-10px,15px) scale(0.95); }
        }

        .testi-badge-visible  { animation: fadeDown 0.55s cubic-bezier(.22,1,.36,1) both; }
        .testi-h2-visible     { animation: fadeUp  0.6s  cubic-bezier(.22,1,.36,1) 0.12s both; }
        .testi-sub-visible    { animation: fadeUp  0.6s  cubic-bezier(.22,1,.36,1) 0.24s both; }

        .shimmer-text {
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/.5), hsl(var(--primary)));
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmerText 3s linear infinite;
        }
        .deco-line {
          display:inline-block; height:3px; border-radius:9999px;
          background:hsl(var(--primary));
          animation: lineExpand 0.55s cubic-bezier(.22,1,.36,1) 0.4s both;
        }
      `}</style>

      <section id="testimonials" className="section-padding bg-card overflow-hidden" style={{ position: "relative" }}>

        {/* Ambient orbs */}
        {[
          { top: -100, left: -100, size: 350, delay: "0s" },
          { top: "40%", right: -80, size: 250, delay: "-3s" },
          { bottom: -60, left: "30%", size: 200, delay: "-6s" },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: orb.size,
              height: orb.size,
              top: (orb as any).top,
              left: (orb as any).left,
              right: (orb as any).right,
              bottom: (orb as any).bottom,
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(var(--primary)/.1), transparent)",
              filter: "blur(55px)",
              pointerEvents: "none",
              animation: `ambientDrift ${9 + i * 2}s ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className={`text-primary font-medium tracking-widest uppercase text-sm inline-flex items-center gap-2 opacity-0 ${headerVisible ? "testi-badge-visible" : ""}`}>
              Testimonials
              <span className="deco-line" />
            </span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 opacity-0 ${headerVisible ? "testi-h2-visible" : ""}`}>
              What Our <span className="shimmer-text">Guests Say</span>
            </h2>
            <p className={`text-muted-foreground text-lg opacity-0 ${headerVisible ? "testi-sub-visible" : ""}`}>
              Don't just take our word for it – hear from our wonderful community of regulars.
            </p>
          </div>

          {/* ── Grid ── */}
          <div
            ref={gridRef}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                testimonial={t}
                index={i}
                sectionVisible={gridVisible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;