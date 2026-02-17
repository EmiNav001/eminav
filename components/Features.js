const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Real-Time Navigation",
    desc: "Live traffic, road closures, and city events updated continuously so your route is always current.",
    accent: "from-[#2dd4bf] to-[#0ea5b0]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Smart City Discovery",
    desc: "Find places that match your mood, schedule, and context — not just your search query.",
    accent: "from-[#0ea5b0] to-[#1e5fa8]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Community Insights",
    desc: "Real tips from real locals. Verified knowledge that algorithms and review sites consistently miss.",
    accent: "from-[#1e5fa8] to-[#2dd4bf]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Live Crowd Data",
    desc: "Know how busy a place is before you arrive. No more wasted trips to packed venues.",
    accent: "from-[#2dd4bf] to-[#1e5fa8]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI Route Intelligence",
    desc: "Routes that adapt to your preferences, time of day, and real-world conditions automatically.",
    accent: "from-[#0ea5b0] to-[#2dd4bf]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Privacy First",
    desc: "Your location data stays yours. We never sell, share, or store your movement history.",
    accent: "from-[#1e5fa8] to-[#0ea5b0]",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6 md:px-16 lg:px-24 bg-[#0b1829] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8]" />
            <span className="text-[#2dd4bf] text-xs font-semibold tracking-[0.18em] uppercase">
              Features
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e5fa8] to-[#2dd4bf]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Everything your city navigation{" "}
            <span className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] bg-clip-text text-transparent">
              should be
            </span>
          </h2>
          <p className="text-[#7fa8bf] text-lg max-w-xl mx-auto font-light leading-relaxed">
            EmiNav combines the best of maps, local knowledge, and live data
            into one seamless city companion.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-[#2dd4bf]/10 bg-white/[0.03] p-7 hover:border-[#2dd4bf]/30 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#2dd4bf]/5 to-transparent pointer-events-none" />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-[#7fa8bf] text-sm leading-relaxed font-light">{feature.desc}</p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
