import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { passcode } = await req.json();
  if (passcode !== process.env.TEACHER_PASSCODE) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("teacher", "1", { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
