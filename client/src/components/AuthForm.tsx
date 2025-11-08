import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type UserType = "user" | "developer" | "company";

interface AuthFormProps {
  onLogin?: (email: string, password: string, userType: UserType) => void;
  onSignup?: (data: any, userType: UserType) => void;
  onForgotPassword?: (email: string) => void;
}

export default function AuthForm({ onLogin, onSignup, onForgotPassword }: AuthFormProps) {
  const [userType, setUserType] = useState<UserType>("user");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const handleLogin = () => {
    if (onLogin) {
      onLogin(loginEmail, loginPassword, userType);
    }
  };

  const handleSignup = () => {
    if (onSignup) {
      onSignup(signupData, userType);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold text-lg">
              OWS
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">Welcome to OWSCORP</CardTitle>
            <CardDescription>Sign in or create your account</CardDescription>
          </div>

          <Select value={userType} onValueChange={(value) => setUserType(value as UserType)}>
            <SelectTrigger data-testid="select-user-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" data-testid="option-user">Customer</SelectItem>
              <SelectItem value="developer" data-testid="option-developer">Developer</SelectItem>
              <SelectItem value="company" data-testid="option-company">Company</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
              <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  data-testid="input-login-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  data-testid="input-login-password"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleLogin}
                data-testid="button-login-submit"
              >
                Login
              </Button>
              <button
                className="text-sm text-primary hover:underline w-full text-center"
                onClick={() => onForgotPassword?.(loginEmail)}
                data-testid="button-forgot-password"
              >
                Forgot password?
              </button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  placeholder="John Doe"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  data-testid="input-signup-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  data-testid="input-signup-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  data-testid="input-signup-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                  data-testid="input-signup-confirm"
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleSignup}
                data-testid="button-signup-submit"
              >
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
