import { Skeleton } from '@/components/ui/skeleton';

const colWidths = ['w-40', 'w-32', 'w-24', 'w-20', 'w-16', 'w-28', 'w-20', 'w-16'];

export function TableSkeleton({ cols, rows = 6 }: { cols: string[]; rows?: number }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-slate-50 border-b">
        <tr>
          {cols.map((h) => (
            <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            {cols.map((_, j) => (
              <td key={j} className="px-5 py-4">
                <Skeleton className={`h-4 ${colWidths[j % colWidths.length]}`} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
