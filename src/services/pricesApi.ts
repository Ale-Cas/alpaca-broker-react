import { api } from "./api";

interface BarsParameters {
    symbol: string;
    barsField: string;
}

interface Quote {
    symbol: string;
    timestamp: string;
    ask_exchange: string;
    ask_price: number;
    bid_exchange: string;
    bid_price: number;
}

const router = "prices/"

export const pricesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        bars: builder.query<[string, string | number][], BarsParameters>({
            query: ({ symbol, barsField }) => ({
                url: `${router}bars?symbol=${symbol}&bars_field=${barsField}`,
                method: "GET",
                providesTags: ["Bars"],
            })
        }),
        latestQuote: builder.query<Quote, string>({
            query: (symbol) => ({
                url: `${router}quotes/latest?symbol=${symbol}`,
                method: "GET",
            })
        }),
    }),
});

export const { useBarsQuery, useLatestQuoteQuery } = pricesApi;