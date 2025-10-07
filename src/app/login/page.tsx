'use client';
import { useState } from "react";

export default function Login() {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode: code })
    });
    if (res.ok) location.href = "/students";
    else setErr("Wrong passcode");
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold text-[#193255] mb-4">Teacher Login</h1>
      <form onSubmit={submit} className="grid gap-3">
        <input className="border px-3 py-2 rounded" type="password" placeholder="Passcode"
               value={code} onChange={e=>setCode(e.target.value)} />
        <button className="px-4 py-2 rounded bg-[#193255] text-white">Sign in</button>
        {err && <p className="text-red-600">{err}</p>}
      </form>
    </main>
  );
}
