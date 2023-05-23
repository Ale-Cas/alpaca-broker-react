import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BasePage from "./BasePage";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useActivitiesQuery } from "../services/accountsApi";

export default function ActivitiesPage() {
    const { data: activities } = useActivitiesQuery();
    return (
        <BasePage>
            <Box sx={{ ml: 5, }}>
                <CssBaseline />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Activity</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        {activities && <TableBody>
                            {activities.map((row) => (
                                <TableRow
                                    key={row.activity_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {
                                            row.activity_type === "JNLC" ?
                                                (row.net_amount > 0 ? "Deposit" : "Withdrawal")
                                                : row.activity_type
                                        }
                                    </TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="right">{row.net_amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>
                </TableContainer>
            </Box>
        </BasePage>
    );
}
