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
    submitted_at: string;
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
            invalidatesTags: ["AccountTrading", "PortfolioHistory", "Activities"]
        }),
    }),
});

export const { useOrderMutation } = ordersApi;