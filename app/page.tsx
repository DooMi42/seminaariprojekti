import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Seminaarityö: Yhteydenottolomake
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Aloita rakentamalla yhteydenottolomake ja käytä alla olevaa linkkiä
          siirtyäksesi lomakesivulle.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800"
        >
          Siirry yhteydenottolomakkeelle
        </Link>
      </div>
    </main>
  );
}
