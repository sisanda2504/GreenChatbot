import { useEffect, useRef, useState } from "react";
import { Recycle, MapPin, Leaf, Zap, ChevronDown, Globe, Battery, Droplets, Package, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: object) => void;
        open: () => void;
      };
    };
  }
}

const stats = [
  { label: "Items Sorted", value: "50K+", color: "hsl(142,60%,36%)" },
  { label: "Drop-offs Mapped", value: "1,200+", color: "hsl(165,55%,40%)" },
  { label: "Municipalities", value: "3", color: "hsl(90,50%,45%)" },
  { label: "SA Families Helped", value: "12K+", color: "hsl(48,80%,45%)" },
];

const features = [
  {
    icon: Package,
    title: "Sort Any Item",
    desc: "Not sure where something goes? Ask GreenBot — plastic, glass, paper, e-waste, and more.",
    color: "hsl(142,60%,36%)",
    bg: "hsl(142,60%,96%)",
  },
  {
    icon: MapPin,
    title: "Find Drop-offs",
    desc: "Locate the nearest certified recycling centres and drop-off points in your area.",
    color: "hsl(165,55%,40%)",
    bg: "hsl(165,55%,96%)",
  },
  {
    icon: Recycle,
    title: "Kerbside Collection",
    desc: "Get info on Think Twice, clear bag programmes, and your municipality's schedule.",
    color: "hsl(90,50%,45%)",
    bg: "hsl(90,50%,96%)",
  },
  {
    icon: Battery,
    title: "Hazardous & E-Waste",
    desc: "Batteries, electronics, chemicals, paint — handled correctly and safely.",
    color: "hsl(48,80%,45%)",
    bg: "hsl(48,80%,96%)",
  },
  {
    icon: Droplets,
    title: "Recycling Education",
    desc: "Understand why recycling matters and the real impact it has on South Africa's future.",
    color: "hsl(200,65%,45%)",
    bg: "hsl(200,65%,96%)",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    desc: "GreenBot understands greetings in English, Afrikaans, Zulu, and more SA languages.",
    color: "hsl(270,50%,50%)",
    bg: "hsl(270,50%,96%)",
  },
];

const municipalities = [
  { name: "City of Cape Town", abbr: "CoCT", color: "hsl(200,65%,45%)", icon: "🌊" },
  { name: "City of Johannesburg", abbr: "CoJ", color: "hsl(48,80%,45%)", icon: "🏙️" },
  { name: "eThekwini (Durban Metro)", abbr: "eThekwini", color: "hsl(142,60%,36%)", icon: "🌿" },
];

const steps = [
  { num: 1, title: "Open GreenBot", desc: "Click the chat icon in the bottom-right corner to start a conversation." },
  { num: 2, title: "Tell GreenBot what you need", desc: "Ask about recycling an item, find a drop-off, or learn about your kerbside collection." },
  { num: 3, title: "Get instant answers", desc: "GreenBot routes you to the right guide and gives you clear, actionable steps." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatBar({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="text-center space-y-1">
      <div
        className="text-4xl font-extrabold transition-all duration-700"
        style={{
          color,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const openChat = () => {
    if (window.voiceflow?.chat?.open) {
      window.voiceflow.chat.open();
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const featuresSection = useInView();
  const stepsSection = useInView();
  const muniSection = useInView();
  const ctaSection = useInView();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">GreenBot</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#municipalities" className="hover:text-foreground transition-colors">Municipalities</a>
          </div>
          <button
            onClick={openChat}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
          >
            Chat Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 hero-gradient relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-8 w-72 h-72 rounded-full opacity-20 animate-float" style={{ background: "radial-gradient(circle, hsl(142,60%,50%), transparent 70%)" }} />
        <div className="absolute bottom-0 left-4 w-48 h-48 rounded-full opacity-15 animate-float" style={{ background: "radial-gradient(circle, hsl(90,50%,50%), transparent 70%)", animationDelay: "2s" }} />

        <div
          ref={heroRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-border text-xs font-semibold text-primary shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            South Africa's Recycling Assistant
          </div>

          {/* Icon */}
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-primary shadow-lg flex items-center justify-center animate-float">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 rounded-3xl opacity-30 animate-pulse-ring" style={{ background: "hsl(142,60%,50%)" }} />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              Recycle smarter with{" "}
              <span className="text-primary">GreenBot</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your AI recycling guide for South Africa. Sort items correctly, find drop-offs near you, and understand kerbside collection — all in one chat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openChat}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Recycle className="w-5 h-5" />
              Start Recycling Chat
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/70 border border-border text-foreground font-semibold text-base hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              See how it works
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white/60 border border-border rounded-2xl p-6 backdrop-blur-sm shadow-sm">
            {stats.map((s, i) => (
              <StatBar key={s.label} value={s.value} label={s.label} color={s.color} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            ref={featuresSection.ref}
            className="text-center space-y-3 mb-14 transition-all duration-700"
            style={{
              opacity: featuresSection.inView ? 1 : 0,
              transform: featuresSection.inView ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">What GreenBot Can Do</p>
            <h2 className="text-4xl font-extrabold text-foreground">Everything you need to recycle right</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From sorting a single bottle to navigating hazardous waste — GreenBot has South Africa covered.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="card-hover rounded-2xl border border-border bg-card p-6 space-y-4"
                  style={{
                    opacity: featuresSection.inView ? 1 : 0,
                    transform: featuresSection.inView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: f.bg }}>
                    <Icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            ref={stepsSection.ref}
            className="text-center space-y-3 mb-14 transition-all duration-700"
            style={{
              opacity: stepsSection.inView ? 1 : 0,
              transform: stepsSection.inView ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Simple as 1-2-3</p>
            <h2 className="text-4xl font-extrabold text-foreground">How GreenBot works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="text-center space-y-4"
                style={{
                  opacity: stepsSection.inView ? 1 : 0,
                  transform: stepsSection.inView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                }}
              >
                <div className="w-14 h-14 rounded-full bg-primary text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                  {s.num}
                </div>
                <h3 className="font-bold text-foreground text-xl">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={openChat}
              className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Try GreenBot Now
            </button>
          </div>
        </div>
      </section>

      {/* Municipalities */}
      <section id="municipalities" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            ref={muniSection.ref}
            className="text-center space-y-3 mb-12 transition-all duration-700"
            style={{
              opacity: muniSection.inView ? 1 : 0,
              transform: muniSection.inView ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Location-aware</p>
            <h2 className="text-4xl font-extrabold text-foreground">Tailored to your municipality</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">GreenBot knows the recycling rules for South Africa's biggest metros — and answers based on where you are.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {municipalities.map((m, i) => (
              <div
                key={m.name}
                className="card-hover rounded-2xl border border-border bg-card p-6 text-center space-y-3"
                style={{
                  opacity: muniSection.inView ? 1 : 0,
                  transform: muniSection.inView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                <div className="text-4xl">{m.icon}</div>
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: m.color }}
                  >
                    {m.abbr}
                  </div>
                  <div className="font-semibold text-foreground">{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div
          ref={ctaSection.ref}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 transition-all duration-700"
          style={{
            opacity: ctaSection.inView ? 1 : 0,
            transform: ctaSection.inView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-lg animate-float">
            <Recycle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-foreground">Ready to recycle smarter?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            GreenBot is already waiting in the chat. One question — that's all it takes to start doing better for South Africa.
          </p>
          <button
            onClick={openChat}
            className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg inline-flex items-center gap-3"
          >
            <Leaf className="w-6 h-6" />
            Chat with GreenBot
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Recycle className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">GreenBot</span>
            <span className="text-muted-foreground text-sm">— Recycling made simple for South Africa</span>
          </div>
          <p className="text-muted-foreground text-xs">Built to make every South African a recycling champion.</p>
        </div>
      </footer>
    </div>
  );
}
