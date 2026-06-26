import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import logoUrl from "@assets/KasiRent_LOGO_1781281703265.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logoUrl} alt="KasiRent" className="h-8 w-auto" />
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/search"><span className="hover:text-primary cursor-pointer transition-colors">Find a Home</span></Link>
          <Link href="/landlord"><span className="hover:text-primary cursor-pointer transition-colors">List Your Property</span></Link>
          <Link href="/about"><span className="hover:text-primary cursor-pointer transition-colors">Trust & Safety</span></Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/messages">
            <Button variant="ghost" size="sm" className="hidden md:flex font-medium text-foreground hover:bg-secondary">
              Messages
            </Button>
          </Link>
          <Link href="/landlord/new">
            <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/90 text-white shadow-sm font-medium">
              Post Listing
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-medium text-foreground hover:bg-secondary">
              Sign In
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-rose-500 rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
