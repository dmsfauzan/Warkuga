"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Jl. Ja'ani Nasir No.49, Cawang, Kramat Jati, East Jakarta City, Jakarta 13630" },
  { icon: Phone,  label: "Phone",   value: "+62 21 1234 5678" },
  { icon: Mail,   label: "Email",   value: "hello@warkuga.id" },
  { icon: Clock,  label: "Hours",   value: "Mon-Sun: 08:00 - 22:00" },
];

const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/WARKUGA+CAWANG";

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── ContactInfoCard ── */
function ContactInfoCard({ item, index, visible }: { item: typeof contactInfo[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setEntered(true), index * 100 + 80);
    return () => clearTimeout(t);
  }, [visible, index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="contact-card flex items-start gap-4 p-5 bg-card rounded-xl"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateX(0) scale(1)" : "translateX(-28px) scale(0.97)",
        transition: "opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* hover wash */}
      <div style={{
        position:"absolute", inset:0, borderRadius:"inherit",
        background:"linear-gradient(135deg, hsl(var(--primary)/.07) 0%, transparent 60%)",
        opacity: hovered ? 1 : 0, transition:"opacity 0.35s", pointerEvents:"none",
      }}/>
      {/* bottom shimmer */}
      <div style={{
        position:"absolute", bottom:0, left: hovered ? "0%" : "50%",
        width: hovered ? "100%" : "0%", height:2,
        background:"linear-gradient(90deg,transparent,hsl(var(--primary)),transparent)",
        transition:"width 0.4s cubic-bezier(.22,1,.36,1), left 0.4s cubic-bezier(.22,1,.36,1)",
        borderRadius:"0 0 12px 12px",
      }}/>

      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-lg gradient-bg flex items-center justify-center"
        style={{
          transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
          boxShadow: hovered ? "0 6px 20px hsl(var(--primary)/.35)" : "none",
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease",
        }}
      >
        <item.icon className="w-6 h-6 text-primary-foreground" />
      </div>

      <div style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition:"transform 0.25s ease" }}>
        <h3 className="font-medium text-muted-foreground text-sm">{item.label}</h3>
        <p className="text-foreground font-medium mt-1">{item.value}</p>
      </div>
    </div>
  );
}

/* ── FormField wrapper with float-label animation ── */
function FormField({ label, children, visible, delay }: { label?: string; children: React.ReactNode; visible: boolean; delay: number }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setEntered(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);
  return (
    <div style={{
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.45s cubic-bezier(.22,1,.36,1), transform 0.45s cubic-bezier(.22,1,.36,1)",
    }}>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════ */
const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", message:"" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { ref: headerRef, inView: headerVisible } = useInView(0.2);
  const { ref: leftRef,   inView: leftVisible   } = useInView(0.1);
  const { ref: formRef,   inView: formVisible    } = useInView(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon!" });
    setFormData({ name:"", email:"", phone:"", message:"" });
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

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
        @keyframes slideRight {
          from { opacity:0; transform:translateX(36px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes shimmerText {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes lineExpand {
          from { width:0; opacity:0; }
          to   { width:2.5rem; opacity:1; }
        }
        @keyframes mapReveal {
          from { opacity:0; transform:scale(0.96) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform:rotate(360deg); }
        }
        @keyframes sendPop {
          0%   { transform:scale(1); }
          40%  { transform:scale(1.14); }
          70%  { transform:scale(0.95); }
          100% { transform:scale(1); }
        }
        @keyframes checkIn {
          from { opacity:0; transform:scale(0.5) rotate(-15deg); }
          to   { opacity:1; transform:scale(1) rotate(0deg); }
        }
        @keyframes ambientDrift {
          0%,100% { transform:translate(0,0); }
          50%      { transform:translate(15px,-15px); }
        }
        @keyframes formSlide {
          from { opacity:0; transform:translateX(36px) scale(0.97); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes inputGlow {
          0%,100% { box-shadow:0 0 0 0 hsl(var(--primary)/.0); }
          50%      { box-shadow:0 0 0 3px hsl(var(--primary)/.2); }
        }
        @keyframes ripple {
          0%   { transform:scale(0); opacity:0.4; }
          100% { transform:scale(4); opacity:0; }
        }

        .contact-badge-vis  { animation: fadeDown 0.55s cubic-bezier(.22,1,.36,1) both; }
        .contact-h2-vis     { animation: fadeUp  0.6s  cubic-bezier(.22,1,.36,1) 0.12s both; }
        .contact-sub-vis    { animation: fadeUp  0.6s  cubic-bezier(.22,1,.36,1) 0.24s both; }

        .shimmer-text {
          background:linear-gradient(90deg,hsl(var(--primary)),hsl(var(--primary)/.5),hsl(var(--primary)));
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmerText 3s linear infinite;
        }
        .deco-line {
          display:inline-block; height:3px; border-radius:9999px;
          background:hsl(var(--primary));
          animation:lineExpand 0.55s cubic-bezier(.22,1,.36,1) 0.4s both;
        }

        /* Input focus ring */
        .fancy-input { transition: border-color 0.25s, box-shadow 0.25s; }
        .fancy-input:focus { border-color:hsl(var(--primary)); box-shadow:0 0 0 3px hsl(var(--primary)/.15); outline:none; }
        .fancy-input.focused { animation:inputGlow 1.5s ease-in-out infinite; }

        /* Send button */
        .send-btn {
          position:relative; overflow:hidden;
          transition: transform 0.25s cubic-bezier(.22,1,.36,1),
                      opacity 0.2s, box-shadow 0.25s;
        }
        .send-btn:hover:not(:disabled) {
          transform:translateY(-2px) scale(1.02);
          box-shadow:0 8px 24px hsl(var(--primary)/.35);
        }
        .send-btn:active:not(:disabled) { transform:scale(0.97); }
        .send-btn.just-sent { animation:sendPop 0.5s cubic-bezier(.22,1,.36,1); }
        .send-btn .btn-ripple {
          position:absolute; border-radius:50%;
          background:rgba(255,255,255,0.3);
          width:80px; height:80px; margin:-40px;
          animation:ripple 0.7s ease-out forwards;
          pointer-events:none;
        }

        /* Spinner */
        .spinner { animation:spin 0.8s linear infinite; }

        /* Maps */
        .map-enter { animation:mapReveal 0.65s cubic-bezier(.22,1,.36,1) 0.2s both; }

        /* Form card */
        .form-card-enter { animation:formSlide 0.65s cubic-bezier(.22,1,.36,1) 0.1s both; }
      `}</style>

      <section id="contact" className="section-padding bg-background overflow-hidden" style={{ position:"relative" }}>

        {/* Ambient orbs */}
        {[
          { top:-80,  right:-80,  size:320, delay:"0s"  },
          { bottom:-60, left:-60, size:240, delay:"-4s" },
        ].map((o, i) => (
          <div key={i} style={{
            position:"absolute",
            top:(o as any).top, right:(o as any).right,
            bottom:(o as any).bottom, left:(o as any).left,
            width:o.size, height:o.size,
            borderRadius:"50%",
            background:"radial-gradient(circle,hsl(var(--primary)/.1),transparent)",
            filter:"blur(55px)", pointerEvents:"none",
            animation:`ambientDrift ${10+i*3}s ease-in-out infinite`,
            animationDelay:o.delay,
          }}/>
        ))}

        <div className="container-custom" style={{ position:"relative", zIndex:1 }}>

          {/* ── Header ── */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
            <span className={`text-primary font-medium tracking-widest uppercase text-sm inline-flex items-center gap-2 opacity-0 ${headerVisible ? "contact-badge-vis" : ""}`}>
              Get in Touch <span className="deco-line"/>
            </span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 opacity-0 ${headerVisible ? "contact-h2-vis" : ""}`}>
              Visit Us <span className="shimmer-text">Today</span>
            </h2>
            <p className={`text-muted-foreground text-lg opacity-0 ${headerVisible ? "contact-sub-vis" : ""}`}>
              Have a question, want to reserve a table, or just say hello? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── Left: info + map ── */}
            <div ref={leftRef} className="space-y-6">
              {contactInfo.map((item, i) => (
                <ContactInfoCard key={item.label} item={item} index={i} visible={leftVisible} />
              ))}

              {/* Map */}
              <div className={leftVisible ? "map-enter" : ""} style={{ opacity: leftVisible ? 1 : 0 }}>
                <div
                  className="aspect-video rounded-xl overflow-hidden bg-muted"
                  style={{
                    boxShadow:"0 8px 30px rgba(0,0,0,0.12)",
                    transition:"box-shadow 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,0.12)")}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1054625722136!2d106.86574747499047!3d-6.249832093738569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3500ff16679%3A0x1c318e181495cb48!2sWARKUGA%20CAWANG!5e0!3m2!1sid!2sid!4v1769488584392!5m2!1sid!2sid"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-3 group"
                  style={{ transition:"gap 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.gap="10px")}
                  onMouseLeave={e => (e.currentTarget.style.gap="8px")}
                >
                  <ExternalLink className="w-4 h-4" style={{ transition:"transform 0.2s" }}/>
                  <span style={{ borderBottom:"1px solid transparent", transition:"border-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor="hsl(var(--primary))")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor="transparent")}
                  >
                    Open in Google Maps
                  </span>
                </a>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div
              ref={formRef}
              className={`bg-card p-8 rounded-2xl card-elevated ${formVisible ? "form-card-enter" : ""}`}
              style={{ opacity: formVisible ? 1 : 0, position:"relative", overflow:"hidden" }}
            >
              {/* Corner accent */}
              <div style={{
                position:"absolute", top:0, right:0, width:120, height:120,
                background:"radial-gradient(circle at top right, hsl(var(--primary)/.12), transparent)",
                pointerEvents:"none",
              }}/>

              <h3
                className="font-display text-2xl font-bold text-foreground mb-6"
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? "translateY(0)" : "translateY(12px)",
                  transition:"opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
                }}
              >
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Full Name" visible={formVisible} delay={250}>
                  <Input
                    name="name" value={formData.name} onChange={handleChange}
                    placeholder="Your name" required
                    className="fancy-input bg-background"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </FormField>

                <FormField visible={formVisible} delay={320}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        name="email" type="email" value={formData.email} onChange={handleChange}
                        placeholder="you@example.com" required
                        className="fancy-input bg-background"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                      <Input
                        name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        placeholder="+62 xxx xxxx xxxx"
                        className="fancy-input bg-background"
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                </FormField>

                <FormField label="Message" visible={formVisible} delay={400}>
                  <Textarea
                    name="message" value={formData.message} onChange={handleChange}
                    placeholder="How can we help you?" rows={5} required
                    className="fancy-input bg-background resize-none"
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </FormField>

                <FormField visible={formVisible} delay={480}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    onClick={(e) => {
                      if (isSubmitting) return;
                      const btn = e.currentTarget;
                      const circle = document.createElement("span");
                      circle.className = "btn-ripple";
                      const rect = btn.getBoundingClientRect();
                      circle.style.left = `${e.clientX - rect.left}px`;
                      circle.style.top  = `${e.clientY - rect.top}px`;
                      btn.appendChild(circle);
                      setTimeout(() => circle.remove(), 750);
                    }}
                    className={`send-btn w-full gradient-bg text-primary-foreground ${submitted ? "just-sent" : ""}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="spinner w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                        </svg>
                        Sending...
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center gap-2" style={{ animation:"checkIn 0.4s cubic-bezier(.22,1,.36,1)" }}>
                        ✓ Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" style={{ transition:"transform 0.2s" }}/>
                      </span>
                    )}
                  </Button>
                </FormField>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;