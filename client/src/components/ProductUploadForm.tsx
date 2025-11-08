import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useState } from "react";

interface ProductUploadFormProps {
  onSubmit?: (data: any) => void;
}

export default function ProductUploadForm({ onSubmit }: ProductUploadFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    features: ""
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-title">Product Title</Label>
          <Input
            id="product-title"
            placeholder="Modern Dashboard Template"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            data-testid="input-product-title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
            <SelectTrigger data-testid="select-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-templates">Web Templates</SelectItem>
              <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
              <SelectItem value="ai-agents">AI Agents</SelectItem>
              <SelectItem value="desktop-software">Desktop Software</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your product..."
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            data-testid="input-description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Key Features (one per line)</Label>
          <Textarea
            id="features"
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            rows={4}
            value={formData.features}
            onChange={(e) => setFormData({...formData, features: e.target.value})}
            data-testid="input-features"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            placeholder="49.99"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            data-testid="input-price"
          />
        </div>

        <div className="space-y-2">
          <Label>Product Images</Label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG up to 10MB
            </p>
          </div>
        </div>

        <Button 
          className="w-full" 
          size="lg"
          onClick={handleSubmit}
          data-testid="button-upload-product"
        >
          Upload Product
        </Button>
      </CardContent>
    </Card>
  );
}
