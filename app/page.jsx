'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, DollarSign, Navigation, AlertCircle, Baby, Pill, Activity, Syringe, Stethoscope, Ambulance, ChevronRight, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function EmiNav() {
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

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

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  // Handle intent selection
  const handleIntentSelect = (intent) => {
    setSelectedIntent(intent);
    if (city) {
      searchFacilities(intent.id, city);
    }
  };

  // Search facilities using Supabase
  const searchFacilities = async (intentId, selectedCity) => {
    setLoading(true);
    setError(null);

    try {
      // Log the search for analytics
      await supabase.from('user_searches').insert({
        city: selectedCity,
        intent_type: intentId,
        user_location_lat: userLocation?.lat,
        user_location_lng: userLocation?.lng
      });

      // Query facilities with the selected capability
      const { data: facilities, error: fetchError } = await supabase
        .from('facilities')
        .select(`
          id,
          name,
          address,
          phone,
          rating,
          hours,
          verified,
          latitude,
          longitude,
          capabilities!inner(
            capability_type,
            estimated_cost_min,
            estimated_cost_max,
            currency
          )
        `)
        .eq('city', selectedCity)
        .eq('capabilities.capability_type', intentId)
        .eq('verified', true)
        .order('rating', { ascending: false });

      if (fetchError) throw fetchError;

      // Calculate distances if user location is available
      const facilitiesWithDistance = facilities.map(facility => {
        let distance = null;
        if (userLocation && facility.latitude && facility.longitude) {
          distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            facility.latitude,
            facility.longitude
          );
        }

        // Format cost range
        const capability = facility.capabilities[0];
        const estimatedCost = capability.estimated_cost_min && capability.estimated_cost_max
          ? `${capability.currency} ${capability.estimated_cost_min.toLocaleString()} - ${capability.estimated_cost_max.toLocaleString()}`
          : 'Contact for pricing';

        return {
          ...facility,
          distance: distance ? `${distance.toFixed(1)} km` : 'Unknown',
          estimatedCost,
          distanceValue: distance || 999 // for sorting
        };
      });

      // Sort by distance if available, otherwise by rating
      facilitiesWithDistance.sort((a, b) => {
        if (userLocation) {
          return a.distanceValue - b.distanceValue;
        }
        return b.rating - a.rating;
      });

      setResults(facilitiesWithDistance);

      // Update search results count
      await supabase
        .from('user_searches')
        .update({ results_count: facilitiesWithDistance.length })
        .eq('city', selectedCity)
        .eq('intent_type', intentId)
        .order('search_date', { ascending: false })
        .limit(1);

    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to load facilities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (degrees) => degrees * (Math.PI / 180);

  // Format hours
  const formatHours = (hours) => {
    if (!hours || typeof hours !== 'object') return '24/7';
    
    // If hours is a simple string
    if (typeof hours === 'string') return hours;
    
    // If it's an object with day-specific hours
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return hours[today] || hours.general || '24/7';
  };

  // Handle city selection
  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    if (selectedIntent) {
      searchFacilities(selectedIntent.id, selectedCity);
    }
  };

  return (
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
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-gray-700 font-medium">
                {city || (userLocation ? 'Location detected' : 'Select city')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!selectedIntent && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What's happening?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us your need, and we'll find the right healthcare facility for you—not just any facility.
            </p>
          </div>
        )}

        {/* City Selection */}
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

        {/* Intent Selection */}
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
                    className={`p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 group text-left ${
                      intent.urgent ? 'ring-2 ring-red-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`${intent.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {intent.urgent && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                          URGENT
                        </span>
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Finding the best facilities for you...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {selectedIntent && !loading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Facilities for {selectedIntent.label}
                </h3>
                <p className="text-gray-600 mt-1">
                  {results.length} verified {results.length === 1 ? 'facility' : 'facilities'} found in {city}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedIntent(null);
                  setResults([]);
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
              >
                ← Change need
              </button>
            </div>

            <div className="grid gap-6">
              {results.map((facility) => (
                <div
                  key={facility.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{facility.name}</h4>
                        {facility.verified && (
                          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold">
                            ✓ VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {facility.address}
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
                    <a
                      href={`tel:${facility.phone}`}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white hover:bg-gray-50 text-emerald-700 border-2 border-emerald-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
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
              onClick={() => {
                setSelectedIntent(null);
                setResults([]);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Try another need
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">© 2026 EmiNav - Navigate your life, master your health</p>
            <p>Currently serving Nairobi & Lagos • More cities coming soon</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
