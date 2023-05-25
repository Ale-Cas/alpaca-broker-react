import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BasePage from "./BasePage";
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useActivitiesQuery } from "../services/accountsApi";

export default function ActivitiesPage() {
    const { data: activities, isLoading } = useActivitiesQuery();

    const columns = [
        { field: "activity_name", headerName: "Activity", flex: 1 },
        { field: "date", headerName: "Date", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1 },
    ];

    const rows = activities ? activities.map((activity, index) => ({
        id: index,
        // processing the activity type to show deposit / withdrawal instead of JNLC
        // and Order instead of FILL
        activity_name: activity.activity_name,
        date: activity.date,
        amount: `$ ${Math.abs(activity.amount)}`,
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
