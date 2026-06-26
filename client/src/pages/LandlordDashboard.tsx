import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, BarChart3, MessageSquare, Eye, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { MOCK_LISTINGS } from "@/lib/mockData";

export default function LandlordDashboard() {
  const myListings = MOCK_LISTINGS.slice(0, 2); // Mock: Landlord has 2 listings
  const isVerified = false; // Mock state

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Landlord Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and track performance.</p>
          </div>
          <Link href="/landlord/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add New Listing
            </Button>
          </Link>
        </div>

        {!isVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900">Verify your profile to publish</h3>
              <p className="text-amber-700 text-sm mt-1 mb-3">
                To prevent scams, we require all landlords to verify their identity. Verified listings get 3x more views.
              </p>
              <Link href="/landlord/verify">
                <Button size="sm" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                  Start Verification
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+4 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 Draft</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Listings</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries & Applications</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {myListings.map(listing => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-32 md:h-auto relative">
                    <img 
                      src={listing.images[0]} 
                      alt="" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Live</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {listing.location.township} • R {listing.price}/mo
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4 justify-end">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:text-amber-700">
                        Feature Listing
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="enquiries" className="space-y-4">
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Recent Enquiries</h3>
                  <Button variant="outline" size="sm">Mark all read</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 border rounded-xl bg-slate-50 relative">
                    <div className="w-2 h-2 rounded-full bg-primary absolute top-6 left-2"></div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold ml-2">
                      SM
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-bold">Sipho M.</h4>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm font-medium mt-0.5">Application: Modern Backyard Flat in Khayelitsha</p>
                      <p className="text-sm text-muted-foreground mt-2">"Hi, I'm very interested in this flat. I work in the area and have good references. Can I view it tomorrow?"</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">Reply via WhatsApp</Button>
                        <Button size="sm" variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 border rounded-xl">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold ml-2">
                      LT
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-bold">Lerato T.</h4>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <p className="text-sm font-medium mt-0.5">Enquiry: Modern Backyard Flat in Khayelitsha</p>
                      <p className="text-sm text-muted-foreground mt-2">"Is the deposit negotiable?"</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="secondary">Reply via WhatsApp</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="drafts">
             <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No drafts currently</p>
                <Link href="/landlord/new">
                  <Button variant="link" className="mt-2 text-primary">Create new listing</Button>
                </Link>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
