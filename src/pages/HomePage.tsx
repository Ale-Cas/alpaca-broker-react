import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccountTradingQuery, usePortfolioHistoryQuery } from "../services/accountsApi";
import BalanceCard from "../components/BalanceCard";
import Chart from "react-google-charts";
import { lineChartOptions, lineChartSize } from "../theme";
import FundingButtons from "../components/FundingButtons";
import BasePage from "./BasePage";
import Skeleton from "@mui/material/Skeleton";
import TradeCard from "../components/TradeCard";


export default function HomePage() {

    const { data: portfolioHistory } = usePortfolioHistoryQuery();

    const { data: accountBalances } = useAccountTradingQuery();
    const { equity, cash, buying_power } = accountBalances ?? {};

    return (
        <BasePage>
            <Box sx={{ ml: 5, }}>
                <CssBaseline />
                <Grid container spacing={5}>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={5}>
                                <Grid item xs={4}>
                                    <BalanceCard description="Equity" value={equity} />
                                </Grid>
                                <Grid item xs={4}>
                                    <BalanceCard description="Cash" value={cash} />
                                </Grid>
                                <Grid item xs={4}>
                                    <BalanceCard description="Buying Power" value={buying_power} />
                                </Grid>
                            </Grid>
                        </Box>
                        <FundingButtons />
                        {portfolioHistory ?
                            <Chart
                                chartType="LineChart"
                                width={lineChartSize.width}
                                height={lineChartSize.height}
                                data={portfolioHistory}
                                options={{
                                    title: "Portfolio History",
                                    ...lineChartOptions,
                                }}
                            /> : <Skeleton variant="rounded" width={lineChartSize.width} height={lineChartSize.height} />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <TradeCard />
                    </Grid>
                </Grid>
            </Box>
        </BasePage>
    );
}
