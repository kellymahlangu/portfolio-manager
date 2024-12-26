import Loader from "@/components/common/Loader";

export default function Loading() {
  return (
    <main>
      <section
        className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
        key={2}
        id="loader"
      >
        <Loader />
      </section>
    </main>
  );
}
