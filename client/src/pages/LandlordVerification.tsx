import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Upload, Check, ChevronRight, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function LandlordVerification() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      toast({
        title: "Verification Submitted",
        description: "We will review your documents within 24 hours.",
      });
      // Redirect or show success
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">Get Verified</h1>
          <p className="text-muted-foreground">Verified landlords get trusted more and rent faster.</p>
        </div>

        <div className="mb-8">
           <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
             <span>Identity</span>
             <span>Address</span>
             <span>Review</span>
           </div>
           <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>Upload your SA ID or Passport to verify who you are.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input type="text" id="id-number" placeholder="Enter your 13-digit ID" />
                </div>
                
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Upload ID Document</p>
                    <p className="text-xs text-muted-foreground">PDF or JPG up to 5MB</p>
                  </div>
                </div>

                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Take a Selfie</p>
                    <p className="text-xs text-muted-foreground">To match with your ID photo</p>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Proof of Residence</CardTitle>
                <CardDescription>Verify that you live at or own the property.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="bg-blue-50 p-4 rounded-md flex gap-3 text-blue-800 text-sm">
                   <AlertCircle className="w-5 h-5 flex-shrink-0" />
                   <p>This helps us ensure safety for renters. Your address details are kept private.</p>
                 </div>
                 
                 <div className="grid w-full gap-1.5">
                  <Label htmlFor="address">Street Address</Label>
                  <Input type="text" id="address" placeholder="e.g. 1234 Section B, Khayelitsha" />
                </div>

                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Upload Utility Bill / Letter</p>
                    <p className="text-xs text-muted-foreground">Not older than 3 months</p>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Confirm your details before submitting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Identity Document</p>
                        <p className="text-xs text-muted-foreground">Uploaded successfully</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Selfie</p>
                        <p className="text-xs text-muted-foreground">Uploaded successfully</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Proof of Address</p>
                        <p className="text-xs text-muted-foreground">Uploaded successfully</p>
                      </div>
                   </div>
                 </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
            ) : (
              <Link href="/landlord"><Button variant="ghost">Cancel</Button></Link>
            )}
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {step === 3 ? "Submit Verification" : "Next Step"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
