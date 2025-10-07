export default function GamePage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="text-2xl font-semibold text-[#193255] mb-4">Play UnityED</h1>
      <div className="w-full aspect-video border rounded overflow-hidden">
        <iframe src="/game-test.html" title="UnityED Game" className="w-full h-full" />
      </div>
    </main>
  );
}
