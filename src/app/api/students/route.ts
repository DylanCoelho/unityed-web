import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await db.collection("students").orderBy("display_name").get();
  const students = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return Response.json(students);
}

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.display_name || "").trim();
  if (!name) return new Response("display_name required", { status: 400 });
  const join_code = Math.random().toString(36).slice(2, 8).toUpperCase();
  const doc = await db.collection("students").add({ display_name: name, join_code, notes: "" });
  const saved = (await doc.get()).data()!;
  return Response.json({ id: doc.id, ...saved }, { status: 201 });
}
