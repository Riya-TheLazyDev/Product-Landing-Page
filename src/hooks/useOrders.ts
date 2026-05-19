import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { Order } from "@/data/orders";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    orderService
      .getOrders()
      .then((res) => {
        if (res.success && res.data) {
          setOrders(res.data);
        } else {
          setError(res.error || "Failed to load orders");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load orders");
        setLoading(false);
      });
  }, []);

  return { orders, loading, error };
}
export default useOrders;
