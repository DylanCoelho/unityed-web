'use client';
import { useEffect, useState } from "react";
import Link from "next/link"; 
type Student = { id: string; display_name: string; join_code: string; notes?: string };

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [q, setQ] = useState("");
  const [newName, setNewName] = useState("");

  async function load() {
    const res = await fetch("/api/students");
    const all = await res.json();
    setStudents(all);
  }
  useEffect(() => { load(); }, []);

  const filtered = students.filter(s => s.display_name.toLowerCase().includes(q.toLowerCase()));

  async function createStudent() {
    if (!newName.trim()) return;
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ display_name: newName })
    });
    setNewName("");
    load();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-[#193255] mb-4">Students</h1>

      <div className="flex gap-2 mb-4">
        <input className="border px-2 py-1 rounded w-64" placeholder="Search by name" value={q} onChange={(e)=>setQ(e.target.value)} />
        <input className="border px-2 py-1 rounded w-64" placeholder="New student name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
        <button onClick={createStudent} className="px-3 py-1 rounded bg-[#193255] text-white">Add</button>
      </div>

      <ul className="divide-y">
        {filtered.map(s => (
          <li key={s.id} className="py-3">
  <div className="font-medium">{s.display_name}</div>
  <div className="text-sm text-gray-600">
    Join code: <code>{s.join_code}</code>
  </div>

  <div className="mt-2 flex gap-3">
    <Link href={`/students/${s.id}`} className="text-blue-700 underline">
      View
    </Link>

    <details>
      <summary className="cursor-pointer text-blue-700">Edit</summary>
      <Editor student={s} onSaved={load} />
    </details>
  </div>
</li>

        ))}
      </ul>
    </main>
  );
}

function Editor({ student, onSaved }: { student: Student; onSaved: () => void }) {
  const [name, setName] = useState(student.display_name);
  const [notes, setNotes] = useState(student.notes || "");
  const [rotate, setRotate] = useState(false);

  async function save() {
    await fetch(`/api/students/${student.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ display_name: name, notes, rotate_join_code: rotate })
    });
    setRotate(false);
    onSaved();
  }

  return (
    <div className="mt-2 grid gap-2 max-w-md">
      <input className="border px-2 py-1 rounded" value={name} onChange={e=>setName(e.target.value)} />
      <textarea className="border px-2 py-1 rounded" value={notes} onChange={e=>setNotes(e.target.value)} />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={rotate} onChange={e=>setRotate(e.target.checked)} />
        Rotate join code
      </label>
      <button onClick={save} className="px-3 py-1 rounded bg-green-600 text-white">Save</button>
    </div>
  );
}
