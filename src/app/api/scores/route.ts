import { db } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const student_id = searchParams.get("student_id");
  if (!student_id) return new Response("student_id required", { status: 400 });

  const snap = await db.collection("scores").where("student_id", "==", student_id).get();
  const scores = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));

  // newest first
  scores.sort(
    (a, b) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
  );

  return Response.json(scores);
}
