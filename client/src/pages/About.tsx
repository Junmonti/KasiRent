import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Shield, Users, Lock, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <Layout>
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl font-heading font-bold mb-6">Safe Rentals for Everyone</h1>
          <p className="text-lg text-muted-foreground mb-8">
            KasiRent is built on trust. We verify landlords and properties so you can rent with peace of mind.
          </p>
          <Link href="/search">
             <Button size="lg" className="bg-primary hover:bg-primary/90">Find a Home</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Landlords</h3>
            <p className="text-muted-foreground">
              Every landlord goes through ID and address verification before they can list.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Scam Prevention</h3>
            <p className="text-muted-foreground">
              Our community reporting tools and safety checks keep scammers away.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community First</h3>
            <p className="text-muted-foreground">
              Built for townships, by the community. We understand your needs.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
