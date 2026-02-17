export default function About() {
  return (
    <section id="about" className="py-28 px-6 md:px-16 lg:px-24 relative overflow-hidden bg-[#060d1a]">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#2dd4bf]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1e5fa8]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-[2px] bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8]" />
          <span className="text-[#2dd4bf] text-xs font-semibold tracking-[0.18em] uppercase">
            About EmiNav
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white mb-6">
              Navigation built for the{" "}
              <span className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] bg-clip-text text-transparent">
                real world
              </span>
            </h2>
            <p className="text-[#7fa8bf] text-lg leading-relaxed mb-5 font-light">
              EmiNav was born from a simple frustration — existing navigation tools
              tell you where to go, but not what's happening when you get there.
              We built a smarter city navigation experience that combines real-time
              data, local intelligence, and community knowledge.
            </p>
            <p className="text-[#7fa8bf] text-lg leading-relaxed mb-8 font-light">
              Whether you're exploring a new neighborhood, finding the fastest
              route through the city, or discovering hidden gems nearby — EmiNav
              gives you the full picture, not just the map.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "10K+", label: "Locations mapped" },
                { value: "Real-time", label: "Live city data" },
                { value: "AI-powered", label: "Smart routing" },
              ].map((stat) => (
                <div key={stat.label} className="border border-[#2dd4bf]/15 rounded-2xl p-4 bg-white/[0.03]">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[#7fa8bf] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mission card */}
          <div className="relative">
            <div className="rounded-3xl border border-[#2dd4bf]/15 bg-white/[0.03] p-10 backdrop-blur-sm">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#1e5fa8] flex items-center justify-center mb-6 shadow-lg shadow-[#2dd4bf]/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-[#7fa8bf] leading-relaxed mb-8 font-light">
                To make every city feel like home — by giving people intelligent,
                context-aware navigation that goes beyond directions and truly
                understands the pulse of urban life.
              </p>

              {/* Values */}
              <div className="space-y-4">
                {[
                  { icon: "⚡", title: "Real-time accuracy", desc: "Data that updates as the city moves" },
                  { icon: "🧠", title: "Local intelligence", desc: "Insights no algorithm can replicate" },
                  { icon: "🤝", title: "Community-first", desc: "Built with and for the people who use it" },
                ].map((v) => (
                  <div key={v.title} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{v.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{v.title}</div>
                      <div className="text-[#7fa8bf] text-sm font-light">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-[#2dd4bf]/20 to-[#1e5fa8]/20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
