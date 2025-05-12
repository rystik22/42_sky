"use client";
import { useState } from "react";
import { ArrowRight, Lock, Mail, User, ExternalLink } from "lucide-react";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "42">("42");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Email login logic would go here
    setTimeout(() => {
      setIsLoading(false);
      alert("Email login not implemented in this demo");
    }, 1500);
  };

  const handleFortyTwoLogin = () => {
    setIsLoading(true);
    // Use environment variable for client ID instead of hardcoding
    window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_42_UID}&redirect_uri=https%3A%2F%2F42sky.vercel.app%2Fauth%2Fcallback&response_type=code`;
    
    // Reset loading state if the redirect is blocked
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden w-full max-w-md mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

      {/* Login header */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl font-light">
          Welcome{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">back</span>
        </h2>
        <p className="text-white/60 text-sm mt-2">Sign in to access your account and events</p>
      </div>

      {/* Login method toggle */}
      <div className="flex rounded-lg border border-white/10 mb-6 p-1 relative z-10">
        <button
          className={`flex-1 py-2 text-sm rounded-md transition-colors ${loginMethod === "42" ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"}`}
          onClick={() => setLoginMethod("42")}
        >
          <User className="h-4 w-4 inline-block mr-2" />
          42 Intra
        </button>
        <button
          className={`flex-1 py-2 text-sm rounded-md transition-colors ${loginMethod === "email" ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"}`}
          onClick={() => setLoginMethod("email")}
        >
          <Mail className="h-4 w-4 inline-block mr-2" />
          Email
        </button>
      </div>

      {/* Email login form */}
      {loginMethod === "email" && (
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-4">
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-black/30 border border-white/10 rounded-lg px-10 py-3 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/40"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black/30 border border-white/10 rounded-lg px-10 py-3 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/40"
                required
              />
            </div>
            <div className="flex justify-end mt-2">
              <button type="button" className="text-xs text-white/50 hover:text-white/80">
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black rounded-lg py-3 font-medium text-sm hover:bg-gray-100 transition-colors flex items-center justify-center group"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}

      {/* 42 Login */}
      {loginMethod === "42" && (
        <div className="relative z-10">
          <div className="bg-black/30 border border-white/10 rounded-lg p-6 mb-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <div className="font-bold text-xl">42</div>
            </div>
            <p className="text-sm text-white/70 mb-2">Sign in using your 42 Intra credentials</p>
            <p className="text-xs text-white/50">You'll be redirected to the 42 authentication page</p>
          </div>

          <button
            onClick={handleFortyTwoLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center group"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Continue with 42{" "}
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Sign up link */}
      <div className="mt-8 text-center text-sm text-white/50 relative z-10">
        Don't have an account? <button className="text-white hover:text-white/80">Sign up</button>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  )
}