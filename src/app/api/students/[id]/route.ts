import { db } from "@/lib/firebaseAdmin";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.collection("students").doc(params.id).get();
  if (!doc.exists) return new Response("Not found", { status: 404 });
  return Response.json({ id: doc.id, ...doc.data() });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updates: any = {};
  if (typeof body.display_name === "string") updates.display_name = body.display_name;
  if (typeof body.notes === "string") updates.notes = body.notes;
  if (body.rotate_join_code) updates.join_code = Math.random().toString(36).slice(2,8).toUpperCase();
  await db.collection("students").doc(params.id).set(updates, { merge: true });
  const doc = await db.collection("students").doc(params.id).get();
  return Response.json({ id: doc.id, ...doc.data() });
}
