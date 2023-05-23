import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface BalanceCardProps {
    description: string;
    value: number;
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
                        $ {value}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
