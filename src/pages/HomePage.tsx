import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccountInfoQuery, useAccountTradingQuery, usePortfolioHistoryQuery } from "../services/accountsApi";
import BalanceCard from "../components/BalanceCard";
import Chart from "react-google-charts";
import { lineChartOptions, lineChartSize } from "../theme";
import FundingButtons from "../components/FundingButtons";
import BasePage from "./BasePage";
import Skeleton from "@mui/material/Skeleton";
import TradeCard from "../components/TradeCard";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useGetPositionsQuery } from "../services/positionsApi";
import ListItemDetail from "../components/ListItemDetail";
import { useAssetsQuery } from "../services/assetsApi";
import Card from "@mui/material/Card";
import { useGetOrdersQuery } from "../services/ordersApi";
import { formatDate } from "../utils/dateUtils";


export default function HomePage() {

    const { data: portfolioHistory } = usePortfolioHistoryQuery();

    const { data: accountInfo } = useAccountInfoQuery();
    const { data: accountBalances } = useAccountTradingQuery();
    const { data: positions } = useGetPositionsQuery();
    const { data: orders } = useGetOrdersQuery();
    const { data: assets } = useAssetsQuery();
    const { equity, cash, buying_power } = accountBalances ?? {};


    const sortedPositions = positions ? [...positions].sort((a, b) => Number(b.market_value) - Number(a.market_value)) : undefined;

    const todaysOrders = orders ? orders.filter((order) => new Date(order.created_at).getDate() === new Date().getDate()) : [];

    const positionListItem = sortedPositions ? sortedPositions.map((position, index) => {

        const name = assets?.filter((asset) => asset.symbol === position.symbol)[0].name

        return (
            <ListItem key={index} sx={{ border: 0.1, borderRadius: 5, marginBottom: 3 }}>
                <ListItemAvatar>
                    <Avatar src={"http://localhost:8000/logos/" + position.symbol} alt={position.symbol} />
                </ListItemAvatar>
                <ListItemText primary={
                    <Stack>
                        {name && <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            {name}
                        </Typography>}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h4"
                            color="text.primary"
                        >
                            {position.symbol}
                        </Typography>
                    </Stack>
                }
                    secondary={
                        <Grid container spacing={0.1} sx={{ marginTop: .4 }}>
                            <ListItemDetail description="Number of Shares" value={position.qty} precision={5} />
                            <ListItemDetail description="Market Value" value={position.market_value} addDollarSign={true} precision={2} />
                            <ListItemDetail description="Profit & Loss" value={position.unrealized_pl} addDollarSign={true} precision={2} />
                        </Grid>
                    }

                />

            </ListItem>
        )
    }) : <Skeleton variant="rounded" />;

    const orderListItem = todaysOrders.length > 0 ? todaysOrders.map((order, index) => {

        const name = assets?.filter((asset) => asset.symbol === order.symbol)[0].name
        const orderAmount = order.notional ?
            "$ " + Number(order.notional).toFixed(2) :
            order.filled_at ?
                "$ " + (Number(order.filled_avg_price) * Number(order.filled_qty)).toFixed(2)
                : ""

        const orderQty = order.qty ? order.qty.toString() : order.filled_qty || "";

        return (
            <ListItem key={index} sx={{ border: 0.1, borderRadius: 5, marginBottom: 3, }}>
                <ListItemAvatar>
                    <Avatar src={"http://localhost:8000/logos/" + order.symbol} alt={order.symbol} />
                </ListItemAvatar>
                <ListItemText primary={
                    <Stack>
                        {name && <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            {name}
                        </Typography>}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h4"
                            color="text.primary"
                        >
                            {order.symbol}
                        </Typography>
                    </Stack>
                }
                    secondary={
                        <Grid container spacing={0.1} sx={{ marginTop: .4 }}>
                            <ListItemDetail description="Number of Shares" value={orderQty} precision={5} />
                            <ListItemDetail description="Created at" value={formatDate(order.created_at)} />
                            <ListItemDetail description="Side" value={order.side} />
                            <ListItemDetail description="Status" value={order.status} />
                        </Grid>
                    }

                />

            </ListItem>
        )
    }) : <Skeleton variant="rounded" />;

    return (
        <BasePage>
            <Box sx={{ ml: 5, }}>
                <CssBaseline />
                <Stack sx={{ marginBottom: 3 }}>
                    <Typography
                        sx={{ fontWeight: "bold" }}
                        component="span"
                        variant="h4"
                        color="yellow"
                    >
                        {accountInfo ? `Welcome back, ${accountInfo.identity.given_name}!` : <Skeleton />}
                    </Typography>
                    <Typography

                        component="span"
                        variant="h6"
                        color="text.primary"
                    >
                        Here you can see an overview of your account.
                    </Typography>
                </Stack>
                <Grid container spacing={5} sx={{ marginBottom: 3 }}>
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
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <Card sx={{
                            padding: 5,
                            marginTop: 2,
                            borderRadius: 10
                        }}
                        >
                            <Stack>
                                <Typography
                                    sx={{ display: 'inline', alignSelf: "center", marginBottom: 2 }}
                                    component="span"
                                    variant="h4"
                                    color="text.primary"
                                >
                                    Your Portfolio
                                </Typography>
                            </Stack>
                            <List sx={{
                                width: '100%',
                            }}>
                                {positionListItem}
                            </List>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{
                            padding: 5,
                            marginTop: 2,
                            borderRadius: 10
                        }}
                        >
                            <Stack>
                                <Typography
                                    sx={{ display: 'inline', alignSelf: "center", marginBottom: 2 }}
                                    component="span"
                                    variant="h4"
                                    color="text.primary"
                                >
                                    Recent Orders
                                </Typography>
                            </Stack>
                            <List sx={{
                                width: '100%',
                            }}>
                                {orderListItem}
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </BasePage>
    );
}
