"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

interface AuthFormProps {
  initialMode?: 'login' | 'signup';
}

export default function AuthForm({ initialMode }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<'agency' | 'user'>('user')
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSignUp && password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    setIsLoading(true)
    
    try {
      if (isSignUp) {
        await signup(email, password, userType)
        toast.success("Account created successfully!")
      } else {
        await login(email, password)
        toast.success("Logged in successfully!")
      }
      navigate("/dashboard")
    } catch (error: any) {
      toast.error(error.message || `Failed to ${isSignUp ? "create account" : "login"}`)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    
    try {
      const provider = new GoogleAuthProvider()
      
      // Add scopes for additional user information
      provider.addScope('profile')
      provider.addScope('email')
      
      // Force account selection even if already logged in
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      // If signing up, create user profile with selected user type
      if (isSignUp) {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          email: user.email || '',
          photoURL: user.photoURL || '/placeholder.svg',
          handle: `@${user.displayName?.toLowerCase().replace(/\s/g, '') || user.email?.split('@')[0] || 'anonymous'}`,
          userType: userType,
          followers: [],
          following: [],
          followersCount: 0,
          followingCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      toast.success(`${isSignUp ? "Signed up" : "Signed in"} with Google successfully!`)
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      
      // Handle specific auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-in cancelled. Please try again.")
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Pop-up was blocked by your browser. Please enable pop-ups for this site.")
      } else {
        toast.error(error.message || "Failed to sign in with Google")
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-sm text-gray-500">
              {isSignUp ? "Please create your new account" : "Please sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {isSignUp && (
                <div className="grid gap-2 mb-2">
                  <Label htmlFor="userType">Account Type</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={userType === 'user' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setUserType('user')}
                    >
                      User
                      <div className="text-xs opacity-70 mt-1">
                        Search jobs & build profiles
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'agency' ? 'default' : 'outline'} 
                      className="flex-1"
                      onClick={() => setUserType('agency')}
                    >
                      Agency
                      <div className="text-xs opacity-70 mt-1">
                        Post jobs & recruit talent
                      </div>
                    </Button>
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot Password
                  </Link>
                </div>
              )}

              <Button
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 font-medium rounded-lg bg-white"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {isSignUp ? "Sign up with Google" : "Continue with Google"}
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              {isSignUp ? "Already have an Account? " : "Don't have an Account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign-up"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Mobile Mockups */}
      <div className="flex-1 bg-blue-600 hidden md:flex items-center justify-center p-8 relative">
        <div className="relative">
          {/* Decorative circles with dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Outer circle */}
              <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
              {/* Inner circle */}
              <div className="absolute inset-8 border-2 border-blue-300 rounded-full"></div>

              {/* Decorative dots around circles */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute top-8 -right-2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-8 -right-2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-8 -left-2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute top-8 -left-2 w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* Center Mobile Phone */}
          <div className="relative z-10 mx-auto">
            <div className="w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>

                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-8 pb-4 text-xs font-medium">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="w-6 h-3 border border-black rounded-sm">
                      <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
                    </div>
                  </div>
                </div>

                {/* Mobile form content */}
                <div className="px-6 space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">Hey,</h2>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {isSignUp ? "Create Account" : "Welcome Back"}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Email</label>
                      <div className="h-10 border border-gray-200 rounded-lg flex items-center px-3">
                        <span className="text-xs text-gray-400">your@email.com</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Password</label>
                      <div className="h-10 border border-gray-200 rounded-lg flex items-center px-3">
                        <span className="text-xs text-gray-400">••••••••••••</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-blue-600">Forgot Password</span>
                    </div>

                    <button className="w-full h-10 bg-blue-600 text-white text-sm font-medium rounded-lg">
                      {isSignUp ? "Create Account" : "Sign In"}
                    </button>

                    <div className="text-center text-xs text-gray-500">or</div>

                    <button className="w-full h-10 border border-gray-200 rounded-lg flex items-center justify-center space-x-2 text-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <div className="text-center text-xs text-gray-600">
                      {"Don't have an Account? "}
                      <span className="text-blue-600">Sign-up</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 