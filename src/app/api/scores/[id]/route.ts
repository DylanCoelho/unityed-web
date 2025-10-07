import { db } from "@/lib/firebaseAdmin";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const doc = db.collection("scores").doc(id);
  const snap = await doc.get();
  if (!snap.exists) return new Response("Not found", { status: 404 });

  await doc.delete();
  return new Response(null, { status: 204 });
}
