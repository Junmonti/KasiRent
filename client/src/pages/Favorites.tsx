import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Favorites() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="bg-white min-h-[calc(100vh-64px)] pb-20 md:pb-0">
        {/* Header matching image exactly */}
        <div className="flex items-center px-4 py-4 border-b border-gray-100">
          <button onClick={() => setLocation('/')} className="mr-3 p-1">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Saved Listings</h1>
            <p className="text-xs text-slate-500">0 properties • 0 saved searches</p>
          </div>
        </div>

        {/* Empty State Card exactly like image */}
        <div className="p-4 pt-6">
          {/* Subtle tabs */}
          <div className="flex gap-4 mb-6 ml-1">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 pb-1 border-b-2 border-slate-900">
              <Heart className="w-3.5 h-3.5" />
              Saved Properties (0)
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pb-1 border-b-2 border-transparent">
              <Search className="w-3.5 h-3.5" />
              Saved Searches (0)
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] text-center mt-2 flex flex-col items-center max-w-sm mx-auto">
            <Heart className="w-12 h-12 text-gray-300 stroke-[1.5] mb-4" />
            
            <h2 className="text-[15px] font-bold text-slate-900 mb-2">No saved properties yet</h2>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed px-4">
              Start saving properties you're interested in to keep track of them
            </p>
            
            <Link href="/search">
              <Button className="bg-[#00a372] hover:bg-[#008f63] text-white font-medium text-xs px-6 py-2 h-9 rounded-md flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                Browse listings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
