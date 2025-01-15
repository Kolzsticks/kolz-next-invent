// app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get only the necessary summary data
    const dashboardStats = await db.$transaction([
      // Recent products (last 5)
      db.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          price: true,
          status: true,
          createdAt: true
        }
      }),
      
      // Top selling products
      db.product.findMany({
        take: 5,
        orderBy: { quantity: 'desc' },
        select: {
          id: true,
          name: true,
          quantity: true,
          price: true
        }
      }),
      
      // Latest sales
      db.sale.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          amount: true,
          createdAt: true,
          product: {
            select: {
              name: true
            }
          }
        }
      }),
      
      // Summary counts
      db.product.count({
        where: { status: 'active' }
      }),
      
      // Total products
      db.product.count()
    ]);

    const [
      recentProducts,
      topSellingProducts,
      latestSales,
      activeProductCount,
      totalProducts
    ] = dashboardStats;

    return NextResponse.json({
      recentProducts,
      topSellingProducts,
      latestSales,
      summary: {
        activeProducts: activeProductCount,
        totalProducts
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}