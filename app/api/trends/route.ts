import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Period, TrendData, TrendResult } from '@/types/types';

function calculateServerTrend({ currentValue, previousValue, timespan }: TrendData): TrendResult {
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
    value: Math.round(percentageChange * 10) / 10,
    timespan: `${percentageChange >= 0 ? '+' : ''}${Math.round(percentageChange * 10) / 10}% ${timespanText[timespan]}`,
    direction: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'none'
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') || 'month') as Period;
    
    if (!['day', 'week', 'month', 'year'].includes(period)) {
      return NextResponse.json(
        { error: 'Invalid period parameter' },
        { status: 400 }
      );
    }

    const now = new Date();
    const previousDate = new Date(now);

    switch (period) {
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

    // Get sales statistics
    const currentPeriodStats = await db.sales.aggregate({
      _sum: {
        price: true,
        quantity: true,
      },
      where: {
        date: {
          lte: now,
          gte: previousDate,
        },
      },
    });

    if (!currentPeriodStats || !currentPeriodStats._sum) {
      throw new Error('Failed to fetch current period stats');
    }

    const previousPeriodStart = new Date(previousDate);
    const daysInPeriod = {
      day: 1,
      week: 7,
      month: 30,
      year: 365,
    }[period];
    
    previousPeriodStart.setDate(previousPeriodStart.getDate() - daysInPeriod);

    const previousPeriodStats = await db.sales.aggregate({
      _sum: {
        price: true,
        quantity: true,
      },
      where: {
        date: {
          lte: previousDate,
          gte: previousPeriodStart,
        },
      },
    });

    if (!previousPeriodStats || !previousPeriodStats._sum) {
      throw new Error('Failed to fetch previous period stats');
    }

    // Get products statistics
    const productsStats = await db.$transaction([
      // Get total number of products
      db.product.count(),
      
      // Get total value of all products (price * quantity)
      db.product.aggregate({
        _sum: {
          price: true,
        },
      })
    ]);

    const [totalProducts, productsTotalPrice] = productsStats;

    // Calculate trends
    const currentRevenue = Number(currentPeriodStats._sum.price) || 0;
    const previousRevenue = Number(previousPeriodStats._sum.price) || 0;
    const currentQuantity = Number(currentPeriodStats._sum.quantity) || 0;
    const previousQuantity = Number(previousPeriodStats._sum.quantity) || 0;

    const revenueTrend = calculateServerTrend({
      currentValue: currentRevenue,
      previousValue: previousRevenue,
      timespan: period
    });

    const itemsSoldTrend = calculateServerTrend({
      currentValue: currentQuantity,
      previousValue: previousQuantity,
      timespan: period
    });

    return NextResponse.json({
      revenue: {
        current: currentRevenue,
        previous: previousRevenue,
        trend: revenueTrend
      },
      itemsSold: {
        current: currentQuantity,
        previous: previousQuantity,
        trend: itemsSoldTrend
      },
      products: {
        total: totalProducts,
        totalValue: Number(productsTotalPrice._sum.price) || 0,
      }
    });

  } catch (error) {
    console.error('Error fetching trends:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching trends' },
      { status: 500 }
    );
  }
}