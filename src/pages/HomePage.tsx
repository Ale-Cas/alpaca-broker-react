import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchAppBar from "../components/SearchAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useAssetBySymbolQuery, useSymbolsQuery } from "../services/asset/assetsApi";
import AssetCard from "../components/AssetCard";
import { useState } from "react";


export default function HomePage() {

    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const { data: symbols } = useSymbolsQuery();

    const filterSymbols = (query: string | null, symbols: string[]) => {
        if (!query) {
            return [];
        } else if (!query && symbols) {
            return symbols;
        } else {
            return symbols.filter((symbol) => symbol.includes(query.toUpperCase()));
        }
    };

    const searchedSymbols = filterSymbols(searchQuery, symbols!);
    const { data: asset, isLoading } = useAssetBySymbolQuery(searchedSymbols[0]);

    return (
        <Box>
            {symbols !== undefined && <SearchAppBar searchQuery={searchQuery!} filteredResults={searchedSymbols} setSearchQuery={setSearchQuery} options={symbols} />}
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box>
                    <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                        Logged in
                    </Typography>

                    {!isLoading && asset !== undefined && <AssetCard asset={asset} />}
                </Box>
            </Container>
        </Box>
    );
}
