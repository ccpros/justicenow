import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-700 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold text-white/80 tracking-tight">⚖️ JusticeNow Project</h1>
        <p className="text-lg text-muted-foreground text-white/80">
          Empowering pro se litigants and civil rights advocates to build their case, learn the law, and seek justice—on their terms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/case-builder">
          <Button className="bg-blue-500/60 text-lg px-8 py-6" size="lg">
            Start Building Your Case
          </Button>
          </Link>
          <Link href="/learn">
          <Button
            variant="outline"
            className="text-lg px-8 py-6 bg-yellow-400/80 text-black"
            size="lg"
          >
         
            Learn Legal Skills
          </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
