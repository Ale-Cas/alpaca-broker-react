import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";

const Public = () => {
    return (
        <section className="public">
            <Box sx={{ flexGrow: 1, alignItems: "center" }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{ flexGrow: 1, ml: 2, fontFamily: "-apple-system" }}
                        >
                            Alpaca Broker Partner Name
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<LoginIcon />}
                            sx={{ textTransform: "none", mr: 1 }}
                            component={Link}
                            to={"/sign-in"}
                        >
                            Log In
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<AssignmentIcon />}
                            sx={{ textTransform: "none" }}
                            component={Link}
                            to={"/sign-up"}
                        >
                            Sign Up
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <main>
                <Box sx={{ alignItems: "center" }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                                Build your own trading application with Alpaca's Broker API
                            </Typography>
                            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                                Frontend web app based on https://github.com/Ale-Cas/alpaca-partner-backend
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </main>
            <footer>
                <Copyright />
            </footer>
        </section>
    );
};
export default Public;
