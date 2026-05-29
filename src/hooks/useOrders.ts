import { useCallback, useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import type { Order } from "@/data/orders";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await orderService.getMyOrders();
    if (res.success && res.data) {
      setOrders(res.data);
    } else {
      setError(res.error || "Failed to load orders");
      setOrders([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}

export default useOrders;
