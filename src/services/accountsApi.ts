import { api } from "./api";

export interface AccountTrading {
    equity: number;
    cash: number;
    buying_power: number;

}

export interface Activity {
    activity_name: string;
    date: string;
    amount: number;
}

const router = "accounts/"

export const accountsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        accountTrading: builder.query<AccountTrading, void>({
            query: () => ({
                url: router + "trading",
                method: "GET",
            }),
            providesTags: ["AccountTrading"]
        }),
        portfolioHistory: builder.query<[string, string | number][], void>({
            query: () => ({
                url: router + "portfolio/history",
                method: "GET",
            }),
            providesTags: ["PortfolioHistory"]
        }),
        activities: builder.query<Activity[], void>({
            query: () => ({
                url: router + "activities",
                method: "GET",
            }),
            providesTags: ["Activities"]
        }),
    }),
});

export const { useAccountTradingQuery, usePortfolioHistoryQuery, useActivitiesQuery } = accountsApi;