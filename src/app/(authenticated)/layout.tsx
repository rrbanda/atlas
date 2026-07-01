import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/gallery", label: "Gallery" },
  { href: "/agents", label: "Agents" },
  { href: "/pilot", label: "Pilot" },
  { href: "/business-case", label: "Business Case" },
];

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-atlas-border bg-atlas-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-block h-4 w-4 rotate-45 bg-atlas-accent" />
            <span className="text-base font-bold tracking-wide text-atlas-text">
              ATLAS
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-atlas-text-muted transition-colors hover:text-atlas-text"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="rounded-md px-3 py-1.5 text-sm text-atlas-text-muted transition-colors hover:text-atlas-text"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pt-20 pb-16">{children}</main>
    </>
  );
}
