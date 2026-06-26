import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/landlord");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md">
           <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white mb-4">
               <ShieldCheck className="w-7 h-7" />
             </div>
             <h1 className="text-3xl font-heading font-bold">Welcome to KasiRent</h1>
             <p className="text-muted-foreground mt-2">Sign in to manage listings or find a home.</p>
           </div>

           <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your phone number to receive an OTP.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="071 234 5678" type="tel" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? "Sending OTP..." : "Continue with Phone"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <div className="text-center mt-4 text-sm text-muted-foreground">
                <p>Or login with email</p>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Join as a Renter or Landlord today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:text-primary">
                      <span className="text-2xl">🏠</span>
                      <span>I want to Rent</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:text-primary">
                      <span className="text-2xl">🔑</span>
                      <span>I am a Landlord</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
