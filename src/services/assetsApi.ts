import { api } from "./api";

export interface Asset {
    exchange: string;
    symbol: string;
    name: string;
}

const router = "assets/"

export const assetsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        assets: builder.query<Asset[], void>({
            query: () => ({
                url: router,
                method: "GET",
            })
        }),
        symbols: builder.query<string[], void>({
            query: () => ({
                url: router + "symbols",
                method: "GET",
            })
        }),
        assetBySymbol: builder.query<Asset, string>({
            query: (symbol) => ({
                url: router + `symbols/${symbol}`,
                method: "GET",
                providesTags: ["Assets"],
            })
        }),
    }),
});

export const { useAssetsQuery, useAssetBySymbolQuery, useSymbolsQuery } = assetsApi;