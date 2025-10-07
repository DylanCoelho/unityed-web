'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Student = { id: string; display_name: string; join_code: string; notes?: string };
type Score = { id: string; value: number; played_at: string; game_version?: string | null };

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();          // ← get the route param here
  const [student, setStudent] = useState<Student | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [sRes, scRes] = await Promise.all([
      fetch(`/api/students/${id}`),
      fetch(`/api/scores?student_id=${id}`)
    ]);
    if (sRes.ok) setStudent(await sRes.json());
    if (scRes.ok) setScores(await scRes.json());
    setLoading(false);
  }

  useEffect(() => { if (id) load(); }, [id]);

  const avg = scores.length
    ? (scores.reduce((a, b) => a + Number(b.value || 0), 0) / scores.length).toFixed(1)
    : "-";

  if (loading) return <main className="p-6">Loading…</main>;
  if (!student) return <main className="p-6">Not found</main>;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <a href="/students" className="text-sm text-blue-700">← Back</a>
      <h1 className="text-2xl font-semibold text-[#193255] mt-2">{student.display_name}</h1>
      <p className="text-gray-600">Join code: <code>{student.join_code}</code></p>
      <p className="text-gray-600">Average score: <strong>{avg}</strong></p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Scores</h2>
      {scores.length === 0 && <p className="text-gray-600">No scores yet.</p>}
      <ul className="divide-y">
        {scores.map(s => (
          <li key={s.id} className="py-2 flex items-center justify-between gap-4">
            <div>
              Score: <strong>{s.value}</strong> {s.game_version ? `· v${s.game_version}` : ""}
              <span className="ml-2 text-sm text-gray-600">
                {new Date(s.played_at).toLocaleString()}
              </span>
            </div>
            {/* Delete button if you added removeScore */}
          </li>
        ))}
      </ul>
    </main>
  );
}
