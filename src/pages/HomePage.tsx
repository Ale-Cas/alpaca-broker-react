import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchAppBar from "../components/SearchAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useAccountTradingQuery } from "../services/account/accountsApi";
import BalanceCard from "../components/BalanceCard";


export default function HomePage() {

    const { data: accountBalances } = useAccountTradingQuery();


    return (
        <Box>
            <SearchAppBar />
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box sx={{ marginTop: 5 }}>
                    <Grid container spacing={3}>
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
            </Container>
        </Box>
    );
}
