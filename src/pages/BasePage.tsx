// import AppBar from '@mui/material/AppBar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SearchAppBar from '../components/SearchAppBar';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactPage from "@mui/icons-material/ContactPage";
import PieChartIcon from '@mui/icons-material/PieChart';
import HomeIcon from "@mui/icons-material/Home";
import Info from "@mui/icons-material/Info";
import PaidIcon from '@mui/icons-material/Paid';
import School from "@mui/icons-material/School";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import useTheme from '@mui/material/styles/useTheme';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const BasePage = ({ children }: { children: JSX.Element }) => {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const theme = useTheme();
    const iconStyle = { width: "32px", height: "32px" };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        Alpaca Partner Name
                    </Typography>
                    <SearchAppBar />
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" open={drawerOpen} anchor="left" sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}>
                <DrawerHeader>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ m: "10px 0" }}>
                    {["Home", "Positions", "Activities", "Orders"].map(
                        (text, index) => (
                            <ListItem
                                key={text}
                                disablePadding
                                sx={{ display: "block", m: "10px 0" }}
                            >
                                <ListItemButton
                                    key={index}
                                    component={RouterLink}
                                    to={"/" + text.toLowerCase().replace(" ", "-")}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: drawerOpen ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: drawerOpen ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index === 0 ? <HomeIcon style={iconStyle} /> : <></>}
                                        {index === 1 ? <PieChartIcon style={iconStyle} /> : <></>}
                                        {index === 2 ? <ReceiptIcon style={iconStyle} /> : <></>}
                                        {index === 3 ? <PaidIcon style={iconStyle} /> : <></>}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <List>
                    {["Learn More", "About", "Contacts"].map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{ display: "block", m: "10px 0" }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {index === 0 ? <School style={iconStyle} /> : <></>}
                                    {index === 1 ? <Info style={iconStyle} /> : <></>}
                                    {index === 2 ? <ContactPage style={iconStyle} /> : <></>}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={drawerOpen}>
                <DrawerHeader />
                <Box sx={{ ml: 30, mr: 5, mt: -5 }}>{children}</ Box>
            </Main>
        </Box>
    );
};

export default BasePage;
