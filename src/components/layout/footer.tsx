import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Login" },
  { href: "/admin", label: "Admin" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <PageContainer className="flex flex-col gap-5 py-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl space-y-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
                AA
              </span>
              <div>
                <p className="text-base font-semibold tracking-tight text-slate-950">
                  AlgoAssist
                </p>
                <p className="text-sm text-slate-500">Structured CP learning platform</p>
              </div>
            </Link>

            <p className="text-sm leading-6 text-slate-600">
              Learn competitive programming through curated roadmaps, prerequisite guidance,
              trusted resources, and handpicked practice from external platforms.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-950">Navigation</h2>
              <nav aria-label="Footer navigation" className="flex flex-col gap-2 text-sm">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-slate-600 transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-950">Platform</h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Curated learning topics</li>
                <li>Prerequisite-based guidance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 text-sm text-slate-500">
          <p>© 2026 AlgoAssist.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
