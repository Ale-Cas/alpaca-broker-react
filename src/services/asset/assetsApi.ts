import { api } from "../api";

export interface Asset {
    exchange: string;
    symbol: string;
    name: string;
}

export const assetsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        assets: builder.query<Asset[], void>({
            query: () => ({
                url: "assets/",
                method: "GET",
            })
        }),
        symbols: builder.query<string[], void>({
            query: () => ({
                url: "assets/symbols",
                method: "GET",
            })
        }),
        assetBySymbol: builder.query<Asset, string>({
            query: (symbol) => ({
                url: `assets/symbols/${symbol}`,
                method: "GET",
            })
        }),
    }),
});

export const { useAssetsQuery, useAssetBySymbolQuery, useSymbolsQuery } = assetsApi;