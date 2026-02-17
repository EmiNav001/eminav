// ─────────────────────────────────────────────
// To add team members, update the `team` array.
// Each member needs: name, role, bio, initials,
// and optionally: linkedin, twitter.
// ─────────────────────────────────────────────

const team = [
  {
    initials: "EN",
    name: "EmiNav Founder",
    role: "Founder & CEO",
    bio: "Visionary behind EmiNav. Passionate about building technology that makes city life smarter, faster, and more connected.",
    gradient: "from-[#2dd4bf] to-[#1e5fa8]",
    linkedin: "#",
    twitter: "#",
  },
  // Add more team members here:
  // {
  //   initials: "AB",
  //   name: "Alex Brown",
  //   role: "CTO",
  //   bio: "Leads the engineering team building EmiNav's real-time navigation engine.",
  //   gradient: "from-[#0ea5b0] to-[#2dd4bf]",
  //   linkedin: "#",
  //   twitter: "#",
  // },
];

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Team() {
  return (
    <section id="team" className="py-28 px-6 md:px-16 lg:px-24 bg-[#0b1829] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#1e5fa8]/6 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8]" />
            <span className="text-[#2dd4bf] text-xs font-semibold tracking-[0.18em] uppercase">
              The Team
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e5fa8] to-[#2dd4bf]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            The people behind{" "}
            <span className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] bg-clip-text text-transparent">
              EmiNav
            </span>
          </h2>
          <p className="text-[#7fa8bf] text-lg max-w-lg mx-auto font-light">
            A passionate team of builders, navigators, and city lovers dedicated
            to reimagining how people move through the world.
          </p>
        </div>

        {/* Team cards */}
        <div className={`flex flex-wrap justify-center gap-8`}>
          {team.map((member) => (
            <div
              key={member.name}
              className="group w-full max-w-sm rounded-3xl border border-[#2dd4bf]/12 bg-white/[0.03] p-8 hover:border-[#2dd4bf]/28 hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#2dd4bf]/15 group-hover:scale-105 transition-transform duration-300`}>
                  {member.initials}
                </div>
                <div className="flex gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-full border border-[#2dd4bf]/20 flex items-center justify-center text-[#7fa8bf] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/50 transition-all duration-200"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="w-8 h-8 rounded-full border border-[#2dd4bf]/20 flex items-center justify-center text-[#7fa8bf] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/50 transition-all duration-200"
                    >
                      <TwitterIcon />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
              <div className="text-[#2dd4bf] text-sm font-semibold mb-4 tracking-wide">{member.role}</div>
              <p className="text-[#7fa8bf] text-sm leading-relaxed font-light">{member.bio}</p>
            </div>
          ))}

          {/* "We're Hiring" card */}
          <div className="w-full max-w-sm rounded-3xl border border-dashed border-[#2dd4bf]/20 bg-transparent p-8 flex flex-col items-center justify-center text-center group hover:border-[#2dd4bf]/40 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 rounded-2xl border border-dashed border-[#2dd4bf]/30 flex items-center justify-center text-[#2dd4bf] mb-5 group-hover:border-[#2dd4bf]/60 transition-colors">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Join the Team</h3>
            <p className="text-[#7fa8bf] text-sm font-light leading-relaxed mb-5">
              We're always looking for passionate people who love cities and great technology.
            </p>
            <a
              href="mailto:hello@eminav.com"
              className="text-[#2dd4bf] text-sm font-semibold hover:underline"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
