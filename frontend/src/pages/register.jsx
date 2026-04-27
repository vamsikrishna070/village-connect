import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Register() {
  const { login: setAuthToken } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("villager");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!email.includes("@")) newErrors.email = "Please enter a valid email address";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const response = await registerUser({ name, email, password, role });
      setAuthToken(response.data.token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <Card className="w-full max-w-md shadow-md border-border/50">
          <CardHeader className="space-y-3 text-center pb-8">
            <CardTitle className="text-4xl font-bold">Join VillageConnect</CardTitle>
            <CardDescription className="text-lg">Create an account to access community services</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" className="h-12 text-base" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-medium">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="h-12 text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" className="h-12 text-base" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <div className="space-y-4 pt-2">
                <Label className="text-base font-medium">I am a...</Label>
                <RadioGroup defaultValue={role} onValueChange={(val) => setRole(val)} className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="villager" id="role-villager" className="size-5" />
                    <Label htmlFor="role-villager" className="flex-1 cursor-pointer text-base font-medium">
                      Villager / Resident
                      <span className="block text-sm text-muted-foreground font-normal mt-1">I want to access services and information.</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="provider" id="role-provider" className="size-5" />
                    <Label htmlFor="role-provider" className="flex-1 cursor-pointer text-base font-medium">
                      Service Provider
                      <span className="block text-sm text-muted-foreground font-normal mt-1">I want to post jobs and offer services.</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="text-center text-base text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PublicLayout>
  );
}
