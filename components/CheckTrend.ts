"use client";

import { TrendData, TrendResult } from "@/types/types";



export function calculateTrend({ currentValue, previousValue, timespan }: TrendData): TrendResult {
  if (!previousValue || previousValue === 0) {
    return {
      value: 0,
      timespan: `No previous ${timespan} data`,
      direction: 'none'
    };
  }

  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
  
  const timespanText = {
    day: 'since yesterday',
    week: 'from last week',
    month: 'from last month',
    year: 'from last year'
  };

  return {
    value: Math.round(percentageChange * 10) / 10, // Round to 1 decimal place
    timespan: `${percentageChange >= 0 ? '+' : ''}${Math.round(percentageChange * 10) / 10}% ${timespanText[timespan]}`,
    direction: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'none'
  };
}

// Helper function to get previous period's data
export function getPreviousPeriodValue(data: any[], dateKey: string, valueKey: string, timespan: 'day' | 'week' | 'month' | 'year'): number {
  const now = new Date();
  let previousDate = new Date();

  switch (timespan) {
    case 'day':
      previousDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      previousDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      previousDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      previousDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  const previousPeriodData = data.filter(item => {
    const itemDate = new Date(item[dateKey]);
    return itemDate >= previousDate && itemDate < now;
  });

  return previousPeriodData.reduce((sum, item) => sum + (Number(item[valueKey]) || 0), 0);
}