import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BasePage from "./BasePage";
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Position, useClosePositionMutation, useGetPositionsQuery } from "../services/positionsApi";
import { pieChartOptions, pieChartSize } from "../theme";
import Chart from "react-google-charts";
import Skeleton from "@mui/material/Skeleton";
import {
    GridRowModes,
    GridActionsCellItem,
    GridRowId,
    GridColDef,
} from '@mui/x-data-grid-pro';
import { handleError } from "../services/api";
import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Weight {
    symbol: string;
    weight: number;
}

export default function PositionsPage() {
    const { data: positions, isLoading } = useGetPositionsQuery();
    const [openDialog, setOpenDialog] = useState(false);
    const [closePositionSymbol, setClosePositionSymbol] = useState<string | null>(null);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleClosePosition = () => {
        if (closePositionSymbol) {
            console.log(
                closePosition(closePositionSymbol)
                    .unwrap()
                    .catch(
                        (err) => alert(handleError(err))
                    )
            );
        } else {
            alert("Symbol not found.")
        }
        setOpenDialog(false);
    };
    var pieData: any[][] | undefined = undefined;

    const positionsToRows = (positions: Position[]) => positions.map((position, index) => ({
        id: index + 1,
        symbol: position.symbol,
        qty: position.qty,
        market_value: `$ ${Number(position.market_value).toFixed(2)}`,
        current_price: `$ ${Number(position.current_price).toFixed(2)}`,
        cost_basis: `$ ${Number(position.cost_basis).toFixed(2)}`,
        unrealized_pl: `$ ${Number(position.unrealized_pl).toFixed(4)}`,
        unrealized_plpc: `% ${(Number(position.unrealized_plpc) * 100).toFixed(2)}`,
    }))

    const rows = positions ? positionsToRows(positions) : [
        {
            id: 1,
            symbol: "LOADING",
            qty: "LOADING",
            market_value: "LOADING",
            current_price: "LOADING",
            cost_basis: "LOADING",
            unrealized_pl: "LOADING",
            unrealized_plpc: "LOADING",
        }
    ];

    const [closePosition] = useClosePositionMutation();
    const handleDeleteClick = (id: GridRowId) => () => {
        setOpenDialog(true);
        if (rows.length > 0) {
            const symbol = rows.filter((row) => row.id === id)[0].symbol;
            setClosePositionSymbol(symbol)
        }
    };

    if (positions) {
        const totalMarketValue: number | undefined = positions.reduce(
            (total, position) => total + Number(position.market_value),
            0
        );
        const weights: Weight[] | undefined = positions.map((position) => {
            const { symbol, market_value } = position;
            const weight = Number(((Number(market_value) / totalMarketValue) * 100).toFixed(2));

            return { symbol: symbol, weight: weight };
        });
        pieData = [["Symbol", "Weight"]];
        weights.forEach((position) => {
            const { symbol, weight } = position;
            pieData!.push([symbol, weight]);
        });
    }


    var columns: GridColDef[] = [
        { field: "symbol", headerName: "Symbol", flex: 1 },
        { field: "qty", headerName: "Number of Shares", flex: 1 },
        { field: "market_value", headerName: "Market Value", flex: 1 },
        { field: "current_price", headerName: "Current Price", flex: 1 },
        { field: "cost_basis", headerName: "Cost Basis", flex: 1 },
        { field: "unrealized_pl", headerName: "Profit & Loss", flex: 1 },
        { field: "unrealized_plpc", headerName: "Profit & Loss (Percentage)", flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                if (rows.length > 0) {
                    return [
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                } else {
                    return []
                }
            },
        },
    ];

    return (
        <BasePage>
            <Box sx={{ ml: 5, }}>
                <CssBaseline />
                {positions && pieData ? <Chart
                    chartType="PieChart"
                    data={pieData}
                    options={{ title: "Portfolio Weights", ...pieChartOptions }}
                    width={pieChartSize.width}
                    height={pieChartSize.height}
                />
                    : <Skeleton variant="rounded"
                        width={pieChartSize.width}
                        height={pieChartSize.height} />
                }
                <DataGrid
                    columns={columns}
                    rows={rows}
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={isLoading}
                    editMode="row"
                    rowModesModel={{ 1: { mode: GridRowModes.Edit } }}
                />
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to close your positions in {closePositionSymbol!}?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Closing your positions will result in a sell market order for {closePositionSymbol!}.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePosition} autoFocus color="success">
                            Yes
                        </Button>
                        <Button onClick={handleCloseDialog} color="error">No</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </BasePage>
    );
}
