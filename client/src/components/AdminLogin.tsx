import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useState } from "react";

interface AdminLoginProps {
  onLogin?: (username: string, password: string, securityCode: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleLogin = () => {
    if (onLogin) {
      onLogin(username, password, securityCode);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500/5 via-background to-orange-500/5">
      <Card className="w-full max-w-md shadow-2xl border-destructive/20">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-destructive to-orange-600 flex items-center justify-center text-destructive-foreground shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">Admin Panel Access</CardTitle>
            <CardDescription>Authorized personnel only</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-username">Admin Username</Label>
            <Input
              id="admin-username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="input-admin-username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-admin-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="security-code">Security Code</Label>
            <Input
              id="security-code"
              type="password"
              placeholder="6-digit code"
              maxLength={6}
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              data-testid="input-security-code"
            />
          </div>
          <Button 
            className="w-full bg-destructive hover:bg-destructive/90"
            onClick={handleLogin}
            data-testid="button-admin-login"
          >
            <Shield className="mr-2 h-4 w-4" />
            Admin Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
