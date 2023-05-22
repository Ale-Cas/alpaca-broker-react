import { api } from "../api";

export interface AccountTrading {
    equity: number;
    cash: number;
    buying_power: number;

}

export const accountsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        accountTrading: builder.query<AccountTrading, void>({
            query: () => ({
                url: "accounts/trading",
                method: "GET",
            }),
            providesTags: ["AccountTrading"]
        }),
    }),
});

export const { useAccountTradingQuery } = accountsApi;