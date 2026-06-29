'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/app/components/layout/Footer';

/* ── Animated counter hook ── */
function useCountUp(target: number, triggered: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, triggered, duration]);
  return count;
}

function StatBlock({
  value, suffix, label, description,
}: { value: number; suffix: string; label: string; description: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const display =
    value >= 1000
      ? `${(count / 1000).toFixed(0)}K`
      : value < 10
      ? count.toFixed(1)
      : Math.floor(count).toString();

  return (
    <div ref={ref} className="text-center p-10 bg-white/[0.02] border border-white/[0.06] group hover:border-cyan-400/20 transition-all duration-500">
      <div
        className="text-5xl md:text-6xl font-black mb-2"
        style={{
          background: 'linear-gradient(135deg, #fff, #00e5ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {display}{suffix}
      </div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-black mb-2">{label}</div>
      <div className="text-xs text-white/30 leading-relaxed max-w-[180px] mx-auto">{description}</div>
    </div>
  );
}

/* ── Timeline entry ── */
function TimelineItem({
  year, title, body, align,
}: { year: string; title: string; body: string; align: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-8 md:gap-16 ${align === 'right' ? 'flex-row-reverse' : ''} transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${align === 'right' ? 'text-left md:text-right' : ''}`}>
        <p className="eyebrow mb-2">{year}</p>
        <h3 className="text-xl font-black tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{body}</p>
      </div>

      {/* Dot */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full border-2 border-cyan-400"
          style={{ boxShadow: '0 0 12px rgba(0,229,255,0.6)' }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

/* ── Athlete card ── */
function AthleteCard({
  name, sport, emoji, quote,
}: { name: string; sport: string; emoji: string; quote: string }) {
  return (
    <div className="group p-6 bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 transition-all duration-400 cursor-default">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
      <p className="text-[9px] tracking-[0.3em] uppercase text-cyan-400 mb-1">{sport}</p>
      <h4 className="text-base font-black mb-3">{name}</h4>
      <p className="text-xs text-white/35 leading-relaxed italic">"{quote}"</p>
    </div>
  );
}

/* ── Value card ── */
function ValueCard({
  icon, title, body,
}: { icon: string; title: string; body: string }) {
  return (
    <div className="group p-8 bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 hover:bg-white/[0.03] transition-all duration-400">
      <div
        className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block"
        style={{ filter: 'drop-shadow(0 0 12px rgba(0,229,255,0.4))' }}
      >
        {icon}
      </div>
      <h3 className="text-base font-black tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-white/35 leading-relaxed">{body}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[80vh] flex items-end pb-24 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,102,255,0.05) 0%, #000 60%)',
        }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,102,255,0.06) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(0,102,255,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 40%, black 80%, transparent 100%)',
          }}
        />

        {/* Glow */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)' }}
        />

        {/* Floating falcon emoji */}
        <div
          className="absolute top-32 right-[10%] hidden lg:block pointer-events-none select-none"
          style={{
            fontSize: '180px',
            opacity: 0.06,
            filter: 'blur(2px)',
            animation: 'float 6s ease-in-out infinite',
          }}
          aria-hidden="true"
        >
          🦅
        </div>

        <div className="section-container relative z-10">
          <p
            className="eyebrow mb-6 opacity-0"
            style={{ animation: 'fadeUp 0.8s 0.2s ease forwards' }}
          >
            Our Story
          </p>
          <h1
            className="display-xl mb-8 opacity-0 max-w-4xl"
            style={{ animation: 'fadeUp 0.9s 0.4s ease forwards' }}
          >
            Born in Morocco.{' '}
            <br className="hidden md:block" />
            <span
              style={{
                background: 'linear-gradient(135deg, #0066ff, #00e5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Built for Champions.
            </span>
          </h1>
          <p
            className="text-base text-white/40 max-w-xl leading-relaxed opacity-0"
            style={{ animation: 'fadeUp 0.8s 0.6s ease forwards' }}
          >
            SOUFLY was founded by athletes, for athletes. We believe that premium
            sports equipment shouldn't be a luxury — it should be accessible to every
            Moroccan who dreams of greatness.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO QUOTE ── */}
      <section
        className="py-24 border-t border-b border-white/[0.06] relative"
        style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.04) 0%, rgba(0,229,255,0.02) 100%)' }}
      >
        <div className="section-container text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-8 opacity-30 select-none">"</div>
            <blockquote className="text-2xl md:text-3xl font-black leading-tight tracking-tight mb-8">
              The name Soufly comes from{' '}
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, #0066ff, #00e5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                the spirit of the falcon
              </em>
              {' '}— fast, precise, relentless. These are the values we embed into every product we create.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-white/10" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                Youssef Elhassani, Founder
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 bg-black">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">By the Numbers</p>
            <h2 className="display-md">
              Impact That <span className="text-gradient-blue">Speaks</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
            <StatBlock value={50000} suffix="+" label="Athletes Equipped" description="Across Morocco and beyond" />
            <StatBlock value={200}   suffix="+" label="Premium Products"  description="Engineered for performance" />
            <StatBlock value={4.9}   suffix="★" label="Average Rating"    description="From verified purchases" />
            <StatBlock value={6}     suffix="+"  label="Years of Craft"    description="Perfecting every detail" />
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="py-24 relative"
        style={{ background: 'linear-gradient(180deg, #000 0%, #030310 50%, #000 100%)' }}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">Our Journey</p>
            <h2 className="display-md">
              How We Got <span className="text-gradient-blue">Here</span>
            </h2>
          </div>

          {/* Vertical line */}
          <div className="relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(0,102,255,0.4) 20%, rgba(0,229,255,0.4) 80%, transparent)' }}
            />

            <div className="flex flex-col gap-16">
              <TimelineItem
                year="2019"
                align="left"
                title="The Idea Takes Flight"
                body="Youssef Elhassani, a former youth football player from Casablanca, notices a critical gap: premium sports gear is either unavailable in Morocco or prohibitively expensive. SOUFLY is born as a concept."
              />
              <TimelineItem
                year="2020"
                align="right"
                title="First Products Launched"
                body="Working from a small workshop in Casablanca, SOUFLY launches its first line of football boots. 500 pairs sell out in 72 hours. The response is overwhelming — athletes across the country are hungry for quality."
              />
              <TimelineItem
                year="2021"
                align="left"
                title="Expansion to Fitness"
                body="Athlete feedback drives expansion into gym equipment, resistance training, and recovery tools. SOUFLY partners with local Moroccan athletes to co-design products that fit their actual needs."
              />
              <TimelineItem
                year="2022"
                align="right"
                title="50,000 Athletes Milestone"
                body="SOUFLY reaches 50,000 athletes equipped across 12 Moroccan cities. A flagship experience center opens in Casablanca Mall, featuring immersive product zones and professional fitting services."
              />
              <TimelineItem
                year="2023"
                align="left"
                title="Digital Revolution"
                body="SOUFLY launches Morocco's most advanced sports e-commerce platform — a fully interactive 3D digital showroom accessible from any device. The future of sports retail arrives in North Africa."
              />
              <TimelineItem
                year="2025"
                align="right"
                title="The Next Chapter"
                body="A new premium product line co-engineered with professional Moroccan athletes. Global ambitions. Same Moroccan soul."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-black">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="display-md">
              The SOUFLY <span className="text-gradient-blue">Code</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
            <ValueCard
              icon="⚡"
              title="Performance First"
              body="Every product is engineered around one question: does it make athletes better? If the answer is no, it never ships."
            />
            <ValueCard
              icon="🔬"
              title="Material Obsession"
              body="We source only the finest materials globally — kangaroo leather, carbon fiber, natural latex, aircraft-grade aluminum — then test them brutally."
            />
            <ValueCard
              icon="🇲🇦"
              title="Moroccan Identity"
              body="SOUFLY is a Moroccan brand and proud of it. Our designs, our team, and our mission are rooted in the spirit and ambition of our country."
            />
            <ValueCard
              icon="♻️"
              title="Responsible Design"
              body="Premium doesn't have to harm the planet. We commit to sustainable sourcing, minimal packaging, and long-lasting products that don't end up in landfill."
            />
          </div>
        </div>
      </section>

      {/* ── ATHLETE ENDORSEMENTS ── */}
      <section
        className="py-24 relative"
        style={{ background: 'linear-gradient(180deg, #000 0%, #030310 100%)' }}
      >
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">SOUFLY Athletes</p>
            <h2 className="display-md">
              Trusted by the <span className="text-gradient-blue">Best</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
            <AthleteCard
              name="Hamza Ait Said"
              sport="Football · CAF"
              emoji="⚽"
              quote="SOUFLY boots gave me the confidence to play on any surface. My touch on the ball improved in the first training session."
            />
            <AthleteCard
              name="Sara Benali"
              sport="Marathon Running"
              emoji="🏃‍♀️"
              quote="I broke my personal marathon record wearing Velocity RUN 9s. The carbon plate is a genuine game changer."
            />
            <AthleteCard
              name="Karim Moussaoui"
              sport="Powerlifting"
              emoji="🏋️"
              quote="The Iron Grip gloves are the only ones that have lasted through a full competition prep cycle without falling apart."
            />
            <AthleteCard
              name="Nadia El Fassi"
              sport="CrossFit"
              emoji="💪"
              quote="SOUFLY understands what athletes actually need. Not marketing fluff — real performance equipment."
            />
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-black">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">The People</p>
            <h2 className="display-md">
              Meet the <span className="text-gradient-blue">Team</span>
            </h2>
            <p className="text-sm text-white/35 mt-4 max-w-md mx-auto">
              A crew of athletes, engineers, and designers who wake up every day thinking about how to make sports equipment better.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] border border-white/[0.06]">
            {[
              { name: 'Youssef E.', role: 'Founder & CEO',        emoji: '🦅' },
              { name: 'Fatima Z.',  role: 'Head of Design',        emoji: '✏️' },
              { name: 'Omar B.',    role: 'Product Engineering',   emoji: '🔧' },
              { name: 'Lina A.',   role: 'Athlete Relations',     emoji: '🤝' },
              { name: 'Mehdi K.',  role: 'Digital Experience',    emoji: '💻' },
              { name: 'Sara H.',   role: 'Sustainability Lead',   emoji: '🌿' },
            ].map(member => (
              <div
                key={member.name}
                className="group flex flex-col items-center text-center py-10 px-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
              >
                <div
                  className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}
                >
                  {member.emoji}
                </div>
                <p className="text-sm font-black mb-1">{member.name}</p>
                <p className="text-[9px] text-white/30 tracking-widest uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #000 0%, #030310 50%, #000 100%)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)' }}
        />

        <div className="section-container text-center relative z-10">
          <p className="eyebrow mb-3">Where We Are</p>
          <h2 className="display-md mb-6">
            Casablanca, Morocco{' '}
            <span className="text-gradient-blue">🇲🇦</span>
          </h2>
          <p className="text-sm text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
            Our headquarters, design studio, and experience centre are all in the heart of Casablanca.
            We also ship nationwide — from Tangier to Agadir, every athlete gets the same premium experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] max-w-2xl mx-auto">
            {[
              { icon: '📍', label: 'HQ', value: 'Casablanca, Morocco' },
              { icon: '📦', label: 'Delivery', value: 'Nationwide 24–48h' },
              { icon: '📞', label: 'Support', value: '+212 5XX-XXX-XXX' },
            ].map(item => (
              <div key={item.label} className="py-8 px-6 bg-white/[0.02] text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-cyan-400 mb-1">{item.label}</p>
                <p className="text-sm text-white/60">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-black border-t border-white/[0.06]">
        <div className="section-container">
          <p className="eyebrow mb-4">Join Us</p>
          <h2 className="display-md mb-6">
            Equip Yourself.{' '}
            <span className="text-gradient-blue">Dominate the Game.</span>
          </h2>
          <p className="text-sm text-white/35 mb-10 max-w-md mx-auto">
            Browse our full collection and find the gear that matches your ambition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="btn btn-primary px-10 py-4 text-[11px] no-underline">
              Shop the Collection
            </Link>
            <Link href="/store" className="btn btn-ghost px-10 py-4 text-[11px] no-underline">
              Enter 3D Showroom
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
