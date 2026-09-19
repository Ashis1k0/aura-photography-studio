import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 sm:px-8 py-32 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium block">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal tracking-tight">
          Lost in the Shadows
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed">
          The story or photograph you were looking for could not be found. It may have been archived or relocated.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return to Atelier Home
          </Button>
          <Button href="/portfolio" variant="outline" size="md">
            Explore Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}
