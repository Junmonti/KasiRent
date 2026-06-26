import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_TOWNSHIPS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Upload, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "wouter";

export default function CreateListing() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      toast({
        title: "Listing Created!",
        description: "Your listing is now pending review.",
      });
      setLocation("/landlord");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-heading font-bold mb-6">Create New Listing</h1>
        
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-secondary'}`} />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Basic Details"}
              {step === 2 && "Location & Features"}
              {step === 3 && "Photos & Review"}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>Listing Title</Label>
                  <Input placeholder="e.g. Spacious Backyard Room in Khayelitsha" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (per month)</Label>
                    <Input type="number" placeholder="R 2500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Deposit (Optional)</Label>
                    <Input type="number" placeholder="R 2500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the place, rules, and nearby amenities..." className="h-32" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                 <div className="space-y-2">
                  <Label>Township / Area</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_TOWNSHIPS.map(town => (
                        <SelectItem key={town} value={town}>{town}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Street Address (Private until booking)</Label>
                  <Input placeholder="e.g. 1234 B Section" />
                </div>

                <div className="space-y-4 pt-4">
                  <Label className="text-base">Features & Amenities</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="wifi" />
                      <Label htmlFor="wifi">WiFi Included</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="parking" />
                      <Label htmlFor="parking">Secure Parking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="furnished" />
                      <Label htmlFor="furnished">Furnished</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="water" />
                      <Label htmlFor="water">Water Included</Label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Input type="number" defaultValue={1} />
                  </div>
                   <div className="space-y-2">
                    <Label>Max Occupants</Label>
                    <Input type="number" defaultValue={2} />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                 <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-lg font-medium">Upload Photos</p>
                    <p className="text-sm text-muted-foreground">Add at least 3 photos (Room, Bathroom, Outside)</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg relative group">
                    <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover rounded-lg" alt="" />
                    <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                   <div className="aspect-square bg-gray-100 rounded-lg relative group">
                    <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover rounded-lg" alt="" />
                    <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Your listing will be reviewed by our team before going live. This usually takes 2-4 hours.
                  </p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            ) : (
              <Link href="/landlord"><Button variant="ghost">Cancel</Button></Link>
            )}
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {step === 3 ? "Submit Listing" : "Next Step"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
