import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Menu, User } from "lucide-react"

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-sm">TF</span>
            </div>
            <span className="font-bold text-xl">TrendFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/trending" className="text-muted-foreground hover:text-foreground transition-colors">
              Trending
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-transparent border-none outline-none text-sm flex-1"
            />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
