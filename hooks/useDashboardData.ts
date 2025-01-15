"use client";

import { useEffect, useState } from 'react';
import { useSalesStore } from "@/utils/stores/SalesStore";
import { useProductsStore } from "@/utils/stores/ProductStore";

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    sales,
    loading: salesLoading,
    error: salesError,
    totalSales,
    totalItems,
    averageSale,
    fetchAllSales,
  } = useSalesStore();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    totalValue,
    fetchAllProducts,
  } = useProductsStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch both data sources in parallel
        await Promise.all([
          fetchAllSales(),
          fetchAllProducts()
        ]);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAllSales, fetchAllProducts]);

  return {
    isLoading: isLoading || salesLoading || productsLoading,
    error: error || salesError || productsError,
    salesData: {
      sales,
      totalSales,
      totalItems,
      averageSale,
    },
    productsData: {
      products,
      totalValue,
    }
  };
}