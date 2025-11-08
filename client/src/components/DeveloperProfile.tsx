import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useState } from "react";

interface DeveloperProfileProps {
  initialData?: any;
  onSave?: (data: any) => void;
}

export default function DeveloperProfile({ initialData, onSave }: DeveloperProfileProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    mobile: initialData?.mobile || "",
    address: initialData?.address || "",
    panNumber: initialData?.panNumber || "",
    aadharNumber: initialData?.aadharNumber || "",
    qualification: initialData?.qualification || "",
    description: initialData?.description || "",
    companyName: initialData?.companyName || ""
  });

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl">
                {formData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() || "DE"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                data-testid="input-mobile"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                data-testid="input-qualification"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address (as per Aadhar)</Label>
            <Textarea
              id="address"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              data-testid="input-address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                value={formData.panNumber}
                onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
                data-testid="input-pan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                value={formData.aadharNumber}
                onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                data-testid="input-aadhar"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name (Optional)</Label>
            <Input
              id="company"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              data-testid="input-company"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About / Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Tell us about yourself and your expertise..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              data-testid="input-description"
            />
          </div>
        </CardContent>
      </Card>

      <Button 
        size="lg" 
        className="w-full md:w-auto"
        onClick={handleSave}
        data-testid="button-save-profile"
      >
        Save Profile
      </Button>
    </div>
  );
}
