'use client'

import { useEffect } from 'react'

export default function Home() {
  
  // ============================================================================
  // SECURITY LAYER 1: RATE LIMITING
  // ============================================================================
  
  const SECURITY_LIMITS = {
    searchesPerMinute: 10,
    searchesPerHour: 100,
    globalSearchesPerHour: 5000,
    cooldownSeconds: 3
  }
  
  const searchHistory = new Map()
  let globalSearchCount = 0
  let globalSearchResetTime = Date.now() + 3600000
  let circuitBreakerTripped = false
  
  function getUserId() {
    if (typeof localStorage === 'undefined') return 'server'
    let userId = localStorage.getItem('eminav_user_id')
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
      localStorage.setItem('eminav_user_id', userId)
    }
    return userId
  }
  
  function canUserSearch() {
    const userId = getUserId()
    const now = Date.now()
    
    if (now > globalSearchResetTime) {
      globalSearchCount = 0
      globalSearchResetTime = now + 3600000
      circuitBreakerTripped = false
    }
    
    if (globalSearchCount >= SECURITY_LIMITS.globalSearchesPerHour) {
      if (!circuitBreakerTripped) {
        circuitBreakerTripped = true
        console.warn('🔴 CIRCUIT BREAKER TRIPPED')
        alert('⚠️ High traffic detected. Service temporarily limited. Please try again in 1 hour.')
      }
      return false
    }
    
    const userSearches = searchHistory.get(userId) || []
    const oneMinuteAgo = now - 60000
    const recentSearches = userSearches.filter(time => time > oneMinuteAgo)
    const oneHourAgo = now - 3600000
    const hourlySearches = userSearches.filter(time => time > oneHourAgo)
    
    if (recentSearches.length >= SECURITY_LIMITS.searchesPerMinute) {
      const oldestSearch = Math.min(...recentSearches)
      const waitTime = Math.ceil((60000 - (now - oldestSearch)) / 1000)
      alert(`⏱️ Please wait ${waitTime} seconds before searching again.`)
      return false
    }
    
    if (hourlySearches.length >= SECURITY_LIMITS.searchesPerHour) {
      alert('⏱️ You\'ve reached the hourly search limit. Please try again in 1 hour.')
      return false
    }
    
    if (recentSearches.length > 0) {
      const lastSearch = Math.max(...recentSearches)
      const timeSinceLastSearch = (now - lastSearch) / 1000
      if (timeSinceLastSearch < SECURITY_LIMITS.cooldownSeconds) {
        const waitTime = Math.ceil(SECURITY_LIMITS.cooldownSeconds - timeSinceLastSearch)
        alert(`⏱️ Please wait ${waitTime} seconds between searches.`)
        return false
      }
    }
    
    recentSearches.push(now)
    searchHistory.set(userId, recentSearches)
    globalSearchCount++
    
    if (globalSearchCount % 100 === 0) {
      console.log(`📊 Global searches: ${globalSearchCount}/${SECURITY_LIMITS.globalSearchesPerHour}`)
    }
    
    return true
  }
  
  // ============================================================================
  // SECURITY LAYER 2: INPUT VALIDATION
  // ============================================================================
  
  function validateSearchInput(city, intent) {
    const validCities = ['Lagos', 'Nairobi']
    const validIntents = ['emergency', 'pregnancy', 'child_emergency', 'stroke', 
                          'ambulance', 'pharmacy', 'diagnostic', 'dental', 
                          'vaccination', 'consultation', 'mental_health', 'all']
    
    if (!city || typeof city !== 'string' || !validCities.includes(city)) {
      console.warn('🔴 Invalid city:', city)
      return false
    }
    
    if (!intent || typeof intent !== 'string' || !validIntents.includes(intent)) {
      console.warn('🔴 Invalid intent:', intent)
      return false
    }
    
    const suspiciousPatterns = [/<script>/i, /javascript:/i, /on\w+=/i, 
                                /SELECT.*FROM/i, /DROP.*TABLE/i]
    const testString = city + intent
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(testString)) {
        console.error('🔴 SECURITY ALERT: Suspicious pattern')
        return false
      }
    }
    
    return true
  }
  
  // ============================================================================
  // SECURITY LAYER 3: SEARCH FUNCTION
  // ============================================================================
  
  // Safe wrapper for browser-only execution
  if (typeof window !== 'undefined') {
    window.performSecureSearch = function(city, intent) {
    try {
      if (!canUserSearch()) return
      if (!validateSearchInput(city, intent)) {
        alert('⚠️ Invalid search parameters.')
        return
      }
      
      console.log(`✅ Search allowed: ${city} - ${intent}`)
      alert(`Searching for ${intent} facilities in ${city}...\n\nThis is a demo. Database connection coming next!\n\nYour search was validated and rate-limited successfully. ✅`)
      
    } catch (error) {
      console.error('Search error:', error)
      alert('⚠️ Something went wrong. Please try again.')
    }
  }
  }  // End of window check
  
  // Emergency controls - wrapped to prevent server-side errors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.emergencyKillSwitch = function() {
        circuitBreakerTripped = true
        globalSearchCount = SECURITY_LIMITS.globalSearchesPerHour + 1
        alert('🔴 EMERGENCY: All searches disabled')
        console.error('🔴 KILL SWITCH ACTIVATED')
      }
      
      window.resetKillSwitch = function() {
        circuitBreakerTripped = false
        globalSearchCount = 0
        searchHistory.clear()
        alert('✅ Search functionality re-enabled')
      }
      
      window.getSecurityStats = function() {
        return {
          globalSearches: globalSearchCount,
          limit: SECURITY_LIMITS.globalSearchesPerHour,
          circuitBreakerActive: circuitBreakerTripped,
          uniqueUsers: searchHistory.size,
          resetTime: new Date(globalSearchResetTime).toLocaleString()
        }
      }
    }
  }, [])

  useEffect(() => {
    const container = document.getElementById('html-container')
    if (container) {
      container.innerHTML = `
  <nav>
    <a href="#hero" class="nav-logo">
      <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9Ijg4MCIgdmlld0JveD0iMCAwIDgwMCA4ODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im5nIiB4MT0iMC4zIiB5MT0iMCIgeDI9IjAuNyIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiAgc3RvcC1jb2xvcj0iIzJFQ0ZDNSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzFCQThDMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxQTVBOUUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik00MDAgMTIwIEM1NjAgMTIwIDY4MCAyNDAgNjgwIDQwMCBDNjgwIDU2MCA0MDAgODgwIDQwMCA4ODAgQzQwMCA4ODAgMTIwIDU2MCAxMjAgNDAwIEMxMjAgMjQwIDI0MCAxMjAgNDAwIDEyMCBaIiBmaWxsPSJ1cmwoI25nKSIvPgogIDxlbGxpcHNlIGN4PSIzMTAiIGN5PSIyNjAiIHJ4PSIxMDAiIHJ5PSI3NSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTIwIDMxMCAyNjApIi8+CiAgPHBhdGggZD0iTTMwMCAzMDAgSDUyMCBDNTYwIDMwMCA1NjAgMzYwIDUyMCAzNjAgSDM2MCBWNDQwIEg1MjAgQzU2MCA0NDAgNTYwIDUwMCA1MjAgNTAwIEgzNjAgVjU4MCBINTIwIEM1NjAgNTgwIDU2MCA2NDAgNTIwIDY0MCBIMzAwIFoiIGZpbGw9IndoaXRlIi8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMzUwLDQ3MCAzOTAsNDcwIDQyMCw0MzAgNDUwLDUyMCA0ODAsNDcwIDUyMCw0NzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFCQThDMCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==" alt="EmiNav" style="height:46px;width:auto;" />
      <span style="font-family:'DM Serif Display',serif;font-size:1.4rem;color:white;letter-spacing:-0.02em;margin-left:10px;">EmiNav</span>
    </a>
    <ul class="nav-links">
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
          <li><a href="#" onclick="event.preventDefault();document.getElementById('privacy-policy').style.display='block';document.getElementById('legal-backdrop').style.display='block';document.getElementById('privacy-policy').scrollIntoView()">Privacy</a></li>
          <li><a href="#" onclick="event.preventDefault();document.getElementById('terms-of-service').style.display='block';document.getElementById('legal-backdrop').style.display='block';document.getElementById('terms-of-service').scrollIntoView()">Terms</a></li>
      <li><a href="#hero" class="nav-cta">Find Care →</a></li>
    </ul>
  </nav>

  
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
        EmiNav is the first intent-based health navigation platform built for African cities. 
Search health facilities by service, capability, and location — so you can make informed decisions with confidence.
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
          <div class="hero-stat-value">Structured & Reviewed</div>
          <div class="hero-stat-label">Facility Data</div>
        </div>
      </div>
    </div>

    <div class="hero-right">
      <div class="app-mockup">
        <div class="mockup-header">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9Ijg4MCIgdmlld0JveD0iMCAwIDgwMCA4ODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im5nIiB4MT0iMC4zIiB5MT0iMCIgeDI9IjAuNyIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiAgc3RvcC1jb2xvcj0iIzJFQ0ZDNSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzFCQThDMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxQTVBOUUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik00MDAgMTIwIEM1NjAgMTIwIDY4MCAyNDAgNjgwIDQwMCBDNjgwIDU2MCA0MDAgODgwIDQwMCA4ODAgQzQwMCA4ODAgMTIwIDU2MCAxMjAgNDAwIEMxMjAgMjQwIDI0MCAxMjAgNDAwIDEyMCBaIiBmaWxsPSJ1cmwoI25nKSIvPgogIDxlbGxpcHNlIGN4PSIzMTAiIGN5PSIyNjAiIHJ4PSIxMDAiIHJ5PSI3NSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTIwIDMxMCAyNjApIi8+CiAgPHBhdGggZD0iTTMwMCAzMDAgSDUyMCBDNTYwIDMwMCA1NjAgMzYwIDUyMCAzNjAgSDM2MCBWNDQwIEg1MjAgQzU2MCA0NDAgNTYwIDUwMCA1MjAgNTAwIEgzNjAgVjU4MCBINTIwIEM1NjAgNTgwIDU2MCA2NDAgNTIwIDY0MCBIMzAwIFoiIGZpbGw9IndoaXRlIi8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMzUwLDQ3MCAzOTAsNDcwIDQyMCw0MzAgNDUwLDUyMCA0ODAsNDcwIDUyMCw0NzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFCQThDMCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==" alt="EmiNav" style="height:36px;width:auto;" />
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

  
  
    <!-- FIND CARE SECTION -->
  <section id="find-care" style="min-height:100vh;background:#F7F9F9;padding:100px 5% 120px;display:none">
    <div style="max-width:1200px;margin:0 auto">
      
      <div id="city-display" style="text-align:center;margin-bottom:50px">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(13,110,110,0.1);border:1px solid rgba(13,110,110,0.3);padding:12px 28px;border-radius:100px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6E6E" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span id="selected-city" style="font-weight:600;color:#0D6E6E;font-size:1.1rem"></span>
        </div>
      </div>

      <div style="text-align:center;margin-bottom:50px">
        <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.12em;color:#0D6E6E;font-weight:700;margin-bottom:14px">What's Happening?</div>
        <h2 style="font-family:'DM Serif Display',serif;font-size:clamp(2rem,4vw,2.5rem);color:#0A1628;margin-bottom:16px">Select Your Situation</h2>
        <p style="font-size:1.05rem;color:#6B7280;max-width:600px;margin:0 auto">We'll show you facilities that can actually help with your specific need.</p>
      </div>

      <!-- DISCLAIMER -->
      <div style="background:#FEF3C7;border:2px solid#F59E0B;border-radius:12px;padding:20px;margin-bottom:30px;text-align:center">
        <div style="font-weight:600;color:#92400E;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          Important Disclaimer
        </div>
        <div style="font-size:0.9rem;color:#78350F;line-height:1.6">
          EmiNav provides facility information only. <strong>Always verify details and availability before visiting.</strong> In medical emergencies, call local emergency services immediately (Lagos: 767/112, Nairobi: 999). We do not provide medical advice.
        </div>
      </div>

      <div id="intent-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-bottom:60px">
        
        <!-- CRITICAL EMERGENCIES (RED) -->
        <div class="intent-card" onclick="alert('Medical Emergency in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FEE2E2 0%,#FECACA 100%);border:2px solid #FCA5A5;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#DC2626;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">CRITICAL</div>
          <div style="font-size:2.5rem;margin-bottom:12px">🚑</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Medical Emergency</div>
          <div style="font-size:0.85rem;color:#6B7280">Severe pain, cardiac, breathing issues</div>
        </div>

        <div class="intent-card" onclick="alert('Child Emergency in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FEE2E2 0%,#FECACA 100%);border:2px solid #FCA5A5;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#DC2626;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">CRITICAL</div>
          <div style="font-size:2.5rem;margin-bottom:12px">👶</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Child Emergency</div>
          <div style="font-size:0.85rem;color:#6B7280">Sick or injured child</div>
        </div>

        <div class="intent-card" onclick="alert('Stroke in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FEE2E2 0%,#FECACA 100%);border:2px solid #FCA5A5;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#DC2626;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">CRITICAL</div>
          <div style="font-size:2.5rem;margin-bottom:12px">🧠</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Stroke Symptoms</div>
          <div style="font-size:0.85rem;color:#6B7280">Facial drooping, numbness, speech</div>
        </div>

        <!-- URGENT (YELLOW) - UPDATED: Pregnancy moved here -->
        <div class="intent-card" onclick="alert('Pregnancy in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FCE7F3 0%,#FBCFE8 100%);border:2px solid #F9A8D4;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#DB2777;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">URGENT</div>
          <div style="font-size:2.5rem;margin-bottom:12px">🤰</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Pregnancy / Maternity</div>
          <div style="font-size:0.85rem;color:#6B7280">Labor, delivery, pregnancy care</div>
        </div>

        <div class="intent-card" onclick="alert('Ambulance in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%);border:2px solid #FCD34D;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#F59E0B;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">URGENT</div>
          <div style="font-size:2.5rem;margin-bottom:12px">🚨</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Ambulance Service</div>
          <div style="font-size:0.85rem;color:#6B7280">Need emergency transport now</div>
        </div>

        <div class="intent-card" onclick="alert('Pharmacy in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%);border:2px solid #FCD34D;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#F59E0B;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">URGENT</div>
          <div style="font-size:2.5rem;margin-bottom:12px">💊</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Pharmacy</div>
          <div style="font-size:0.85rem;color:#6B7280">Medication needed today</div>
        </div>

        <div class="intent-card" onclick="alert('Diagnostic in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%);border:2px solid #FCD34D;border-radius:16px;padding:24px;cursor:pointer;position:relative">
          <div style="position:absolute;top:10px;right:10px;background:#F59E0B;color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:100px">URGENT</div>
          <div style="font-size:2.5rem;margin-bottom:12px">🔬</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Diagnostic Tests</div>
          <div style="font-size:0.85rem;color:#6B7280">X-ray, ultrasound, lab tests</div>
        </div>

        <!-- ROUTINE (WHITE) -->
        <div class="intent-card" onclick="alert('Dental in ' + document.getElementById('selected-city').textContent)" style="background:white;border:2px solid #E5E7EB;border-radius:16px;padding:24px;cursor:pointer">
          <div style="font-size:2.5rem;margin-bottom:12px">🦷</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Dental Services</div>
          <div style="font-size:0.85rem;color:#6B7280">Emergency or routine dental care</div>
        </div>

        <div class="intent-card" onclick="alert('Vaccination in ' + document.getElementById('selected-city').textContent)" style="background:white;border:2px solid #E5E7EB;border-radius:16px;padding:24px;cursor:pointer">
          <div style="font-size:2.5rem;margin-bottom:12px">💉</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Vaccination</div>
          <div style="font-size:0.85rem;color:#6B7280">Immunizations, vaccines, boosters</div>
        </div>

        <div class="intent-card" onclick="alert('Consultation in ' + document.getElementById('selected-city').textContent)" style="background:white;border:2px solid #E5E7EB;border-radius:16px;padding:24px;cursor:pointer">
          <div style="font-size:2.5rem;margin-bottom:12px">👨‍⚕️</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">General Consultation</div>
          <div style="font-size:0.85rem;color:#6B7280">Doctor checkup, routine visit</div>
        </div>

        <div class="intent-card" onclick="alert('Mental Health in ' + document.getElementById('selected-city').textContent)" style="background:white;border:2px solid #E5E7EB;border-radius:16px;padding:24px;cursor:pointer">
          <div style="font-size:2.5rem;margin-bottom:12px">🧘</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Mental Health Support</div>
          <div style="font-size:0.85rem;color:#6B7280">Therapy, counseling, psychiatry</div>
        </div>

        <!-- NOT SURE (BLUE) -->
        <div class="intent-card" onclick="alert('Show All in ' + document.getElementById('selected-city').textContent)" style="background:linear-gradient(135deg,#E0F2FE 0%,#BAE6FD 100%);border:2px solid #7DD3FC;border-radius:16px;padding:24px;cursor:pointer">
          <div style="font-size:2.5rem;margin-bottom:12px">❓</div>
          <div style="font-weight:600;font-size:1.1rem;color:#0A1628;margin-bottom:6px">Not Sure</div>
          <div style="font-size:0.85rem;color:#6B7280">Show me all nearby facilities</div>
        </div>

      </div>

      <div style="text-align:center">
        <button onclick="document.getElementById('find-care').style.display='none';window.scrollTo({top:0,behavior:'smooth'})" style="background:transparent;border:2px solid #0D6E6E;color:#0D6E6E;padding:12px 32px;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">← Back to Home</button>
      </div>

    </div>
  </section>

  <style>
    .intent-card { transition: all 0.2s; }
    .intent-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
    @media (max-width: 768px) {
      #find-care { padding: 60px 5% 80px !important; }
      #intent-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
    }
  </style>


  <section id="how-it-works">
    <div class="reveal">
      <div class="section-label">The EmiNav Difference</div>
      <h2 class="section-title">Decision-first,<br/>not search-first.</h2>
      <p class="section-sub">Most search engines show you a list of clinics.
EmiNav helps you find facilities equipped for your specific need.</p>
    </div>

    <div class="hiw-grid">
      <div class="hiw-steps reveal">
        <div class="hiw-step">
          <div class="hiw-step-number">1</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">State your intent</div>
            <div class="hiw-step-desc">Tell us what you need — emergency, labor, X-ray, pharmacy, or more. Not just keywords. Real healthcare needs.</div>
          </div>
        </div>
        <div class="hiw-step">
          <div class="hiw-step-number">2</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">We filter by capability</div>
            <div class="hiw-step-desc">Our structured database matches facilities based on available services and reported capabilities — so you only see relevant options.</div>
          </div>
        </div>
        <div class="hiw-step">
          <div class="hiw-step-number">3</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">Get ranked results</div>
            <div class="hiw-step-desc">Results are organized by distance and other key factors to help you compare quickly and confidently.</div>
          </div>
        </div>
        <div class="hiw-step">
          <div class="hiw-step-number">4</div>
          <div class="hiw-step-content">
            <div class="hiw-step-title">Call or get directions</div>
            <div class="hiw-step-desc">Call directly or get directions in one tap — designed for clarity when time matters.</div>
          </div>
        </div>
      </div>

      <div class="compare-panel reveal">
        <div class="compare-title">EmiNav vs. Traditional Search</div>
        <div class="compare-row">
          <div class="compare-card bad">
            <div class="compare-card-label">❌ Traditional Search Engines</div>
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
            <div class="compare-item"><span class="compare-icon">✓</span> Cost estimates shown(where available)</div>
            <div class="compare-item"><span class="compare-icon">✓</span> One-tap call & directions</div>
            <div class="compare-item"><span class="compare-icon">✓</span> Right care, right now</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section id="about">
    <div class="about-bg"></div>
    <div class="about-grid">
      <div class="about-left reveal">
        <div class="section-label">About EmiNav</div>
        <h2 class="section-title">Built for the African healthcare reality.</h2>
        <p class="about-body">
          “Emi” means “life” in Yoruba. That’s exactly what this is about — your life, your health, your navigation.

EmiNav was built because finding the right healthcare in African cities shouldn’t require luck, word-of-mouth, insider knowledge, or wasted minutes spent on endlessly searching.
        </p>
        <p class="about-body" style="margin-top:16px;">
          We map healthcare facilities not just by location, but by structured service and capability data — so you can find care aligned with your need, not just the nearest name on a map.
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
            To make healthcare navigation in Africa as simple as <em>stating what you need</em> — and finding care aligned with it.
          </div>

          <div class="about-divider"></div>

          <div class="about-founders">
            <div class="founder-avatar">E</div>
            <div>
              <div class="founder-info-name">EmiNav Team</div>
              <div class="founder-info-role">A growing team building structured healthcare navigation for African cities.</div>
            </div>
          </div>
        </div>

        <div class="about-pillars">
          <div class="about-pillar">
            <div class="about-pillar-icon">📋</div>
            <div>
              <div class="about-pillar-title">Structured and Reviewed — Not Just Listed</div>
              <div class="about-pillar-desc">We organize facility information by service and capability, drawing from credible sources and continuous data updates.</div>
            </div>
          </div>
          <div class="about-pillar">
            <div class="about-pillar-icon">🌍</div>
            <div>
              <div class="about-pillar-title">Built for Africa</div>
              <div class="about-pillar-desc">Healthcare systems across African cities are complex and fast-moving. EmiNav is designed to bring structure and clarity — from service capability to straightforward navigation.</div>
            </div>
          </div>
          <div class="about-pillar">
            <div class="about-pillar-icon">⚡</div>
            <div>
              <div class="about-pillar-title">Speed When It Matters</div>
              <div class="about-pillar-desc">In urgent situations, clarity is critical. EmiNav is designed to help you find relevant facilities quickly and confidently.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section id="contact">
    <div class="reveal">
      <div class="section-label">Get in Touch</div>
      <h2 class="section-title">We'd love to hear from you.</h2>
      <p class="section-sub">Whether you're a healthcare facility, potential partner, or just have questions about EmiNav — we welcome your inquiry.</p>
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
            <div class="contact-info-value">Healthcare providers can request inclusion or updates. Contact us to initiate the facility review process.</div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-icon">🤝</div>
          <div>
            <div class="contact-info-label">Partnerships</div>
            <div class="contact-info-value">EmiNav partners with healthcare networks, insurers, NGOs, and system stakeholders working to improve access and service visibility across African cities.</div>
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

  
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE3MCIgdmlld0JveD0iMCAwIDE0MCAxNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJmZyIgeDE9IjAuMyIgeTE9IjAiIHgyPSIwLjciIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMkVDRkM1Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMxQkE4QzAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxQTVBOUUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNzAgMTAgQzk4IDEwIDEyMCAzMiAxMjAgNjAgQzEyMCA4OCA3MCAxNDAgNzAgMTQwIEM3MCAxNDAgMjAgODggMjAgNjAgQzIwIDMyIDQyIDEwIDcwIDEwIFoiIGZpbGw9InVybCgjZmcpIi8+PGVsbGlwc2UgY3g9IjU0IiBjeT0iMzgiIHJ4PSIxOCIgcnk9IjEzIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEyIiB0cmFuc2Zvcm09InJvdGF0ZSgtMjAgNTQgMzgpIi8+PHBhdGggZD0iTTUyIDM4IEg5MCBDOTggMzggOTggNTAgOTAgNTAgSDYyIFY2NCBIOTAgQzk4IDY0IDk4IDc2IDkwIDc2IEg2MiBWOTAgSDkwIEM5OCA5MCA5OCAxMDIgOTAgMTAyIEg1MiBaIiBmaWxsPSJ3aGl0ZSIvPjxwb2x5bGluZSBwb2ludHM9IjYwLDcwIDY4LDcwIDc0LDYwIDgwLDgyIDg2LDcwIDkwLDcwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxQkE4QzAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iNzAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IidETSBTZXJpZiBEaXNwbGF5JyxHZW9yZ2lhLHNlcmlmIiBmb250LXNpemU9IjIyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RW1pTmF2PC90ZXh0Pjwvc3ZnPg==" alt="EmiNav" style="height:64px;width:auto;" /></div>
        <div class="footer-brand-desc">Navigate your health with clarity. Africa's intent-based healthcare navigation platform.</div>
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
      <div>
        <div class="footer-col-title">Follow Us</div>
        <div style="display:flex;gap:16px;margin-top:16px">
          <a href="https://www.instagram.com/eminav_app/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://x.com/eminav_app" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>

    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-text" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:0.8rem">
        <span>© 2026 EmiNav. All rights reserved.</span>
        <span style="color:rgba(255,255,255,0.2)">•</span>
        <a href="#" onclick="event.preventDefault();document.getElementById('privacy-policy').style.display='block';document.getElementById('legal-backdrop').style.display='block';document.getElementById('privacy-policy').scrollIntoView({behavior:'smooth'})" style="color:rgba(255,255,255,0.5);text-decoration:none">Privacy</a>
        <span style="color:rgba(255,255,255,0.2)">•</span>
        <a href="#" onclick="event.preventDefault();document.getElementById('terms-of-service').style.display='block';document.getElementById('legal-backdrop').style.display='block';document.getElementById('terms-of-service').scrollIntoView({behavior:'smooth'})" style="color:rgba(255,255,255,0.5);text-decoration:none">Terms</a>
      </div>
      <div class="footer-cities">
        <div class="footer-city"><span class="footer-city-dot"></span>Nairobi</div>
        <div class="footer-city"><span class="footer-city-dot"></span>Lagos</div>
      </div>
    </div>

  <!-- PRIVACY POLICY PAGE -->
    <!-- Backdrop for legal pages -->
  <div id="legal-backdrop" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9998" onclick="document.getElementById('privacy-policy').style.display='none';document.getElementById('terms-of-service').style.display='none';this.style.display='none'"></div>

  <div id="privacy-policy" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#F7F9F9;padding:80px 5%;overflow-y:auto;z-index:9999">
    <div style="max-width:800px;margin:0 auto;background:white;padding:60px;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.05)">
      <button onclick="document.getElementById('privacy-policy').style.display='none';document.getElementById('legal-backdrop').style.display='none';window.scrollTo({top:0,behavior:'smooth'})" style="background:#0D6E6E;color:white;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;margin-bottom:30px;font-family:'DM Sans',sans-serif;font-weight:600">← Back to Home</button>
      
      <h1 style="font-family:'DM Serif Display',serif;font-size:2.5rem;color:#0A1628;margin-bottom:10px">Privacy Policy</h1>
      <p style="color:#6B7280;margin-bottom:40px">Effective: February 2026</p>
       <p>EmiNav is committed to protecting your privacy. This policy explains what information we collect and how we use it.:</p>
      
      <div style="color:#1A2332;line-height:1.8;font-size:1.05rem">
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">Information We Collect</h2>
        <p>EmiNav collects limited information necessary to provide and improve our service:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Contact form submissions (name, email, message)</li>
          <li style="margin-bottom:8px">Search interactions (city selected or intent category clicked)</li>
          <li style="margin-bottom:8px">Anonymous usage analytics (pages visited, time spent)</li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">How We Use Your Information</h2>
        <p>We use this information to:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Respond to inquiries submitted via our contact form</li>
          <li style="margin-bottom:8px">Improve user experience and search functionality</li>
          <li style="margin-bottom:8px">Maintain and enhance facility data quality</li>
          <li style="margin-bottom:8px">Monitor and improve platform performance</li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">Data Sharing</h2>
        <p>We do <strong>NOT</strong> sell, rent, or trade your personal information. Your data is used solely to provide and improve EmiNav.</p>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">Your Rights</h2>
        <p>You have the right to:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Request correction or deletion of your data</li>
          <li style="margin-bottom:8px">Opt out of communications</li>
          <li style="margin-bottom:8px">Request access to personal data we hold about you</li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">Contact</h2>
        <p>Privacy questions? Email <a href="mailto:hello@eminav.com" style="color:#0D6E6E;text-decoration:underline">hello@eminav.com</a></p>
      </div>
    </div>
  </div>

  <!-- TERMS OF SERVICE PAGE -->
  <div id="terms-of-service" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#F7F9F9;padding:80px 5%;overflow-y:auto;z-index:9999">
    <div style="max-width:800px;margin:0 auto;background:white;padding:60px;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.05)">
      <button onclick="document.getElementById('terms-of-service').style.display='none';document.getElementById('legal-backdrop').style.display='none';window.scrollTo({top:0,behavior:'smooth'})" style="background:#0D6E6E;color:white;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;margin-bottom:30px;font-family:'DM Sans',sans-serif;font-weight:600">← Back to Home</button>
      
      <h1 style="font-family:'DM Serif Display',serif;font-size:2.5rem;color:#0A1628;margin-bottom:10px">Terms of Service</h1>
      <p style="color:#6B7280;margin-bottom:40px">Effective: February 2026</p>
      <p>By accessing or using EmiNav, you agree to the following terms:</p>
      
      <div style="color:#1A2332;line-height:1.8;font-size:1.05rem">
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">1. Service Description</h2>
        <p>EmiNav is an informational healthcare navigation platform. We provide facility listings, contact details, and structured service and capability information to assist users in identifying healthcare facilities.</p>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">2. Not Medical Advice</h2>
        <div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:20px;margin:15px 0 25px;border-radius:8px">
          <p style="margin:0;font-weight:600;color:#92400E">⚠️ IMPORTANT: EmiNav does NOT provide medical advice, diagnosis, or treatment.</p>
        </div>
        <p>All information is provided for general informational purposes only. Users are responsible for:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Verifying facility details directly before visiting</li>
          <li style="margin-bottom:8px">Confirming service availability and operating hours</li>
          <li style="margin-bottom:8px">Consulting qualified healthcare professionals for medical decisions</li>
          <li style="margin-bottom:8px"><strong>Contacting local emergency services in urgent situations</strong></li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">3. Information Accuracy</h2>
        <p>While we strive to maintain accurate and up-to-date information:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Facility details may change without notice</li>
          <li style="margin-bottom:8px">We cannot guarantee availability, pricing, or service capacity</li>
          <li style="margin-bottom:8px">Users must independently verify all information before acting on it</li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">4. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, EmiNav and its operators shall not be liable for:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Inaccurate or outdated facility information</li>
          <li style="margin-bottom:8px">Quality of care provided by any listed facility</li>
          <li style="margin-bottom:8px">Decisions made based on information obtained through EmiNav</li>
          <li style="margin-bottom:8px">Any direct, indirect, incidental, or consequential damages arising from use of the platform</li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">5. User Responsibilities</h2>
        <p>By using EmiNav, you agree to:</p>
        <ul style="margin:15px 0 25px;padding-left:25px">
          <li style="margin-bottom:8px">Use the platform for informational purposes only</li>
          <li style="margin-bottom:8px">Independently verify facility information before making healthcare decisions</li>
          <li style="margin-bottom:8px">Not hold EmiNav responsible for healthcare outcomes</li>
          <li style="margin-bottom:8px">Notify us of inaccurate or outdated information to help us improve</li>
        </ul>
        
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.5rem;color:#0A1628;margin:30px 0 15px">6. Contact</h2>
        <p>Questions? Email <a href="mailto:hello@eminav.com" style="color:#0D6E6E;text-decoration:underline">hello@eminav.com</a></p>
      </div>
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
  </script>`
      
      // City button click handlers
      setTimeout(() => {
        document.querySelectorAll('.hero-actions a').forEach(btn => {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            const city = this.textContent.trim();
            document.getElementById('selected-city').textContent = city;
            document.getElementById('find-care').style.display = 'block';
            setTimeout(() => {
              document.getElementById('find-care').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          });
        });

        // Scroll reveal
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => { entry.target.classList.add('visible'); }, i * 100);
            }
          });
        }, { threshold: 0.1 });
        reveals.forEach(el => observer.observe(el));

        // Nav highlighting
        const navLinks = document.querySelectorAll('.nav-links a');
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
              const top = section.offsetTop - 100;
              const bottom = top + section.offsetHeight;
              link.style.color = (scrollY >= top && scrollY < bottom) ? '#5CC8C8' : '';
            }
          });
        });
      }, 200);
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `:root {
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
    }`}} />
      <div id="html-container"></div>
    </>
  )
}
