const steps = [
  {
    number: "01",
    title: "Open EmiNav",
    desc: "Launch the app and instantly see a live, intelligent map of your city — updated in real time.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Set Your Destination",
    desc: "Search for a place, browse by category, or let EmiNav suggest based on your context and time of day.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Navigate Smarter",
    desc: "Follow AI-optimised routes with live updates, crowd info, and local tips surfaced exactly when you need them.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Arrive Informed",
    desc: "Get there knowing wait times, parking options, best entrances, and what the community says about the spot.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 md:px-16 lg:px-24 bg-[#060d1a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-tl from-[#2dd4bf]/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8]" />
            <span className="text-[#2dd4bf] text-xs font-semibold tracking-[0.18em] uppercase">
              How It Works
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e5fa8] to-[#2dd4bf]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Up and running in{" "}
            <span className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] bg-clip-text text-transparent">
              four steps
            </span>
          </h2>
          <p className="text-[#7fa8bf] text-lg max-w-lg mx-auto font-light">
            No complicated setup. Just open EmiNav and you're already navigating smarter.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-[#2dd4bf]/20 via-[#0ea5b0]/30 to-[#1e5fa8]/20 z-0" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center group">
              {/* Step number + icon circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#1e5fa8] flex items-center justify-center text-white shadow-xl shadow-[#2dd4bf]/20 group-hover:shadow-[#2dd4bf]/35 transition-shadow duration-300 group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#060d1a] border border-[#2dd4bf]/40 flex items-center justify-center">
                  <span className="text-[#2dd4bf] text-[9px] font-bold">{step.number}</span>
                </div>
              </div>

              <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-[#7fa8bf] text-sm leading-relaxed font-light max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
