import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Asset } from "../services/asset/assetsApi";

export interface AssetProps {
    asset: Asset
}

export default function AssetCard({ asset }: AssetProps) {

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                        Symbol {asset.symbol}
                    </Typography>
                    <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                        Name {asset.name}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                        Exchange {asset.exchange}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
