import { api } from "./api";

interface BarsParameters {
    symbol: string;
    barsField: string;
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
    }),
});

export const { useBarsQuery } = pricesApi;