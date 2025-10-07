'use client';
import { useState } from "react";

export default function SubmitScore() {
  const [join_code, setCode] = useState("");
  const [value, setValue] = useState(10);
  const [msg, setMsg] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/ingest/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ join_code, value, game_version: "demo" })
    });
    setMsg(res.ok ? "✅ sent" : "❌ " + (await res.text()));
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold text-[#193255] mb-4">Submit Score (Dev)</h1>
      <form onSubmit={send} className="grid gap-3">
        <input className="border px-3 py-2 rounded" placeholder="Join code (e.g. AB12CD)"
               value={join_code} onChange={e=>setCode(e.target.value.toUpperCase())} />
        <input className="border px-3 py-2 rounded" type="number"
               value={value} onChange={e=>setValue(Number(e.target.value))} />
        <button className="px-4 py-2 rounded bg-[#193255] text-white">Send</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </main>
  );
}
