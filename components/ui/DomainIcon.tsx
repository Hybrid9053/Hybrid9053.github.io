import { Brain, Code, Compass, Server, Shield } from "lucide-react";

const map = { code: Code, brain: Brain, shield: Shield, server: Server, compass: Compass } as const;

export function DomainIcon({ name, size = 18 }: { name: keyof typeof map; size?: number }) {
  const Icon = map[name];
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
      <Icon size={size} aria-hidden="true" />
    </span>
  );
}
