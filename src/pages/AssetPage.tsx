import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useAssetBySymbolQuery } from "../services/assetsApi";
import Chart from "react-google-charts";
import { lineChartOptions } from "../theme";
import { useBarsQuery } from "../services/pricesApi";
import CssBaseline from "@mui/material/CssBaseline";
import BasePage from "./BasePage";


const AssetPage = () => {

    const { symbol } = useParams();
    const { data: assetData } = useAssetBySymbolQuery(symbol!);
    const { data: closePrices } = useBarsQuery({ symbol: symbol!, barsField: "close" });

    return (
        <BasePage>
            <Box>
                <CssBaseline />
                <Box>
                    <Typography
                        variant="h3"
                        component="div"
                        sx={{ flexGrow: 1, ml: 10, fontFamily: "-apple-system" }}
                    >
                        {symbol}
                    </Typography>
                    {assetData && <Typography
                        variant="h6"
                        component="div"
                        color="yellow"
                        sx={{ flexGrow: 1, ml: 10, fontFamily: "-apple-system" }}
                    >
                        {assetData.name}
                    </Typography>}
                </Box>
                {closePrices && <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={closePrices}
                    options={{
                        title: "Closing Price",
                        ...lineChartOptions,
                    }}
                />}
            </Box>
        </BasePage>
    );
}

export default AssetPage;