import { api } from "./api";

export interface OrderRequest {
    symbol: string;
    side: string;
    type: string;
    time_in_force: string;
    qty?: number;
    notional?: number;
}

export interface OrderResponse extends OrderRequest {
    id: string;
    created_at: string;
    filled_at?: string;
    filled_avg_price?: string;
    filled_qty?: string;
    status: string;
}

const router = "orders/"

export const ordersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        order: builder.mutation<OrderResponse, OrderRequest>({
            query: (orderRequest) => ({
                url: router,
                method: "POST",
                body: orderRequest,
            }),
            invalidatesTags: ["AccountTrading", "PortfolioHistory", "Activities", "Orders", "Positions"]
        }),
        getOrders: builder.query<OrderResponse[], void>({
            query: () => ({
                url: router,
                method: "GET",
            }),
            providesTags: ["Orders"]
        }),
    }),
});

export const { useOrderMutation, useGetOrdersQuery } = ordersApi;