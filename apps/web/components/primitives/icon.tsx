import {
  BrainCircuit,
  Cloud,
  Compass,
  Database,
  Eye,
  GitBranch,
  Languages,
  LineChart,
  MessagesSquare,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps a string icon name (as stored in the DB) to a lucide component.
 * Keep this list small; failing to a sensible default beats crashing the page.
 */
const REGISTRY: Record<string, LucideIcon> = {
  BrainCircuit,
  Cloud,
  Compass,
  Database,
  Eye,
  GitBranch,
  Languages,
  LineChart,
  MessagesSquare,
  Server,
  Sparkles,
  Workflow,
};

export function Icon({
  name,
  className,
  fallback = Sparkles,
}: {
  name?: string | null;
  className?: string;
  fallback?: LucideIcon;
}) {
  const Component = (name && REGISTRY[name]) || fallback;
  return <Component className={className} aria-hidden />;
}
