import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

interface PositionDetailProps {
    description: string;
    value: string;
    precision?: number;
    addDollarSign?: boolean;
}

const ListItemDetail = ({ description, value, precision, addDollarSign }: PositionDetailProps) => {
    const _value = precision ? Number(value).toFixed(precision) : value
    return (
        <>
            <Grid item xs={7}>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {description}
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography
                    sx={{ marginRight: "auto" }}
                    variant="body2"
                    color="text.primary"
                >
                    {addDollarSign ? "$ " + _value : _value}
                </Typography>
            </Grid>
        </>
    );
}

export default ListItemDetail;