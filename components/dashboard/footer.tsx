import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t px-6 py-4 text-sm lg:flex-row">
      <div>{new Date().getFullYear()} Reiyen Group © All Rights Reserved.</div>
      <div className="flex gap-2">
        <Link
          href="/terms-of-service"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Terms
        </Link>
        <Link
          href="/privacy-policy"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Privacy
        </Link>
        <Link
          href="/cookie-policy"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Cookies
        </Link>
      </div>
    </footer>
  );
}
