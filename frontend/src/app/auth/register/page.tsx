"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Lock, User, Sparkles, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("framedrop_token", data.token);
      router.push("/shop");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64.8px)] w-full overflow-hidden bg-white selection:bg-black selection:text-white flex-row-reverse">
      {/* Subtle Background Orbs (Light version) */}
      <div className="aurora-orb aurora-orb-1 opacity-5 bg-black" />
      <div className="aurora-orb aurora-orb-2 opacity-5 bg-gray-400" />
      <div className="aurora-orb aurora-orb-3 opacity-5 bg-gray-200" />

      {/* Decorative Left Panel (Light version) */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-gray-50 border-l border-border/50">
        {/* Mesh Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center h-full px-20">
          {/* Logo Branding */}
          <div className="flex items-center gap-4 mb-20 group">
            <div className="w-14 h-14 bg-black flex items-center justify-center rounded-none rotate-45 transform group-hover:rotate-0 transition-transform duration-500">
               <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
                 <span className="text-white font-black text-2xl">F</span>
               </div>
            </div>
            <span className="text-black text-3xl font-black tracking-[0.3em] uppercase">FrameDrop.</span>
          </div>

          <h1 className="text-black text-6xl font-black leading-[0.9] tracking-tighter mb-8 decoration-black/20 underline-offset-8">
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/40">
              COLLECTIVE.
            </span>
          </h1>
          <p className="text-black/40 text-lg leading-relaxed max-w-md mb-12 font-medium">
            Join the most exclusive community for minimalist art lovers. Unlock museum-grade personalization and early drop access.
          </p>

          {/* Feature Chips */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Exclusive Drops", icon: Sparkles },
              { label: "Custom Studio", icon: Zap },
              { label: "Curated Feed", icon: Shield },
              { label: "Global Circle", icon: Globe }
            ].map((f) => (
              <span
                key={f.label}
                className="px-4 py-2 rounded-none text-[10px] font-black text-black/80 uppercase tracking-widest flex items-center gap-2"
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <f.icon className="h-3 w-3" />
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 px-20 py-8 border-t border-border/50 bg-white/40 backdrop-blur-sm">
          <p className="text-black/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 FRAMEDROP STUDIOS · PRESERVING THE ART OF LESS.
          </p>
        </div>
      </div>      {/* Register Panel */}
      <div className="flex flex-col items-center justify-center w-full lg:w-[600px] flex-shrink-0 px-6 py-12 relative z-10 overflow-y-auto no-scrollbar">
        <div className="w-full max-w-sm p-8 border border-border/50 shadow-2xl relative overflow-hidden group bg-white">
          {/* Top Glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

          {/* Heading */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-black text-2xl font-black uppercase tracking-tighter mb-1">Join</h2>
            <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">The Collective</p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2 px-4 py-3 bg-red-500/5 border border-red-500/10 text-red-500">
              <Lock className="h-3 w-3 mt-0.5 shrink-0" />
              <p className="text-[9px] font-bold uppercase tracking-wider leading-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em] block">First Name</label>
                <div className="relative group/input">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/20 transition-colors group-focus-within/input:text-black" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-black/[0.02] border border-black/5 text-black focus:border-black/20 focus:ring-1 focus:ring-black/5 transition-all outline-none pl-11 pr-4 h-11 text-xs font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em] block">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full bg-black/[0.02] border border-black/5 text-black focus:border-black/20 focus:ring-1 focus:ring-black/5 transition-all outline-none px-4 h-11 text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em] block">Email Address</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/20 transition-colors group-focus-within/input:text-black" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-black/[0.02] border border-black/5 text-black focus:border-black/20 focus:ring-1 focus:ring-black/5 transition-all outline-none pl-11 pr-4 h-11 text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em] block">Security Key</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20 transition-colors group-focus-within/input:text-black" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/[0.02] border border-black/5 text-black focus:border-black/20 focus:ring-1 focus:ring-black/5 transition-all outline-none pl-11 pr-11 h-11 text-xs font-medium tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-black text-white hover:bg-black/90 font-black uppercase tracking-[0.15em] text-[10px] group flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 mt-4"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" /></>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50 flex flex-col gap-3 text-center">
             <Link href="/auth/login" className="text-[9px] text-black/40 hover:text-black uppercase font-black tracking-widest transition-colors decoration-black/20 underline underline-offset-4">
                Login
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
