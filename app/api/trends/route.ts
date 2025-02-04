import { NextResponse } from 'next/server';
import { Period, TrendData, TrendResult } from '@/types/types';
import  db  from '@/lib/db';

function calculateServerTrend({ currentValue, previousValue, timespan }: TrendData): TrendResult {
  if (!previousValue || previousValue === 0) {
    return {
      value: 0,
      timespan: `No previous ${timespan} data`,
      direction: 'none',
    };
  }

  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;

  const timespanText = {
    day: 'since yesterday',
    week: 'from last week',
    month: 'from last month',
    year: 'from last year',
  };

  return {
    value: Math.round(percentageChange * 10) / 10,
    timespan: `${percentageChange >= 0 ? '+' : ''}${Math.round(percentageChange * 10) / 10}% ${timespanText[timespan]}`,
    direction: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'none',
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') || 'month') as Period;

    if (!['day', 'week', 'month', 'year'].includes(period)) {
      return NextResponse.json(
        { error: 'Invalid period parameter' },
        { status: 400 },
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

    // Sales statistics
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

    // Product statistics
    const [totalProducts, productsTotalPrice] = await db.$transaction([
      db.product.count(),
      db.product.aggregate({
        _sum: {
          price: true,
        },
      }),
    ]);

    // Calculate trends
    const currentRevenue = Number(currentPeriodStats._sum.price) || 0;
    const previousRevenue = Number(previousPeriodStats._sum.price) || 0;
    const currentQuantity = Number(currentPeriodStats._sum.quantity) || 0;
    const previousQuantity = Number(previousPeriodStats._sum.quantity) || 0;

    const revenueTrend = calculateServerTrend({
      currentValue: currentRevenue,
      previousValue: previousRevenue,
      timespan: period,
    });

    const itemsSoldTrend = calculateServerTrend({
      currentValue: currentQuantity,
      previousValue: previousQuantity,
      timespan: period,
    });

    // Category statistics
    const categoriesWithCounts = await db.category.findMany({
      include: {
        Subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const categoryStats = await Promise.all(
      categoriesWithCounts.map(async (category) => {
        const productCount = await db.product.count({
          where: { category: category.name },
        });

        return {
          id: category.id,
          name: category.name,
          productCount,
          subcategories: category.Subcategory.map((sub) => ({
            id: sub.id,
            name: sub.name,
          })),
        };
      }),
    );

    return NextResponse.json({
      revenue: {
        current: currentRevenue,
        previous: previousRevenue,
        trend: revenueTrend,
      },
      itemsSold: {
        current: currentQuantity,
        previous: previousQuantity,
        trend: itemsSoldTrend,
      },
      products: {
        total: totalProducts,
        totalValue: Number(productsTotalPrice._sum.price) || 0,
      },
      categories: categoryStats, // Include category-based stats
    });
  } catch (error) {
    console.error('Error fetching trends:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching trends' },
      { status: 500 },
    );
  }
}
