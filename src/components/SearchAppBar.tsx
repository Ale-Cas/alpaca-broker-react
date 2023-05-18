import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

// const SyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(1)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             width: '50%',
//             '&:focus': {
//                 width: '20ch',
//             },
//         },
//     },
// }));

interface SearchBarProps {
    searchQuery: string;
    filteredResults: string[],
    options: string[],
    setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchAppBar({ searchQuery, filteredResults, options, setSearchQuery, }: SearchBarProps) {
    console.log(searchQuery);
    console.log(options);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Alpaca Broker Partner Name
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={searchQuery}
                            placeholder="Search a ticker"
                            onChange={(e) => { setSearchQuery((e.target as HTMLTextAreaElement).value) }}
                            // filterOptions={() => filteredResults}
                            // selectOnFocus
                            // clearOnBlur
                            // handleHomeEndKeys
                            // options={options}
                            // renderInput={(params) => (
                            //     <TextField {...params} label="Search" />
                            // )}
                            sx={{ width: 250, }}
                        // freeSolo
                        />
                        {/* <SyledAutocomplete
                            value={searchQuery}
                            placeholder="Search…"
                            onChange={(e) => { setSearchQuery((e.target as HTMLTextAreaElement).value) }}
                            filterOptions={() => filteredResults}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={options}
                            renderInput={(params) => (
                                <TextField {...params} label="Search" />
                            )}
                            sx={{ width: 200, }}
                            freeSolo
                        /> */}
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
