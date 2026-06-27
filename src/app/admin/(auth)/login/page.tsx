"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-border bg-cream-card p-8 shadow-md"
      >
        <p className="font-display text-xl text-ink">{SITE_NAME} Admin</p>
        <p className="mt-1 text-sm text-ink-soft">Enter the admin password to continue.</p>

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-orange-dark">{error}</p>}

        <Button type="submit" disabled={loading} className="mt-5 w-full">
          {loading ? "Checking..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
