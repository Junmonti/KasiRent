import { useRoute, Link } from "wouter";
import Layout from "@/components/layout/Layout";
import { MOCK_LISTINGS, MOCK_POIS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  MapPin, Share2, Heart, ShieldCheck, CheckCircle2, 
  Wifi, Car, Lock, MessageCircle, Phone, Flag, Navigation
} from "lucide-react";
import { useState } from "react";

export default function ListingDetails() {
  const [match, params] = useRoute("/listing/:id");
  const id = params?.id;
  
  const listing = MOCK_LISTINGS.find(l => l.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Link href="/"><Button>Go Home</Button></Link>
        </div>
      </Layout>
    );
  }

  // Haversine formula for distance
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  const handleWhatsApp = () => {
    const message = `Hi, I saw your listing on KasiRent: ${listing.title}. Is it still available?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Layout>
      <div className="pb-24">
        {/* Image Gallery */}
        <div className="relative h-[300px] md:h-[500px] bg-gray-100">
          <img 
            src={listing.images[activeImage]} 
            className="w-full h-full object-cover"
            alt={listing.title}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur shadow-sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur shadow-sm">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          {listing.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-2xl overflow-x-auto max-w-[90%]">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === idx ? 'border-primary scale-110' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-wider text-[10px]">
                    {listing.type}
                  </Badge>
                  {listing.landlord.verified && (
                    <Badge className="bg-emerald-500 text-white border-none shadow-sm h-6">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Verified Landlord
                    </Badge>
                  )}
                  <Badge variant="outline" className="h-6">Safety Score: {listing.safetyScore}%</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-3 tracking-tight">{listing.title}</h1>
                <div className="flex items-center text-muted-foreground font-medium">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  {listing.location.township}, {listing.location.city}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-8 border-y border-gray-100 mb-8">
                <div className="text-center group">
                  <span className="block font-heading font-black text-2xl group-hover:text-primary transition-colors">R {listing.price}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">per month</span>
                </div>
                <div className="text-center group">
                  <span className="block font-heading font-black text-2xl group-hover:text-primary transition-colors">{listing.features.bathrooms}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Bathroom</span>
                </div>
                <div className="text-center group">
                  <span className="block font-heading font-black text-2xl group-hover:text-primary transition-colors">{listing.features.furnished ? 'Yes' : 'No'}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Furnished</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-heading font-bold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {listing.description}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-heading font-bold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {listing.features.secure && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl text-sm font-medium">
                      <Lock className="w-5 h-5 text-primary" /> Secure Yard
                    </div>
                  )}
                  {listing.features.wifi && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl text-sm font-medium">
                      <Wifi className="w-5 h-5 text-primary" /> Free WiFi
                    </div>
                  )}
                  {listing.features.parking && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl text-sm font-medium">
                      <Car className="w-5 h-5 text-primary" /> Parking
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Prepaid Elec
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location View
                </h3>
                <div className="w-full h-[300px] bg-secondary/30 rounded-3xl overflow-hidden relative border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                    alt="Map view" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-6">
                    <Button className="bg-white text-black hover:bg-gray-100 rounded-full shadow-lg font-bold">
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  What's Nearby
                </h3>
                <div className="space-y-3">
                  {MOCK_POIS.map(poi => (
                    <div key={poi.name} className="flex justify-between items-center p-4 bg-white border rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
                          <Navigation className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{poi.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{poi.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-bold">
                        {getDistance(listing.location.lat, listing.location.lng, poi.lat, poi.lng)} km
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4 mb-10 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Flag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-amber-900">Avoid Rental Scams</h4>
                  <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                    KasiRent verifies landlords, but you should still be careful. Never pay a deposit before seeing the place. Meet the landlord at the property.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:relative">
              <Card className="p-6 sticky top-24 rounded-3xl shadow-xl border-none ring-1 ring-black/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl shadow-inner">
                    {listing.landlord.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-bold text-lg">{listing.landlord.name}</h3>
                      {listing.landlord.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Joined {new Date(listing.landlord.joinedDate).getFullYear()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-muted-foreground font-medium">Response Rate</span>
                    <span className="font-bold text-emerald-600">{listing.landlord.responseRate}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-muted-foreground font-medium">Available From</span>
                    <span className="font-bold">{listing.availabilityDate}</span>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <Button className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1" onClick={handleWhatsApp}>
                    <MessageCircle className="w-5 h-5 mr-3 fill-current" /> WhatsApp
                  </Button>
                  <Link href="/messages">
                    <Button variant="outline" className="w-full h-14 mt-3 rounded-2xl font-bold border-gray-200 transition-all hover:bg-secondary">
                      <MessageCircle className="w-5 h-5 mr-3" /> Send Message
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-gray-200 transition-all hover:bg-secondary">
                    <Phone className="w-5 h-5 mr-3" /> Call Landlord
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <button className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                    Report Suspicious Activity
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
