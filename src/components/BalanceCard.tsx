import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export interface BalanceCardProps {
    description: string;
    value: number | undefined;
}

export default function BalanceCard({ description, value }: BalanceCardProps) {

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                        {description}
                    </Typography>
                    <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                        {value ? `$ ${value.toFixed(2)}` : <Skeleton variant="rounded" width={100} />}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
