import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container-x relative text-center">
        <p className="font-mono text-sm text-cyan-300">404 · ROW NOT FOUND</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-6xl">This record doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          The page you&apos;re looking for was never loaded — or has been archived to cold storage.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
