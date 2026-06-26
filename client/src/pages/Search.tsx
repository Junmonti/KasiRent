import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import ListingCard from "@/components/ListingCard";
import { MOCK_LISTINGS, MOCK_CATEGORIES, MOCK_TOWNSHIPS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Filter, X, ArrowUpDown } from "lucide-react";
import { useLocation } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'safety';

export default function Search() {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const initialQuery = queryParams.get("q") || "";
  const initialType = queryParams.get("type") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState(initialType);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("10000");
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const budgetPresets = [
    { label: "< R1.5k", min: 0, max: 1500 },
    { label: "R1.5k - R2.5k", min: 1500, max: 2500 },
    { label: "R2.5k - R3.5k", min: 2500, max: 3500 },
    { label: "R3.5k - R5k", min: 3500, max: 5000 },
    { label: "R5k+", min: 5000, max: 10000 },
  ];

  const filteredListings = useMemo(() => {
    let results = MOCK_LISTINGS.filter(listing => {
      const matchesSearch = 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.township.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === "all" || listing.type === selectedType;
      const matchesMin = listing.price >= parseInt(minPrice || "0");
      const matchesMax = listing.price <= parseInt(maxPrice || "10000");

      return matchesSearch && matchesType && matchesMin && matchesMax;
    });

    return results.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'safety') return b.safetyScore - a.safetyScore;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [searchQuery, selectedType, minPrice, maxPrice, sortBy]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-3 block text-foreground/80">Property Type</label>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedType === "all" ? "default" : "outline"}
            className="cursor-pointer px-3 py-1"
            onClick={() => setSelectedType("all")}
          >
            All
          </Badge>
          {MOCK_CATEGORIES.map(cat => (
            <Badge 
              key={cat}
              variant={selectedType === cat ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
              onClick={() => setSelectedType(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block text-foreground/80">Budget Range</label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Min</span>
            <Select value={minPrice} onValueChange={setMinPrice}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="R 0" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">R 0</SelectItem>
                <SelectItem value="500">R 500</SelectItem>
                <SelectItem value="1000">R 1000</SelectItem>
                <SelectItem value="2000">R 2000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Max</span>
            <Select value={maxPrice} onValueChange={setMaxPrice}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="R 10000+" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1500">R 1500</SelectItem>
                <SelectItem value="2500">R 2500</SelectItem>
                <SelectItem value="5000">R 5000</SelectItem>
                <SelectItem value="10000">R 10000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {budgetPresets.map(preset => (
            <button
              key={preset.label}
              onClick={() => {
                setMinPrice(preset.min.toString());
                setMaxPrice(preset.max.toString());
              }}
              className="text-[11px] bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/20 rounded-full px-3 py-1 transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Khayelitsha, Soweto..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/20 border-transparent focus:bg-white focus:ring-1 focus:ring-primary/20 h-10 rounded-lg"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-10 gap-2 font-medium">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-[2rem]">
                <SheetHeader>
                  <SheetTitle className="text-xl font-heading">Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 overflow-y-auto">
                  <FilterPanel />
                </div>
                <SheetFooter className="pb-8">
                  <Button className="w-full h-12 text-lg font-bold" onClick={() => {}}>Show {filteredListings.length} Results</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="h-10 w-[140px] hidden md:flex">
                <ArrowUpDown className="h-3 w-3 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_asc">Price: Low-High</SelectItem>
                <SelectItem value="price_desc">Price: High-Low</SelectItem>
                <SelectItem value="safety">Safety Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-heading font-bold text-xl">{filteredListings.length} listings found</h1>
          <div className="md:hidden">
             <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="h-8 text-xs border-none bg-secondary/30 px-2 rounded-full">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_asc">Price: Low-High</SelectItem>
                <SelectItem value="price_desc">Price: High-Low</SelectItem>
                <SelectItem value="safety">Safety Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed mt-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/50 mb-6">
              <SearchIcon className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">No results for your criteria</h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-sm mb-6">
              Try widening your budget or property type selection to see more homes.
            </p>
            <Button 
              variant="default"
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
                setMinPrice("0");
                setMaxPrice("10000");
              }}
              className="rounded-full px-8"
            >
              Reset all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
