"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  title: string;
  value: string | number;
  loading: boolean;
  formatter?: (value: string | number) => string;
}

export function StatsCard({ title, value, loading, formatter }: StatsCardProps) {
  const displayValue = formatter ? formatter(value) : value;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {loading ? (
          <Skeleton className="h-8 w-40 mt-1" />
        ) : (
          <p className="text-2xl font-bold">{displayValue}</p>
        )}
      </CardContent>
    </Card>
  );
}