import { Link } from "wouter";
import { Listing } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Bath, Bed, Wifi, ShieldCheck, Check, Star } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className="overflow-hidden group cursor-pointer border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
            {listing.isBoosted && (
              <Badge className="bg-amber-400 hover:bg-amber-500 text-amber-950 border-none shadow-sm backdrop-blur-sm h-6 font-bold px-2 py-0.5">
                <Star className="w-3 h-3 mr-1 fill-current" /> Featured
              </Badge>
            )}
            {listing.landlord.verified && (
              <Badge className="bg-primary/90 hover:bg-primary text-white border-none shadow-sm backdrop-blur-sm px-2 py-0.5 h-6">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
             <Badge className="bg-black/40 text-white border-none backdrop-blur-sm text-[10px] px-1.5">
               Safety: {listing.safetyScore}%
             </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-12">
            <p className="text-white font-semibold text-lg">R {listing.price}</p>
          </div>
        </div>
        
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {listing.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-xs mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {listing.location.township}, {listing.location.city}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground mt-3">
            <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
              <Bed className="w-3 h-3" />
              <span>{listing.type}</span>
            </div>
            {listing.features.electricityIncluded && (
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">
                <Check className="w-3 h-3" />
                <span>Elec Incl.</span>
              </div>
            )}
            {listing.features.wifi && (
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                <Wifi className="w-3 h-3" />
                <span>Wi-Fi</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
