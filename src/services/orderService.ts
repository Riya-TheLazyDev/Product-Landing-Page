import apiClient, { ApiResponse } from "./apiClient";
import type { Order, AdminOrderStats } from "@/data/orders";
import {
  ApiOrder,
  mapApiOrder,
  toAdminOrderRow,
  CreateOrderPayload,
  AdminOrderRow,
} from "@/lib/orderMapper";
import { notifyProductCatalogChanged } from "@/lib/productCatalog";

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<ApiResponse<Order>> {
    try {
      const response = await apiClient.post<ApiResponse<ApiOrder>>("/orders", payload);
      const body = response.data;
      if (body.success && body.data) {
        notifyProductCatalogChanged();
        return { ...body, data: mapApiOrder(body.data) };
      }
      return { success: false, error: body.error || "Failed to create order" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to create order",
      };
    }
  },

  async getMyOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await apiClient.get<ApiResponse<ApiOrder[]>>("/orders/my-orders");
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: body.data.map(mapApiOrder) };
      }
      return { success: false, error: body.error || "Failed to load orders" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to load orders",
      };
    }
  },

  async getOrderById(id: string | number): Promise<ApiResponse<Order>> {
    try {
      const response = await apiClient.get<ApiResponse<ApiOrder>>(`/orders/${id}`);
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: mapApiOrder(body.data) };
      }
      return { success: false, error: body.error || `Failed to fetch order ${id}` };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || `Failed to fetch order ${id}`,
      };
    }
  },

  async getAdminOrders(params?: {
    order_status?: string;
    payment_status?: string;
    search?: string;
  }): Promise<
    ApiResponse<{ orders: AdminOrderRow[]; stats: AdminOrderStats; raw: ApiOrder[] }>
  > {
    try {
      const search = new URLSearchParams();
      if (params?.order_status) search.set("order_status", params.order_status);
      if (params?.payment_status) search.set("payment_status", params.payment_status);
      if (params?.search) search.set("search", params.search);
      const qs = search.toString();

      const response = await apiClient.get<
        ApiResponse<{ orders: ApiOrder[]; stats: AdminOrderStats }>
      >(`/admin/orders${qs ? `?${qs}` : ""}`);

      const body = response.data;
      if (body.success && body.data) {
        const raw = body.data.orders;
        return {
          ...body,
          data: {
            orders: raw.map(toAdminOrderRow),
            stats: body.data.stats,
            raw,
          },
        };
      }
      return { success: false, error: body.error || "Failed to load admin orders" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to load admin orders",
      };
    }
  },

  async updateOrderStatus(
    id: string | number,
    status: string,
    paymentStatus?: string
  ): Promise<ApiResponse<AdminOrderRow>> {
    try {
      const response = await apiClient.put<ApiResponse<ApiOrder>>(
        `/admin/orders/${id}/status`,
        { status, payment_status: paymentStatus }
      );
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: toAdminOrderRow(body.data) };
      }
      return { success: false, error: body.error || "Failed to update order status" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to update order status",
      };
    }
  },
};

export default orderService;
