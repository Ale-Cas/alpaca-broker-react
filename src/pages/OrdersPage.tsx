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
        { field: "qty", headerName: "Number of Shares", maxWidth: 200 },
        { field: "status", headerName: "Status", maxWidth: 200 },
        { field: "type", headerName: "Type", maxWidth: 200 },
        { field: "created_at", headerName: "Created At", flex: 1 },
        { field: "filled_at", headerName: "Filled At", flex: 1 },
    ];

    const rows = orders ? orders.map((order, index) => ({
        id: index,
        symbol: order.symbol,
        side: order.side,
        notional: `$ ${order.notional}`,
        qty: order.qty,
        status: order.status,
        type: order.type,
        created_at: formatDate(order.created_at),
        filled_at: formatDate(order.filled_at),
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
