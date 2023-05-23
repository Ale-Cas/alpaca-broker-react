import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccountTradingQuery, usePortfolioHistoryQuery } from "../services/accountsApi";
import BalanceCard from "../components/BalanceCard";
import Chart from "react-google-charts";
import { lineChartOptions } from "../theme";
import FundingButtons from "../components/FundingButtons";
import BasePage from "./BasePage";


export default function HomePage() {

    const { data: accountBalances } = useAccountTradingQuery();
    const { data: portfolioHistory } = usePortfolioHistoryQuery();

    return (
        <BasePage>
            <Box sx={{ ml: 5, }}>
                <CssBaseline />
                <Box>
                    <Grid container spacing={5}>
                        <Grid item xs={4}>
                            {accountBalances && <BalanceCard description="Equity" value={accountBalances.equity} />}
                        </Grid>
                        <Grid item xs={4}>
                            {accountBalances && <BalanceCard description="Cash" value={accountBalances.cash} />}
                        </Grid>
                        <Grid item xs={4}>
                            {accountBalances && <BalanceCard description="Buying Power" value={accountBalances.buying_power} />}
                        </Grid>
                    </Grid>
                </Box>
                <FundingButtons />
                {portfolioHistory && <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={portfolioHistory}
                    options={{
                        title: "Portfolio History",
                        ...lineChartOptions,
                    }}
                />}
            </Box>
        </BasePage>
    );
}
