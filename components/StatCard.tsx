"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendResult } from "./CheckTrend";

interface StatsCardProps {
  title: string;
  value: string | number;
  loading?: boolean;
  icon?: LucideIcon;
  trend?: TrendResult;
  iconColor?: string;
  formatter?: (value: string | number) => string;
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  loading = false,
  icon: Icon,
  trend,
  iconColor = "text-primary",
  formatter,
  subtitle,
}: StatsCardProps) {
  const displayValue = formatter ? formatter(value) : value;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {Icon && (
            <div
              className={cn(
                "p-2 rounded-lg",
                iconColor.replace("text-", "bg-") + "/10"
              )}
            >
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
          )}
          {trend && trend.direction !== "none" && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                trend.direction === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {loading ? (
            <Skeleton className="h-8 w-40 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-2">{displayValue}</p>
          )}
        </div>

        {(trend?.timespan || subtitle) && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              {trend?.timespan || subtitle}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
