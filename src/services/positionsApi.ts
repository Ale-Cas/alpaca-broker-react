import { api } from "./api";
import { OrderResponse } from "./ordersApi";

export interface Position {
    symbol: string;
    qty: string;
    market_value: string;
    cost_basis: string;
    unrealized_pl: string;
    unrealized_plpc: string;
    current_price: string;
}

const router = "positions/"

export const positionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPositions: builder.query<Position[], void>({
            query: () => ({
                url: router,
                method: "GET",
                providesTags: ["Positions"],
            })
        }),
        closePosition: builder.mutation<OrderResponse, string>({
            query: (symbol) => ({
                url: router + symbol,
                method: "DELETE",
                invalidatesTags: ["Positions", "Orders", "Activities", "AccountTrading"],
            })
        }),
    }),
});

export const { useGetPositionsQuery, useClosePositionMutation } = positionsApi;