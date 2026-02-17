'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Load the HTML content after mount
    const container = document.getElementById('html-container')
    if (container) {
      container.innerHTML = `

  <!-- NAV -->
  <nav>
    <a href="#hero" class="nav-logo">
      <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9Ijg4MCIgdmlld0JveD0iMCAwIDgwMCA4ODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im5nIiB4MT0iMC4zIiB5MT0iMCIgeDI9IjAuNyIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiAgc3RvcC1jb2xvcj0iIzJFQ0ZDNSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzFCQThDMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxQTVBOUUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik00MDAgMTIwIEM1NjAgMTIwIDY4MCAyNDAgNjgwIDQwMCBDNjgwIDU2MCA0MDAgODgwIDQwMCA4ODAgQzQwMCA4ODAgMTIwIDU2MCAxMjAgNDAwIEMxMjAgMjQwIDI0MCAxMjAgNDAwIDEyMCBaIiBmaWxsPSJ1cmwoI25nKSIvPgogIDxlbGxpcHNlIGN4PSIzMTAiIGN5PSIyNjAiIHJ4PSIxMDAiIHJ5PSI3NSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTIwIDMxMCAyNjApIi8+CiAgPHBhdGggZD0iTTMwMCAzMDAgSDUyMCBDNTYwIDMwMCA1NjAgMzYwIDUyMCAzNjAgSDM2MCBWNDQwIEg1MjAgQzU2MCA0NDAgNTYwIDUwMCA1MjAgNTAwIEgzNjAgVjU4MCBINTIwIEM1NjAgNTgwIDU2MCA2NDAgNTIwIDY0MCBIMzAwIFoiIGZpbGw9IndoaXRlIi8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMzUwLDQ3MCAzOTAsNDcwIDQyMCw0MzAgNDUwLDUyMCA0ODAsNDcwIDUyMCw0NzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFCQThDMCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==" alt="EmiNav" style="height:46px;width:auto;" />
      <span style="font-family:'DM Serif Display',serif;font-size:1.4rem;color:white;letter-spacing:-0.02em;margin-left:10px;">EmiNav</span>
    </a>
    <ul class="nav-links">
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#hero" class="nav-cta">Find Care →</a></li>
    </ul>
  </nav>

  <!-- HERO -->
  <section id="hero">
    <div class="hero-bg-grid"></div>
    <div class="hero-bg-glow"></div>

    <div class="hero-left">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        Now live in Nairobi & Lagos
      </div>

      <h1 class="hero-headline">
        Find the <em>right</em> care,<br/>not just <em>any</em> care.
      </h1>

      <p class="hero-sub">
        EmiNav is Africa's first intent-based health navigation platform. Tell us what you need — we'll find the facility that can actually handle it.
      </p>

      <div class="hero-actions">
        <a href="#find-care" class="btn-primary" onclick="document.querySelector && (window._city='Lagos')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Lagos
        </a>
        <a href="#find-care" class="btn-secondary" onclick="document.querySelector && (window._city='Nairobi')" style="border-color:rgba(255,255,255,0.35);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Nairobi
        </a>
      </div>

      <div class="hero-stats">
        <div>
          <div class="hero-stat-value">2</div>
          <div class="hero-stat-label">Cities</div>
        </div>
        <div>
          <div class="hero-stat-value">11</div>
          <div class="hero-stat-label">Intent Types</div>
        </div>
        <div>
          <div class="hero-stat-value">100%</div>
          <div class="hero-stat-label">Verified</div>
        </div>
      </div>
    </div>

    <div class="hero-right">
      <div class="app-mockup">
        <div class="mockup-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 56" width="36" height="46">
  <defs>
    <linearGradient id="ng1" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#2ECEC4"/>
      <stop offset="55%" stop-color="#1BA8B8"/>
      <stop offset="100%" stop-color="#1A5A9E"/>
    </linearGradient>
  </defs>
  <path d="M22 2C12 2 4 10 4 20C4 30 12 40 22 51C32 40 40 30 40 20C40 10 32 2 22 2Z" fill="url(#ng1)"/>
  <ellipse cx="16" cy="12" rx="8" ry="6" fill="white" fill-opacity="0.15" transform="rotate(-15 16 12)"/>
  <!-- E top arm -->
  <path d="M12 11 L30 11 Q34 11 34 15 Q34 19 30 19 L18 19 L18 22 L12 22Z" fill="white"/>
  <!-- E bottom arm -->
  <path d="M18 29 L30 29 Q34 29 34 33 Q34 37 30 37 L12 37 L12 29Z" fill="white"/>
  <!-- E spine -->
  <rect x="12" y="11" width="6" height="26" rx="2" fill="white"/>
  <!-- E middle + ECG -->
  <rect x="18" y="22" width="16" height="7" fill="white"/>
  <path d="M18 25.5 L21 25.5 L22.5 21 L24.5 30 L26.5 21 L28.5 30 L30 25.5 L34 25.5"
    fill="none" stroke="#1BA8B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          <span class="mockup-location">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Nairobi
          </span>
        </div>
        <div class="mockup-question">What's happening?</div>
        <div class="mockup-intents">
          <div class="mockup-intent">
            <div class="mockup-intent-icon" style="background:rgba(239,68,68,0.15)">🚨</div>
            <span class="mockup-intent-text">Accident / Trauma</span>
            <span class="mockup-intent-urgent">URGENT</span>
          </div>
          <div class="mockup-intent">
            <div class="mockup-intent-icon" style="background:rgba(236,72,153,0.12)">🤰</div>
            <span class="mockup-intent-text">Labor / Pregnancy</span>
            <span class="mockup-intent-urgent">URGENT</span>
          </div>
          <div class="mockup-intent">
            <div class="mockup-intent-icon" style="background:rgba(245,158,11,0.12)">👶</div>
            <span class="mockup-intent-text">Child Emergency</span>
          </div>
          <div class="mockup-intent">
            <div class="mockup-intent-icon" style="background:rgba(99,102,241,0.12)">🧠</div>
            <span class="mockup-intent-text">Stroke Symptoms</span>
          </div>
          <div class="mockup-intent">
            <div class="mockup-intent-icon" style="background:rgba(16,185,129,0.12)">🔬</div>
            <span class="mockup-intent-text">Diagnostic Center</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUSTED BAR -->
  <div class="trusted-bar">
    <span class="trusted-label">Currently serving</span>
    <div class="trusted-cities">
      <div class="trusted-city">
        <span class="city-dot"></span>
        Nairobi, Kenya
      </div>
      <div class="trusted-city">
        <span class="city-dot"></span>
        Lagos, Nigeria
      </div>
      <div class="trusted-city" style="opacity:0.45">
        <span class="city-dot" style="background:#CBD5E1"></span>
        More cities coming soon
      </div>
    </div>
  </div>

  <!-- HOW IT WORKS -->
  <section id="how-it-works">
    <div class="reveal">
      <div class="section-label">The EmiNav Difference</div>
      <h2 class="section-title">Decision-first,<br/>not search-first.</h2>
      <p class="section-sub">Google shows you 50 clinics. EmiNav shows you the right one for your specific situation.</p>
    </div>

    <div class="hiw-grid">
      <div class="hiw-steps reveal">
        <div class="hiw-step">
          <div class="hiw-step-number">1</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">State your intent</div>
            <div class="hiw-step-desc">Tell us what you need — emergency, labor, X-ray, pharmacy, or more. Not keywords. Real situations.</div>
          </div>
        </div>
        <div class="hiw-step">
          <div class="hiw-step-number">2</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">We filter by capability</div>
            <div class="hiw-step-desc">Our database tracks what facilities can actually do — not what they claim. We only show you what matches.</div>
          </div>
        </div>
        <div class="hiw-step">
          <div class="hiw-step-number">3</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">Get ranked results</div>
            <div class="hiw-step-desc">Results ranked by distance, rating, cost, and availability. Every facility is manually verified.</div>
          </div>
        </div>
        <div class="hiw-step">
          <div class="hiw-step-number">4</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">Call or get directions</div>
            <div class="hiw-step-desc">One tap to call, one tap for directions. No friction when seconds matter.</div>
          </div>
        </div>
      </div>

      <div class="compare-panel reveal">
        <div class="compare-title">EmiNav vs. Traditional Search</div>
        <div class="compare-row">
          <div class="compare-card bad">
            <div class="compare-card-label">❌ Google Search</div>
            <div class="compare-item"><span class="compare-icon">✗</span> 50+ unfiltered results</div>
            <div class="compare-item"><span class="compare-icon">✗</span> No capability data</div>
            <div class="compare-item"><span class="compare-icon">✗</span> No cost estimates</div>
            <div class="compare-item"><span class="compare-icon">✗</span> Guesswork & phone calls</div>
            <div class="compare-item"><span class="compare-icon">✗</span> Time wasted in emergencies</div>
          </div>
          <div class="compare-card good">
            <div class="compare-card-label">✓ EmiNav</div>
            <div class="compare-item"><span class="compare-icon">✓</span> Intent-filtered results</div>
            <div class="compare-item"><span class="compare-icon">✓</span> Verified capabilities</div>
            <div class="compare-item"><span class="compare-icon">✓</span> Cost estimates shown</div>
            <div class="compare-item"><span class="compare-icon">✓</span> One-tap call & directions</div>
            <div class="compare-item"><span class="compare-icon">✓</span> Right care, right now</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <div class="about-bg"></div>
    <div class="about-grid">
      <div class="about-left reveal">
        <div class="section-label">About EmiNav</div>
        <h2 class="section-title">Built for the African healthcare reality.</h2>
        <p class="about-body">
          "Emi" means "my life" in Yoruba. That's exactly what this is about — your life, your health, your navigation. EmiNav was built because finding the right healthcare in Africa shouldn't require luck, insider knowledge, or wasted hours.
        </p>
        <p class="about-body" style="margin-top:16px;">
          We map healthcare facilities not just by location, but by verified capability — so that when you search for emergency care, you find a facility that actually has a working emergency room.
        </p>

        <div class="cities-coverage">
          <div class="city-badge">
            <span class="city-badge-flag">🇰🇪</span>
            Nairobi, Kenya
          </div>
          <div class="city-badge">
            <span class="city-badge-flag">🇳🇬</span>
            Lagos, Nigeria
          </div>
        </div>
      </div>

      <div class="about-right reveal">
        <div class="about-right-card">
          <div class="about-vision-label">Our Mission</div>
          <div class="about-vision-text">
            To make healthcare navigation in Africa as simple as <em>stating what you need</em> — and getting exactly the right help.
          </div>

          <div class="about-divider"></div>

          <div class="about-founders">
            <div class="founder-avatar">E</div>
            <div>
              <div class="founder-info-name">EmiNav Team</div>
              <div class="founder-info-role">Building Africa's health layer</div>
            </div>
          </div>
        </div>

        <div class="about-pillars">
          <div class="about-pillar">
            <div class="about-pillar-icon">✓</div>
            <div>
              <div class="about-pillar-title">Verified, Not Just Listed</div>
              <div class="about-pillar-desc">Every facility is manually verified. We confirm capabilities before they appear on EmiNav.</div>
            </div>
          </div>
          <div class="about-pillar">
            <div class="about-pillar-icon">🌍</div>
            <div>
              <div class="about-pillar-title">Built for Africa</div>
              <div class="about-pillar-desc">Designed for the realities of African healthcare — from cost transparency to local language support.</div>
            </div>
          </div>
          <div class="about-pillar">
            <div class="about-pillar-icon">⚡</div>
            <div>
              <div class="about-pillar-title">Speed When It Matters</div>
              <div class="about-pillar-desc">In emergencies, seconds count. EmiNav is optimized for fast, clear decisions.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="reveal">
      <div class="section-label">Get in Touch</div>
      <h2 class="section-title">We'd love to hear from you.</h2>
      <p class="section-sub">Whether you're a healthcare facility, potential partner, or just have questions — reach out.</p>
    </div>

    <div class="contact-grid">
      <div class="contact-info-block reveal">
        <div class="contact-info-item">
          <div class="contact-icon">✉️</div>
          <div>
            <div class="contact-info-label">Email</div>
            <div class="contact-info-value">hello@eminav.com</div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-icon">📍</div>
          <div>
            <div class="contact-info-label">Operating In</div>
            <div class="contact-info-value">Nairobi, Kenya & Lagos, Nigeria</div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-icon">🏥</div>
          <div>
            <div class="contact-info-label">For Healthcare Facilities</div>
            <div class="contact-info-value">Get listed on EmiNav — contact us to start the verification process.</div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-icon">🤝</div>
          <div>
            <div class="contact-info-label">Partnerships</div>
            <div class="contact-info-value">Open to partnerships with health networks, insurers, and NGOs.</div>
          </div>
        </div>
      </div>

      <div class="contact-form reveal">
        <div class="form-title">Send us a message</div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">First Name</label>
            <input type="text" class="form-input" placeholder="Ada" />
          </div>
          <div class="form-group">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-input" placeholder="Okafor" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="ada@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">I am a...</label>
          <select class="form-select">
            <option>Individual user</option>
            <option>Healthcare facility</option>
            <option>Potential partner / investor</option>
            <option>Journalist / researcher</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea class="form-textarea" placeholder="Tell us how we can help..."></textarea>
        </div>
        <button class="form-submit">Send Message →</button>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RE0rU2VyaWYrRGlzcGxheTppdGFsQDA7MSZhbXA7ZGlzcGxheT1zd2FwJyk7CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwaW5HcmFkIiB4MT0iMC4zIiB5MT0iMCIgeDI9IjAuNyIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiAgc3RvcC1jb2xvcj0iIzJFQ0ZDNSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzFCQThDMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxQTVBOUUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgoKICA8IS0tIEJhY2tncm91bmQgdHJhbnNwYXJlbnQgLS0+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiLz4KCiAgPCEtLSBMb2NhdGlvbiBQaW4gLS0+CiAgPHBhdGggZD0iTTQwMCAxMjAKICAgICAgICAgICBDNTYwIDEyMCA2ODAgMjQwIDY4MCA0MDAKICAgICAgICAgICBDNjgwIDU2MCA0MDAgODgwIDQwMCA4ODAKICAgICAgICAgICBDNDAwIDg4MCAxMjAgNTYwIDEyMCA0MDAKICAgICAgICAgICBDMTIwIDI0MCAyNDAgMTIwIDQwMCAxMjAgWiIKICAgICAgICBmaWxsPSJ1cmwoI3BpbkdyYWQpIi8+CgogIDwhLS0gR2xvc3MgaGlnaGxpZ2h0IC0tPgogIDxlbGxpcHNlIGN4PSIzMTAiIGN5PSIyNjAiIHJ4PSIxMDAiIHJ5PSI3NSIKICAgIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMTIiIHRyYW5zZm9ybT0icm90YXRlKC0yMCAzMTAgMjYwKSIvPgoKICA8IS0tIFN0eWxpemVkIEUgLS0+CiAgPHBhdGggZD0iTTMwMCAzMDAKICAgICAgICAgICBINTIwCiAgICAgICAgICAgQzU2MCAzMDAgNTYwIDM2MCA1MjAgMzYwCiAgICAgICAgICAgSDM2MAogICAgICAgICAgIFY0NDAKICAgICAgICAgICBINTIwCiAgICAgICAgICAgQzU2MCA0NDAgNTYwIDUwMCA1MjAgNTAwCiAgICAgICAgICAgSDM2MAogICAgICAgICAgIFY1ODAKICAgICAgICAgICBINTIwCiAgICAgICAgICAgQzU2MCA1ODAgNTYwIDY0MCA1MjAgNjQwCiAgICAgICAgICAgSDMwMAogICAgICAgICAgIFoiCiAgICAgICAgZmlsbD0id2hpdGUiLz4KCiAgPCEtLSBIZWFydGJlYXQgTGluZSBpbnRlZ3JhdGVkIGluIEUgLS0+CiAgPHBvbHlsaW5lIHBvaW50cz0iMzUwLDQ3MCAzOTAsNDcwIDQyMCw0MzAgNDUwLDUyMCA0ODAsNDcwIDUyMCw0NzAiCiAgICAgICAgICAgIGZpbGw9Im5vbmUiCiAgICAgICAgICAgIHN0cm9rZT0iIzFCQThDMCIKICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPSIyMCIKICAgICAgICAgICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgICAgICAgICBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CgogIDwhLS0gQnJhbmQgTmFtZSDigJQgRE0gU2VyaWYgRGlzcGxheSB0byBtYXRjaCBwYWdlIC0tPgogIDx0ZXh0IHg9IjQwMCIgeT0iOTYwIgogICAgICAgIGZvbnQtZmFtaWx5PSInRE0gU2VyaWYgRGlzcGxheScsIEdlb3JnaWEsIHNlcmlmIgogICAgICAgIGZvbnQtc2l6ZT0iMTA4IgogICAgICAgIGZvbnQtd2VpZ2h0PSI0MDAiCiAgICAgICAgZmlsbD0iIzBGNzY2RSIKICAgICAgICB0ZXh0LWFuY2hvcj0ibWlkZGxlIgogICAgICAgIGxldHRlci1zcGFjaW5nPSItMiI+RW1pTmF2PC90ZXh0Pgo8L3N2Zz4=" alt="EmiNav" style="height:72px;width:auto;filter:brightness(0) invert(1);" /></div>
        <div class="footer-brand-desc">Navigate your life. Master your health. Africa's intent-based healthcare navigation platform.</div>
      </div>
      <div>
        <div class="footer-col-title">Navigation</div>
        <ul class="footer-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Cities</div>
        <ul class="footer-links">
          <li><a href="#">Nairobi, Kenya</a></li>
          <li><a href="#">Lagos, Nigeria</a></li>
          <li><a href="#" style="opacity:0.4;cursor:default">Accra (soon)</a></li>
          <li><a href="#" style="opacity:0.4;cursor:default">Kampala (soon)</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-text">© 2026 EmiNav. All rights reserved.</div>
      <div class="footer-cities">
        <div class="footer-city"><span class="footer-city-dot"></span>Nairobi</div>
        <div class="footer-city"><span class="footer-city-dot"></span>Lagos</div>
      </div>
    </div>
  </footer>

  <script>
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Smooth active nav
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            link.style.color = '#5CC8C8';
          } else {
            link.style.color = '';
          }
        }
      });
    });
  </script>
      `
      
      // Run the scripts
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 100);
          }
        });
      }, { threshold: 0.1 });

      reveals.forEach(el => observer.observe(el));

      const navLinks = document.querySelectorAll('.nav-links a');
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navLinks.forEach(link => {
          const section = document.querySelector(link.getAttribute('href'));
          if (section) {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
              link.style.color = '#5CC8C8';
            } else {
              link.style.color = '';
            }
          }
        });
      });
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
    :root {
      --navy: #0A1628;
      --teal: #0D6E6E;
      --teal-light: #12919180;
      --teal-pale: #E6F4F4;
      --gold: #C9A84C;
      --white: #FFFFFF;
      --off-white: #F7F9F9;
      --gray: #6B7280;
      --gray-light: #E5E7EB;
      --text: #1A2332;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--white);
      color: var(--text);
      overflow-x: hidden;
    }

    /* ── NAV ── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 0 5%;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(10, 22, 40, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0;
      text-decoration: none;
    }

    .nav-logo-mark {
      width: 36px;
      height: 36px;
      background: var(--teal);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-logo-mark svg { width: 20px; height: 20px; }

    .nav-logo-name {
      font-family: 'DM Serif Display', serif;
      font-size: 1.4rem;
      color: var(--white);
      letter-spacing: -0.02em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;
      list-style: none;
    }

    .nav-links a {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      transition: color 0.2s;
    }

    .nav-links a:hover { color: var(--white); }

    .nav-cta {
      background: var(--teal) !important;
      color: var(--white) !important;
      padding: 10px 22px;
      border-radius: 6px;
      font-weight: 600 !important;
      transition: background 0.2s !important;
    }

    .nav-cta:hover { background: #0A5C5C !important; }

    /* ── HERO ── */
    #hero {
      min-height: 100vh;
      background: var(--navy);
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 120px 5% 80px;
      position: relative;
      overflow: hidden;
    }

    .hero-bg-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(13,110,110,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(13,110,110,0.06) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .hero-bg-glow {
      position: absolute;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(13,110,110,0.15) 0%, transparent 70%);
      top: -100px;
      right: -100px;
      pointer-events: none;
    }

    .hero-left {
      position: relative;
      z-index: 2;
      max-width: 560px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(13,110,110,0.15);
      border: 1px solid rgba(13,110,110,0.4);
      color: #5CC8C8;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 28px;
      animation: fadeUp 0.6s ease forwards;
    }

    .hero-badge-dot {
      width: 6px;
      height: 6px;
      background: #5CC8C8;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .hero-headline {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.8rem, 5vw, 4rem);
      line-height: 1.1;
      color: var(--white);
      letter-spacing: -0.03em;
      margin-bottom: 24px;
      animation: fadeUp 0.6s ease 0.1s forwards;
      opacity: 0;
    }

    .hero-headline em {
      font-style: italic;
      color: #5CC8C8;
    }

    .hero-sub {
      font-size: 1.1rem;
      line-height: 1.7;
      color: rgba(255,255,255,0.6);
      margin-bottom: 44px;
      max-width: 440px;
      animation: fadeUp 0.6s ease 0.2s forwards;
      opacity: 0;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      animation: fadeUp 0.6s ease 0.3s forwards;
      opacity: 0;
    }

    .btn-primary {
      background: var(--teal);
      color: var(--white);
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
    }

    .btn-primary:hover {
      background: #0A5C5C;
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(13,110,110,0.35);
    }

    .btn-secondary {
      background: transparent;
      color: rgba(255,255,255,0.8);
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      border-color: rgba(255,255,255,0.5);
      color: var(--white);
    }

    .hero-stats {
      display: flex;
      gap: 40px;
      margin-top: 56px;
      padding-top: 40px;
      border-top: 1px solid rgba(255,255,255,0.08);
      animation: fadeUp 0.6s ease 0.4s forwards;
      opacity: 0;
    }

    .hero-stat-value {
      font-family: 'DM Serif Display', serif;
      font-size: 2rem;
      color: var(--white);
      line-height: 1;
    }

    .hero-stat-label {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.45);
      margin-top: 4px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* Hero right: App Mockup */
    .hero-right {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      animation: fadeUp 0.8s ease 0.3s forwards;
      opacity: 0;
    }

    .app-mockup {
      width: 320px;
      background: #111E32;
      border-radius: 24px;
      padding: 28px;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
    }

    .mockup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .mockup-logo {
      font-family: 'DM Serif Display', serif;
      color: var(--white);
      font-size: 1.1rem;
    }

    .mockup-location {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(13,110,110,0.2);
      color: #5CC8C8;
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 100px;
      font-weight: 600;
    }

    .mockup-question {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.4);
      margin-bottom: 14px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;
    }

    .mockup-intents {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mockup-intent {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .mockup-intent:first-child {
      background: rgba(13,110,110,0.2);
      border-color: rgba(13,110,110,0.4);
    }

    .mockup-intent-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .mockup-intent-text {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.85);
      font-weight: 500;
    }

    .mockup-intent-urgent {
      font-size: 0.6rem;
      color: #FF6B6B;
      background: rgba(255,107,107,0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
      margin-left: auto;
      letter-spacing: 0.04em;
    }

    /* ── TRUSTED BY ── */
    .trusted-bar {
      background: var(--off-white);
      padding: 28px 5%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 60px;
      border-bottom: 1px solid var(--gray-light);
      flex-wrap: wrap;
    }

    .trusted-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--gray);
      font-weight: 600;
    }

    .trusted-cities {
      display: flex;
      gap: 40px;
      align-items: center;
    }

    .trusted-city {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      color: var(--text);
      font-weight: 500;
    }

    .city-dot {
      width: 8px;
      height: 8px;
      background: var(--teal);
      border-radius: 50%;
    }

    /* ── HOW IT WORKS ── */
    #how-it-works {
      padding: 120px 5%;
      background: var(--white);
    }

    .section-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--teal);
      font-weight: 700;
      margin-bottom: 14px;
    }

    .section-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2rem, 4vw, 3rem);
      color: var(--navy);
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 16px;
    }

    .section-sub {
      font-size: 1.05rem;
      color: var(--gray);
      line-height: 1.7;
      max-width: 520px;
    }

    .hiw-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
      margin-top: 72px;
    }

    .hiw-steps {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .hiw-step {
      display: flex;
      gap: 24px;
      padding: 32px 0;
      border-bottom: 1px solid var(--gray-light);
      position: relative;
      cursor: pointer;
      transition: all 0.2s;
    }

    .hiw-step:last-child { border-bottom: none; }

    .hiw-step:hover .hiw-step-number {
      background: var(--teal);
      color: var(--white);
    }

    .hiw-step-number {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: var(--teal-pale);
      color: var(--teal);
      font-family: 'DM Serif Display', serif;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
      font-weight: 600;
    }

    .hiw-step-content {}

    .hiw-step-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 6px;
    }

    .hiw-step-desc {
      font-size: 0.9rem;
      color: var(--gray);
      line-height: 1.6;
    }

    /* Compare Panel */
    .compare-panel {
      background: var(--navy);
      border-radius: 20px;
      padding: 36px;
      position: relative;
      overflow: hidden;
    }

    .compare-panel::before {
      content: '';
      position: absolute;
      top: -80px; right: -80px;
      width: 240px; height: 240px;
      background: radial-gradient(circle, rgba(13,110,110,0.25), transparent 70%);
    }

    .compare-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.4);
      margin-bottom: 20px;
      font-weight: 600;
    }

    .compare-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 12px;
    }

    .compare-card {
      border-radius: 12px;
      padding: 18px;
    }

    .compare-card.bad {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.2);
    }

    .compare-card.good {
      background: rgba(13,110,110,0.12);
      border: 1px solid rgba(13,110,110,0.3);
    }

    .compare-card-label {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .compare-card.bad .compare-card-label { color: #FF6B6B; }
    .compare-card.good .compare-card-label { color: #5CC8C8; }

    .compare-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.65);
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .compare-icon { flex-shrink: 0; margin-top: 1px; font-size: 0.75rem; }

    /* ── ABOUT ── */
    #about {
      padding: 120px 5%;
      background: var(--navy);
      position: relative;
      overflow: hidden;
    }

    .about-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(13,110,110,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(13,110,110,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 100px;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .about-left .section-title { color: var(--white); }
    .about-left .section-sub { color: rgba(255,255,255,0.55); }

    .about-body {
      font-size: 1rem;
      color: rgba(255,255,255,0.55);
      line-height: 1.8;
      margin-top: 24px;
    }

    .about-pillars {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 40px;
    }

    .about-pillar {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      transition: border-color 0.2s;
    }

    .about-pillar:hover { border-color: rgba(13,110,110,0.4); }

    .about-pillar-icon {
      width: 40px;
      height: 40px;
      background: rgba(13,110,110,0.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .about-pillar-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--white);
      margin-bottom: 4px;
    }

    .about-pillar-desc {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.45);
      line-height: 1.6;
    }

    .about-right-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 40px;
    }

    .about-vision-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #5CC8C8;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .about-vision-text {
      font-family: 'DM Serif Display', serif;
      font-size: 1.5rem;
      color: var(--white);
      line-height: 1.45;
      letter-spacing: -0.02em;
    }

    .about-vision-text em {
      font-style: italic;
      color: #5CC8C8;
    }

    .about-divider {
      height: 1px;
      background: rgba(255,255,255,0.07);
      margin: 32px 0;
    }

    .about-founders {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .founder-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--teal), #0A5C5C);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Serif Display', serif;
      font-size: 1.2rem;
      color: var(--white);
      border: 2px solid rgba(255,255,255,0.1);
    }

    .founder-info-name {
      font-size: 0.9rem;
      color: var(--white);
      font-weight: 600;
    }

    .founder-info-role {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.4);
    }

    .cities-coverage {
      display: flex;
      gap: 12px;
      margin-top: 32px;
      flex-wrap: wrap;
    }

    .city-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(13,110,110,0.15);
      border: 1px solid rgba(13,110,110,0.3);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.82rem;
      color: rgba(255,255,255,0.8);
      font-weight: 500;
    }

    .city-badge-flag { font-size: 1rem; }

    /* ── CONTACT ── */
    #contact {
      padding: 120px 5%;
      background: var(--off-white);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
      margin-top: 60px;
    }

    .contact-info-block {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .contact-icon {
      width: 44px;
      height: 44px;
      background: var(--teal-pale);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .contact-info-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--gray);
      font-weight: 600;
      margin-bottom: 4px;
    }

    .contact-info-value {
      font-size: 0.95rem;
      color: var(--navy);
      font-weight: 500;
    }

    .contact-form {
      background: var(--white);
      border-radius: 16px;
      padding: 40px;
      border: 1px solid var(--gray-light);
      box-shadow: 0 4px 24px rgba(0,0,0,0.04);
    }

    .form-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.4rem;
      color: var(--navy);
      margin-bottom: 28px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 8px;
      letter-spacing: 0.02em;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid var(--gray-light);
      border-radius: 8px;
      font-size: 0.9rem;
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
      background: var(--white);
      outline: none;
      transition: border-color 0.2s;
      -webkit-appearance: none;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      border-color: var(--teal);
      box-shadow: 0 0 0 3px rgba(13,110,110,0.08);
    }

    .form-textarea { resize: vertical; min-height: 120px; }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-submit {
      width: 100%;
      background: var(--teal);
      color: var(--white);
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 8px;
    }

    .form-submit:hover {
      background: #0A5C5C;
      transform: translateY(-1px);
    }

    /* ── FOOTER ── */
    footer {
      background: var(--navy);
      padding: 60px 5% 40px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 60px;
      margin-bottom: 48px;
    }

    .footer-brand-name {
      font-family: 'DM Serif Display', serif;
      font-size: 1.4rem;
      color: var(--white);
      margin-bottom: 12px;
    }

    .footer-brand-desc {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.4);
      line-height: 1.6;
      max-width: 280px;
    }

    .footer-col-title {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.3);
      font-weight: 700;
      margin-bottom: 16px;
    }

    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-links a {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-links a:hover { color: var(--white); }

    .footer-bottom {
      padding-top: 28px;
      border-top: 1px solid rgba(255,255,255,0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-bottom-text {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.3);
    }

    .footer-cities {
      display: flex;
      gap: 20px;
    }

    .footer-city {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.3);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .footer-city-dot {
      width: 5px;
      height: 5px;
      background: var(--teal);
      border-radius: 50%;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      #hero {
        grid-template-columns: 1fr;
        padding-top: 100px;
      }
      .hero-right { display: none; }
      .hiw-grid { grid-template-columns: 1fr; }
      .about-grid { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .nav-links { display: none; }
      .compare-panel { display: none; }
    }
      `}} />
      
      <div id="html-container"></div>
    </>
  )
}
