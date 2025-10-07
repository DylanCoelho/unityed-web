export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold text-[#193255]">UnityED</h1>
      <p className="mt-2 text-gray-700">
        A privacy-first, choice-driven learning game. Runs in-browser on Chromebooks.
      </p>
      <div className="mt-8 flex gap-3">
        <a href="/game" className="px-4 py-2 rounded bg-[#193255] text-white">Play in Browser</a>
        <a href="/students" className="px-4 py-2 rounded border border-[#193255] text-[#193255]">
          Teacher: Students
        </a>
      </div>
    </main>
  );
}
