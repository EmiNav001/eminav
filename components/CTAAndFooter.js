export function CTA() {
  return (
    <section id="early-access" className="py-28 px-6 md:px-16 lg:px-24 bg-[#060d1a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#2dd4bf]/5 via-[#0ea5b0]/8 to-[#1e5fa8]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#2dd4bf]/10 border border-[#2dd4bf]/25 text-[#2dd4bf] text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-[#2dd4bf] rounded-full animate-pulse" />
          Now accepting early access
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Ready to navigate{" "}
          <span className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] bg-clip-text text-transparent">
            smarter?
          </span>
        </h2>

        <p className="text-[#7fa8bf] text-lg leading-relaxed font-light mb-10 max-w-xl mx-auto">
          Join the waitlist and be among the first to experience a navigation app
          that truly understands your city.
        </p>

        {/* Email form */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/[0.05] border border-[#2dd4bf]/20 text-white placeholder-[#7fa8bf] rounded-full px-5 py-3.5 text-sm outline-none focus:border-[#2dd4bf]/50 focus:bg-white/[0.08] transition-all"
          />
          <button className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2dd4bf]/20 whitespace-nowrap">
            Get Early Access
          </button>
        </div>

        <p className="text-[#7fa8bf]/60 text-xs">
          No spam. No credit card. Just early access when we launch.
        </p>

        {/* Social proof dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="flex -space-x-2">
            {["from-[#2dd4bf] to-[#0ea5b0]", "from-[#0ea5b0] to-[#1e5fa8]", "from-[#1e5fa8] to-[#2dd4bf]", "from-[#2dd4bf] to-[#1e5fa8]"].map((g, i) => (
              <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-[#060d1a]`} />
            ))}
          </div>
          <p className="text-[#7fa8bf] text-sm">
            <span className="text-white font-semibold">200+</span> people already on the waitlist
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#060d1a] border-t border-[#2dd4bf]/10 px-6 md:px-16 lg:px-24 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#1e5fa8] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8] bg-clip-text text-transparent">
                EmiNav
              </span>
            </div>
            <p className="text-[#7fa8bf] text-sm leading-relaxed font-light max-w-xs">
              The city navigation app that goes beyond maps — live data, local intelligence,
              and community knowledge in one place.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Product</h4>
            <ul className="space-y-2.5">
              {["Features", "How It Works", "Early Access", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#7fa8bf] text-sm hover:text-[#2dd4bf] transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Team", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#7fa8bf] text-sm hover:text-[#2dd4bf] transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2dd4bf]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#7fa8bf]/60 text-xs">
            © {new Date().getFullYear()} EmiNav. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-[#7fa8bf]/60 text-xs hover:text-[#2dd4bf] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
