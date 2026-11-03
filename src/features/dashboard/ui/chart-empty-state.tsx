import { ChartNoAxesCombined } from 'lucide-react';

export function ChartEmptyState() {
  return (
    <div className="border-border bg-muted/30 flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 text-center">
      <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
        <ChartNoAxesCombined size={19} />
      </span>
      <p className="text-muted-foreground max-w-64 text-sm">За выбранный период пока нет данных</p>
    </div>
  );
}
