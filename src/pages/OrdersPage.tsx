import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BasePage from "./BasePage";
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetOrdersQuery } from "../services/ordersApi";
import { formatDate } from "../utils/dateUtils";

export default function OrdersPage() {
    const { data: orders, isLoading } = useGetOrdersQuery();

    const columns = [
        { field: "symbol", headerName: "Symbol", maxWidth: 100 },
        { field: "side", headerName: "Side", maxWidth: 100 },
        { field: "notional", headerName: "Amount", maxWidth: 100 },
        { field: "status", headerName: "Status", maxWidth: 300 },
        { field: "type", headerName: "Type", maxWidth: 300 },
        { field: "qty", headerName: "Number of Shares", flex: 1 },
        { field: "filled_avg_price", headerName: "Filled Average Price", flex: 1 },
        { field: "created_at", headerName: "Created At", flex: 1 },
        { field: "filled_at", headerName: "Filled At", flex: 1 },
    ];

    const rows = orders ? orders.map((order, index) => ({
        id: index,
        symbol: order.symbol,
        side: order.side,
        notional: order.notional ?
            `$ ${order.notional}` : order.filled_at ?
                `$ ${(Number(order.filled_qty) * Number(order.filled_avg_price)).toFixed(2)}`
                : "",
        qty: order.qty ? order.qty : order.filled_at ? order.filled_qty : "",
        filled_avg_price: order.filled_avg_price ? `$ ${order.filled_avg_price}` : "",
        status: order.status,
        type: order.type,
        created_at: formatDate(order.created_at),
        filled_at: order.filled_at ? formatDate(order.filled_at) : "",
    })) : [];

    return (
        <BasePage>
            <Box sx={{ ml: 5, }}>
                <CssBaseline />
                <DataGrid
                    columns={columns}
                    rows={rows}
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={isLoading}
                />
            </Box>
        </BasePage>
    );
}
