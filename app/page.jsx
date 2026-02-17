'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, DollarSign, Navigation, AlertCircle, Baby, Pill, Activity, Syringe, Stethoscope, Ambulance, ChevronRight, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import About from "@/components/About";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import { CTA, Footer } from "@/components/CTAAndFooter";

export default function EmiNav() {
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [showApp, setShowApp] = useState(false);

  // Intent categories
  const intents = [
    { id: 'accident', label: 'Accident/Trauma', icon: AlertCircle, color: 'bg-red-500', urgent: true },
    { id: 'labor', label: 'Labor/Pregnancy', icon: Baby, color: 'bg-pink-500', urgent: true },
    { id: 'child', label: 'Child Emergency', icon: Baby, color: 'bg-yellow-500', urgent: true },
    { id: 'stroke', label: 'Stroke Symptoms', icon: Activity, color: 'bg-purple-500', urgent: true },
    { id: 'pharmacy', label: 'Need Pharmacy', icon: Pill, color: 'bg-blue-500', urgent: false },
    { id: 'dental', label: 'Dental Emergency', icon: Activity, color: 'bg-teal-500', urgent: true },
    { id: 'diagnostic', label: 'Diagnostic Center', icon: Activity, color: 'bg-indigo-500', urgent: false },
    { id: 'ambulance', label: 'Ambulance Service', icon: Ambulance, color: 'bg-red-600', urgent: true },
    { id: 'vaccination', label: 'Vaccination', icon: Syringe, color: 'bg-green-500', urgent: false },
    { id: 'consultation', label: 'General Consultation', icon: Stethoscope, color: 'bg-blue-400', urgent: false },
    { id: 'notsure', label: 'Not Sure', icon: Search, color: 'bg-gray-500', urgent: false }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Location access denied:', error)
      );
    }
  }, []);

  const handleIntentSelect = (intent) => {
    setSelectedIntent(intent);
    if (city) searchFacilities(intent.id, city);
  };

  const searchFacilities = async (intentId, selectedCity) => {
    setLoading(true);
    setError(null);
    try {
      await supabase.from('user_searches').insert({
        city: selectedCity,
        intent_type: intentId,
        user_location_lat: userLocation?.lat,
        user_location_lng: userLocation?.lng
      });

      const { data: facilities, error: fetchError } = await supabase
        .from('facilities')
        .select(`
          id, name, address, phone, rating, hours, verified, latitude, longitude,
          capabilities!inner(capability_type, estimated_cost_min, estimated_cost_max, currency)
        `)
        .eq('city', selectedCity)
        .eq('capabilities.capability_type', intentId)
        .eq('verified', true)
        .order('rating', { ascending: false });

      if (fetchError) throw fetchError;

      const facilitiesWithDistance = facilities.map(facility => {
        let distance = null;
        if (userLocation && facility.latitude && facility.longitude) {
          distance = calculateDistance(userLocation.lat, userLocation.lng, facility.latitude, facility.longitude);
        }
        const capability = facility.capabilities[0];
        const estimatedCost = capability.estimated_cost_min && capability.estimated_cost_max
          ? `${capability.currency} ${capability.estimated_cost_min.toLocaleString()} - ${capability.estimated_cost_max.toLocaleString()}`
          : 'Contact for pricing';
        return { ...facility, distance: distance ? `${distance.toFixed(1)} km` : 'Unknown', estimatedCost, distanceValue: distance || 999 };
      });

      facilitiesWithDistance.sort((a, b) => userLocation ? a.distanceValue - b.distanceValue : b.rating - a.rating);
      setResults(facilitiesWithDistance);
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to load facilities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const toRad = (degrees) => degrees * (Math.PI / 180);

  const formatHours = (hours) => {
    if (!hours || typeof hours !== 'object') return '24/7';
    if (typeof hours === 'string') return hours;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return hours[today] || hours.general || '24/7';
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    if (selectedIntent) searchFacilities(selectedIntent.id, selectedCity);
  };

  return (
    <div className="min-h-screen">

      {/* ── LANDING SECTIONS (shown when not in app mode) ── */}
      {!showApp && (
        <>
          {/* NAVBAR */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060d1a]/90 backdrop-blur-xl border-b border-[#2dd4bf]/10 px-6 md:px-16 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#1e5fa8] flex items-center justify-center">
                <Navigation className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8] bg-clip-text text-transparent">
                EmiNav
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Features', 'How It Works', 'Team'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-[#7fa8bf] text-sm hover:text-[#2dd4bf] transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-[#2dd4bf]/20"
            >
              Find a Facility →
            </button>
          </nav>

          {/* HERO */}
          <section className="min-h-screen bg-[#060d1a] flex items-center px-6 md:px-16 lg:px-24 pt-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#2dd4bf]/8 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1e5fa8]/10 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2dd4bf]/10 border border-[#2dd4bf]/25 text-[#2dd4bf] text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 bg-[#2dd4bf] rounded-full animate-pulse" />
                  Nairobi & Lagos · More cities soon
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                  Navigate your life,{" "}
                  <span className="bg-gradient-to-r from-[#2dd4bf] via-[#0ea5b0] to-[#1e5fa8] bg-clip-text text-transparent">
                    master your health
                  </span>
                </h1>

                <p className="text-[#7fa8bf] text-xl leading-relaxed font-light mb-10 max-w-lg">
                  Find the right healthcare facility for your exact need — not just any facility.
                  Verified, real-time, and built for African cities.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowApp(true)}
                    className="bg-gradient-to-r from-[#2dd4bf] to-[#1e5fa8] text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-xl shadow-[#2dd4bf]/25"
                  >
                    Find a Facility Now
                  </button>
                  <a
                    href="#about"
                    className="border border-[#2dd4bf]/25 text-white font-medium px-8 py-4 rounded-full text-lg hover:border-[#2dd4bf]/50 hover:text-[#2dd4bf] transition-all"
                  >
                    Learn More
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-6 mt-10">
                  {[
                    { value: '500+', label: 'Verified facilities' },
                    { value: '2', label: 'Cities' },
                    { value: '24/7', label: 'Available' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-white font-bold text-xl">{stat.value}</div>
                      <div className="text-[#7fa8bf] text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side visual */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative w-80 h-80">
                  {[320, 240, 160].map((size, i) => (
                    <div
                      key={size}
                      className="absolute rounded-full border border-[#2dd4bf]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ width: size, height: size, animationDelay: `${i * 0.5}s` }}
                    />
                  ))}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#1e5fa8] flex items-center justify-center shadow-2xl shadow-[#2dd4bf]/30">
                    <Navigation className="w-10 h-10 text-white" />
                  </div>
                  {/* Floating intent pills */}
                  {[
                    { label: '🚑 Ambulance', top: '5%', left: '60%' },
                    { label: '💊 Pharmacy', top: '75%', left: '55%' },
                    { label: '🏥 Emergency', top: '40%', left: '-10%' },
                  ].map((pill) => (
                    <div
                      key={pill.label}
                      className="absolute bg-[#0b1829] border border-[#2dd4bf]/20 text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap"
                      style={{ top: pill.top, left: pill.left }}
                    >
                      {pill.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTIONS */}
          <div id="about"><About /></div>
          <div id="features"><Features /></div>
          <div id="how-it-works"><HowItWorks /></div>
          <div id="team"><Team /></div>
          <CTA />
          <Footer />
        </>
      )}

      {/* ── APP MODE (original EmiNav functionality) ── */}
      {showApp && (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                      EmiNav
                    </h1>
                    <p className="text-xs text-gray-600">Navigate your life, master your health</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700 font-medium">
                      {city || (userLocation ? 'Location detected' : 'Select city')}
                    </span>
                  </div>
                  <button
                    onClick={() => { setShowApp(false); setSelectedIntent(null); setResults([]); setCity(''); }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!selectedIntent && (
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What's happening?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Tell us your need, and we'll find the right healthcare facility for you—not just any facility.
                </p>
              </div>
            )}

            {!city && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Select Your City</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {['Nairobi', 'Lagos'].map((cityName) => (
                    <button
                      key={cityName}
                      onClick={() => handleCitySelect(cityName)}
                      className="p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-semibold text-gray-900">{cityName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {city && !selectedIntent && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">What do you need?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {intents.map((intent) => {
                    const Icon = intent.icon;
                    return (
                      <button
                        key={intent.id}
                        onClick={() => handleIntentSelect(intent)}
                        className={`p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 group text-left ${intent.urgent ? 'ring-2 ring-red-200' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`${intent.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {intent.urgent && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">URGENT</span>
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{intent.label}</h4>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Finding the best facilities for you...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {selectedIntent && !loading && results.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Facilities for {selectedIntent.label}</h3>
                    <p className="text-gray-600 mt-1">
                      {results.length} verified {results.length === 1 ? 'facility' : 'facilities'} found in {city}
                    </p>
                  </div>
                  <button
                    onClick={() => { setSelectedIntent(null); setResults([]); }}
                    className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
                  >
                    ← Change need
                  </button>
                </div>

                <div className="grid gap-6">
                  {results.map((facility) => (
                    <div key={facility.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{facility.name}</h4>
                            {facility.verified && (
                              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold">✓ VERIFIED</span>
                            )}
                          </div>
                          <p className="text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />{facility.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span className="text-2xl font-bold text-gray-900">{facility.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">rating</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Navigation className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">{facility.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">{formatHours(facility.hours)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">{facility.estimatedCost}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a href={`tel:${facility.phone}`} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                          <Phone className="w-5 h-5" />Call Now
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white hover:bg-gray-50 text-emerald-700 border-2 border-emerald-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <MapPin className="w-5 h-5" />Directions
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedIntent && !loading && results.length === 0 && !error && (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No facilities found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any verified facilities for {selectedIntent.label} in {city}.
                </p>
                <button
                  onClick={() => { setSelectedIntent(null); setResults([]); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Try another need
                </button>
              </div>
            )}
          </main>

          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600 text-sm">
                <p className="mb-2">© 2026 EmiNav - Navigate your life, master your health</p>
                <p>Currently serving Nairobi & Lagos • More cities coming soon</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
