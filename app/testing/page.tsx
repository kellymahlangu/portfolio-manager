export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="h-screen w-screen flex items-center justify-center bg-red-400 snap-start">
        Section 1
      </section>
      <section className="h-screen w-screen flex items-center justify-center bg-blue-400 snap-start">
        Section 2
      </section>
      <section className="h-screen w-screen flex items-center justify-center bg-green-400 snap-start">
        Section 3
      </section>
    </div>
  );
}
