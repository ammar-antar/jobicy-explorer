import { Container } from "./Container";

export function PageFallback() {
  return (
    <Container className="py-12">
      <div className="h-7 w-48 bg-border/50 rounded animate-pulse mb-3" />
      <div className="h-4 w-32 bg-border/40 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-surface border border-border rounded-card animate-pulse"
          />
        ))}
      </div>
    </Container>
  );
}