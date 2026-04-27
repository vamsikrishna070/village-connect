import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PublicLayout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="VillageConnect Logo" className="size-8 rounded-md shadow-sm" />
            <span className="text-xl font-bold text-foreground">VillageConnect</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t py-8 mt-auto bg-muted/30">
        <div className="w-full px-4 text-center text-sm text-muted-foreground md:px-6">
          &copy; {new Date().getFullYear()} VillageConnect. Serving our communities.
        </div>
      </footer>
    </div>
  );
}
