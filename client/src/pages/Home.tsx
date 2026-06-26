import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ListingCard from "@/components/ListingCard";
import { MOCK_LISTINGS, MOCK_TOWNSHIPS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ArrowRight, ShieldCheck, Camera, Users, ShieldAlert, CheckCircle2, MessageCircle, Eye, FileCheck, Home as HomeIcon, Phone, Star, Heart, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'renter' | 'landlord'>('renter');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/search?q=${searchTerm}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary px-4 pt-8 pb-16 md:py-20 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="container mx-auto relative z-10 max-w-2xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Find a home you can <br className="hidden md:block"/>
            <span className="text-emerald-200">trust</span> in your kasi.
          </h1>
          <p className="text-emerald-50 text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0">
            Verified landlords, safe payments, and quality rooms in townships across South Africa.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-lg max-w-full">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Where do you want to live?" 
                  className="pl-10 border-0 shadow-none bg-transparent h-11 text-base focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto font-medium h-11 text-base">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="flex gap-3 overflow-x-auto pb-4 pt-2 snap-x scrollbar-hide no-scrollbar mask-gradient">
          {MOCK_CATEGORIES.map((cat) => (
            <Link key={cat} href={`/search?type=${cat}`}>
              <div className="flex-none snap-start bg-white border shadow-sm rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap hover:border-primary hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                {cat}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Locations */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground">Popular Locations</h2>
          <Link href="/search">
            <span className="text-sm text-primary font-medium hover:underline flex items-center cursor-pointer">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_TOWNSHIPS.slice(0, 4).map((township, idx) => {
            // Using specific reliable Unsplash property images instead of random keyword search
            // which often fails or returns broken images
            const images = [
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
            ];
            
            return (
              <Link key={township} href={`/search?q=${township}`}>
                <div className="group relative aspect-[16/9] md:aspect-[4/3] rounded-lg overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20" />
                  <img 
                    src={images[idx]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-gray-200"
                    alt={`Properties in ${township}`}
                  />
                  <span className="absolute bottom-3 left-3 text-white font-medium z-30">{township}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground">Fresh on KasiRent</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* 1. TRUST SECTION */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10 text-emerald-950">
            Why people trust KasiRent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Verified Landlords</h3>
              <p className="text-sm text-muted-foreground">Every landlord is verified before listing.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Real Photos</h3>
              <p className="text-sm text-muted-foreground">No fake pictures or copied listings.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">No Agents. No Middlemen.</h3>
              <p className="text-sm text-muted-foreground">Contact landlords directly.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Scam Protection</h3>
              <p className="text-sm text-muted-foreground">Report suspicious listings easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500 text-lg">Simple steps to find or list a rental</p>
          </div>

          {/* Custom Tabs */}
          <div className="flex justify-center mb-16">
            <div className="bg-slate-50 p-1 rounded-full inline-flex relative shadow-sm border border-slate-100">
              <button
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'renter' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('renter')}
              >
                I'm looking for a place
              </button>
              <button
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'landlord' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('landlord')}
              >
                I want to list my place
              </button>
            </div>
          </div>

          {/* Cards Container with Dotted Line */}
          <div className="relative">
            {/* Dotted Line connector */}
            <div className="hidden md:block absolute top-12 left-0 w-full border-t-2 border-dashed border-emerald-100 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {activeTab === 'renter' ? (
                <>
                  <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Search className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100 font-heading">01</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Search by area and budget</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Browse verified listings in your township. Filter by price, type, and location.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Eye className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100 font-heading">02</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">View verified listings</h3>
                    <p className="text-slate-500 leading-relaxed">
                      See real photos, honest descriptions, and verified landlord badges.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100 font-heading">03</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Contact landlord directly</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Call or WhatsApp the landlord. No agents, no middlemen, no extra fees.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100 font-heading">01</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Register and verify</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Create your account and verify your identity. It only takes 5 minutes.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <HomeIcon className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100 font-heading">02</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">List your rental</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Add photos, set your price, and describe your property honestly.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Phone className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100 font-heading">03</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Get contacted by real tenants</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Receive calls and messages from verified, serious renters.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRICING SECTION */}
      <section className="bg-emerald-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">
              Affordable listing plans
            </h2>
            <p className="text-slate-500 text-lg">List your property and find tenants quickly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            {/* Basic Plan */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Basic</h3>
              <p className="text-slate-500 text-sm mb-6">Perfect for single property owners</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="text-4xl md:text-5xl font-bold text-slate-900">R50</span>
                <span className="text-slate-400 font-medium ml-1">/month</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500 w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">1 active listing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500 w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">Verified badge</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500 w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">Appear in search results</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500 w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">Direct tenant contact</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500 w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">Basic support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-[#00a372] hover:bg-[#008f63] text-white font-semibold py-6 rounded-xl" size="lg">
                Start listing
              </Button>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-[#00a372] rounded-[24px] p-8 shadow-[0_10px_30px_-5px_rgba(0,163,114,0.3)] text-white flex flex-col relative mt-4 md:mt-0">
              <div className="absolute -top-4 right-8 bg-amber-400 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-950" />
                Most Popular
              </div>
              
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-emerald-50 text-sm mb-6">Get more visibility and enquiries</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="text-4xl md:text-5xl font-bold text-white">R79</span>
                <span className="text-emerald-100 font-medium ml-1">/month</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  <span className="text-white text-sm font-medium">Up to 3 active listings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  <span className="text-white text-sm font-medium">Priority placement in search</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  <span className="text-white text-sm font-medium">Trust badge on listings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  <span className="text-white text-sm font-medium">Boosted visibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  <span className="text-white text-sm font-medium">Featured on homepage</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  <span className="text-white text-sm font-medium">Priority support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-white text-[#00a372] hover:bg-slate-50 font-semibold py-6 rounded-xl" size="lg">
                Go Premium
              </Button>
            </div>
          </div>
          
          <p className="text-center mt-10 text-slate-400 text-sm font-medium">
            No long contracts. Cancel anytime. All prices include VAT.
          </p>
        </div>
      </section>

      {/* 4. SAFETY & COMMUNITY MESSAGE */}
      <section className="bg-[#0f172a] py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00a372]/10 text-[#00a372] px-4 py-2 rounded-full text-sm font-medium mb-8 border border-[#00a372]/20">
                <Heart className="w-4 h-4" />
                Community First
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white leading-tight">
                Built for townships.<br />
                <span className="text-[#00a372]">Built on trust.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-lg">
                KasiRent exists because our communities deserve better. Too many
                people have lost money to rental scams. Too much time is wasted
                searching for places that don't exist. We're here to change that.
              </p>

              <ul className="space-y-4">
                {[
                  "Protecting communities from rental scams",
                  "Making township rentals visible online",
                  "Saving time and money for renters",
                  "Helping honest landlords find good tenants"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00a372] shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column (Cards) */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                {/* Card 1 */}
                <div className="bg-[#1e293b] p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-lg">
                  <Shield className="w-8 h-8 text-[#00a372] mb-6" />
                  <h3 className="text-white font-bold text-lg mb-3">Safe Platform</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Every listing is checked. Every landlord is verified.</p>
                </div>
                {/* Card 2 */}
                <div className="bg-[#00a372] p-6 md:p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-heading">98%</div>
                  <p className="text-emerald-50 text-sm font-medium">of renters recommend us</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6 pt-6 md:pt-12">
                {/* Card 3 */}
                <div className="bg-[#1e293b] p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold text-[#00a372] mb-3 font-heading">24hr</div>
                  <p className="text-slate-400 text-sm">Scam removal time</p>
                </div>
                {/* Card 4 */}
                <div className="bg-[#1e293b] p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-lg">
                  <Users className="w-8 h-8 text-[#00a372] mb-6" />
                  <h3 className="text-white font-bold text-lg mb-3">Community Support</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">WhatsApp support available in all languages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
