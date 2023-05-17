import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function HomePage() {

    return (
        <Box sx={{ display: "flex" }}>
            <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                Logged in
            </Typography>
        </Box>
    );
}
