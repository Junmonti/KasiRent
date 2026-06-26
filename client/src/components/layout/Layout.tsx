import Header from "./Header";
import MobileNav from "./MobileNav";
import { Link } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      
      {/* Footer added based on requirements */}
      <footer className="bg-gray-900 text-gray-300 py-12 pb-24 md:pb-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/">
                <a className="text-xl font-heading font-bold text-white mb-4 block">KasiRent</a>
              </Link>
              <p className="text-sm text-gray-400 max-w-xs">
                The safest place to find and list township rentals across South Africa.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about"><a className="hover:text-white transition-colors">About us</a></Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust & safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy & terms</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-red-400">Report a scam</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    WhatsApp support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} KasiRent. All rights reserved.
          </div>
        </div>
      </footer>
      <MobileNav />
    </div>
  );
}
