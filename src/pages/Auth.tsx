
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form setup for login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form setup for registration
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login form submission
  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your login API here
      console.log("Login submitted:", values);
      
      toast({
        title: "Login successful",
        description: "Welcome back to SnapMart!",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle registration form submission
  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your registration API here
      console.log("Registration submitted:", values);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="bg-glass border-border">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-display text-2xl">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription>
              {mode === "login" 
                ? "Enter your credentials to access your account" 
                : "Enter your information to create an account"}
            </CardDescription>
            
            <Tabs 
              value={mode} 
              onValueChange={(v) => setMode(v as "login" | "register")} 
              className="w-full mt-3"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="px-6 py-3">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="Enter your email" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Enter your password" 
                                  className="pl-10" 
                                  {...field} 
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-right">
                        <Button variant="link" className="text-sm h-auto p-0" onClick={() => navigate("/forgot-password")}>
                          Forgot password?
                        </Button>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="Enter your full name" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="Enter your email" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Create a password" 
                                  className="pl-10" 
                                  {...field} 
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type={showConfirmPassword ? "text" : "password"} 
                                  placeholder="Confirm your password" 
                                  className="pl-10" 
                                  {...field} 
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 px-6 py-4 border-t border-border">
            <div className="relative w-full">
              <Separator className="absolute top-1/2 w-full" />
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" onClick={() => console.log("Google login")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => console.log("Apple login")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M16.6915026,12.4744748 C16.7031573,12.0640387 16.8365354,11.665102 17.0669906,11.316898 C17.4167944,10.777516 18.0617884,10.4149497 18.6299048,10.4537445 C19.0805923,10.4819758 19.5024217,10.6775048 19.8114748,10.9774324 C20.1205279,11.2773601 20.3218657,11.6755419 20.3870053,12.104261 C20.4155624,12.3302412 20.4095359,12.5581849 20.3790719,12.7839878 C20.3131419,13.2822753 20.0677297,13.7468732 19.6988741,14.0921724 C19.557975,14.2079199 19.4014083,14.3032297 19.2347983,14.3747625 C18.9408364,14.4942792 18.6276989,14.5626369 18.3096205,14.5784366 C17.9585347,14.6207301 17.6039296,14.5669868 17.2737808,14.4212454 C16.9436321,14.2755038 16.6470843,14.0437298 16.4064991,13.7521487 C16.2318651,13.5179719 16.0950792,13.2524367 16.0008913,12.9711779 C15.9115512,12.6900332 15.8771916,12.3979558 15.8990801,12.1074573 C15.9325669,11.7680103 16.0314709,11.4397805 16.1909967,11.1424494 C16.3505225,10.8451184 16.5673971,10.5842916 16.8270548,10.3759366 C17.3126385,9.9832848 17.9136562,9.8162581 18.5132863,9.9038949 C19.1129164,9.9915317 19.6611334,10.3342101 20.0219724,10.8566253 C20.1349054,11.0372501 20.2203125,11.2325793 20.2757655,11.4365175 C20.36581,11.7648576 20.3757577,12.1036411 20.3053638,12.4368211 C20.2571959,12.7181981 20.1522652,12.9894617 20.004669,13.2398525 C19.6983367,13.7238817 19.2256631,14.0622769 18.6850804,14.1901692 C18.1445005,14.3180615 17.5778771,14.2260572 17.1098244,13.9356957 C16.9523904,13.8382213 16.8087578,13.7189735 16.6837267,13.5811734 C16.4513357,13.3433518 16.2653287,13.0624466 16.1352542,12.7529531 L16.6915026,12.4744748 Z M10.3127883,7.9368551 C10.3174935,8.31544361 10.2548244,8.69217889 10.1276238,9.05125603 C9.95824249,9.4879605 9.69008754,9.87272904 9.34565644,10.1754538 C9.00122534,10.4781786 8.58916516,10.6924369 8.14399371,10.8019438 C7.69882227,10.9114507 7.23346827,10.9133157 6.78752604,10.8073969 C6.34158381,10.7014781 5.92804793,10.4905374 5.58138758,10.1904659 C5.23472723,9.89039448 4.96372855,9.50813126 4.79096909,9.07331431 C4.61820964,8.63849736 4.55259373,8.16289102 4.59723946,7.69079079 C4.64188519,7.21869057 4.79561162,6.76425018 5.04493532,6.36571362 C5.41505644,5.79230447 5.96945422,5.36355491 6.6152487,5.1541426 C7.2610418,4.94472991 7.95777364,4.95670272 8.59450603,5.18779356 C9.00390437,5.33908136 9.37486696,5.57582291 9.67947821,5.88177594 C9.98408947,6.18772898 10.2143007,6.55571878 10.3476709,6.95899952 C10.4810411,7.36228027 10.5142619,7.78968723 10.4447193,8.21018703 L10.3127883,7.9368551 Z M20.5383784,7.17893206 C20.5383784,8.10200127 20.401031,9.018978 20.1325062,9.90035421 C19.7588193,11.0926652 19.1030729,12.1926883 18.2085542,13.1075505 C17.4252736,13.8946715 16.4992681,14.542893 15.4758594,15.0129108 L14.7892595,15.2913891 C14.7892595,15.2913891 14.5107812,13.9577018 14.5107812,12.9002421 C14.5107812,11.8427824 14.8849879,11.0277611 15.5156207,10.3971284 C16.1462534,9.76649569 17.3013063,9.11300026 18.1441551,9.11300026 C19.2294434,9.11300026 20.0444646,9.48720698 20.0444646,9.48720698 C20.0444646,9.48720698 20.5383784,8.39905602 20.5383784,7.17893206 Z M8.5,16 C8.5,16 13.7848974,13.7737771 14.0355354,13.0196249 C14.2861734,12.2654727 14.5368114,11.0174393 12.8065423,11.0174393 C11.0762732,11.0174393 7.0077633,12.2654727 7.0077633,13.7737771 C7.0077633,15.2820816 6.3814297,19.2526953 6.3814297,19.9788998 C6.3814297,20.7051043 9.37839908,19.9788998 10.505953,19.9788998 C11.6335069,19.9788998 12.5828232,16.0093899 12.5828232,16.0093899 L8.5,16 Z M12.9511673,7.25443177 C12.9918451,7.82186938 12.825346,8.37987475 12.4799671,8.83356042 C12.1345883,9.28724608 11.6317059,9.60901333 11.0711959,9.73897148 C10.5106832,9.86892816 9.92591106,9.79916655 9.41641732,9.54083611 C8.9069236,9.28250569 8.49996507,8.85338307 8.26213741,8.33351889 C8.02430976,7.81365474 7.97290597,7.22939997 8.11683114,6.67638 C8.2607563,6.12336003 8.59051346,5.63363724 9.05325886,5.29146386 C9.51600393,4.9493191 10.0809554,4.7777973 10.6489182,4.80448089 C11.0617457,4.82005245 11.4654349,4.93130464 11.8276871,5.12842113 C12.1899387,5.32553712 12.5014606,5.60359212 12.7377728,5.94023949 C12.9740854,6.27688687 13.1296942,6.66473051 13.1930558,7.07318699 L12.9511673,7.25443177 Z"
                    fill="currentColor"
                  />
                </svg>
                Apple
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <Button variant="link" className="h-auto p-0 text-sm" onClick={() => console.log("terms")}>
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="h-auto p-0 text-sm" onClick={() => console.log("privacy")}>
                Privacy Policy
              </Button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
