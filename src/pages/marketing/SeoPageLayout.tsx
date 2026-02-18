import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MarketingShell } from "@/components/layout/MarketingShell";

type SeoPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SeoPageLayout({ title, description, children }: SeoPageLayoutProps) {
  return (
    <MarketingShell>
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <Link to="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
              Back to home
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
          </div>
          <article className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">{children}</article>
        </div>
      </main>
    </MarketingShell>
  );
}
