import { db } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const body = await req.json();
  const join_code = String(body.join_code || "");
  const value = Number(body.value);
  if (!join_code || Number.isNaN(value))
    return new Response("join_code and numeric value required", { status: 400 });

  const snap = await db.collection("students").where("join_code", "==", join_code).limit(1).get();
  if (snap.empty) return new Response("Unknown join_code", { status: 404 });

  const studentId = snap.docs[0].id;
  await db.collection("scores").add({
    student_id: studentId,
    value,
    played_at: new Date().toISOString(),
    game_version: body.game_version || null
  });

  return new Response("accepted", { status: 202 });
}
