import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
  formatter?: (value: string | number) => string;
  subtitle?: string;
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  loading = false,
  formatter = (val) => String(val),
  subtitle,
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {loading ? (
          <Skeleton className="h-8 w-40 mt-1" />
        ) : (
          <div>
            <p className="text-2xl font-bold mt-2">{formatter(value)}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}