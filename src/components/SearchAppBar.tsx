import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Asset, useAssetsQuery } from '../services/assetsApi';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    flex: 1,
    maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
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

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        padding: theme.spacing(1, 1, 1, 4),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));


const SearchAppBar = () => {
    const { data: assets } = useAssetsQuery();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);

    // Function to filter assets based on user input
    function filterAssets(input: string, _assets: Asset[]): Asset[] {
        const _input = input.toLowerCase()
        const filteredSuggestions = _assets.filter(
            (item) =>
                item.symbol.toLowerCase().includes(_input) ||
                item.name.toLowerCase().includes(_input)
        );
        // filter out duplicates and sort the results
        const uniqueAssets: Asset[] = filteredSuggestions.reduce((accumulator, item) => {
            const existingAsset = accumulator.find((asset) => (asset as Asset).name === item.name);
            if (!existingAsset) {
                accumulator.push(item as never);
            }
            return accumulator;
        }, []);

        const sortedUniqueNames = uniqueAssets
            .map((asset) => asset.name)
            .sort((a, b) => {
                if (a.toLowerCase() === input.toLowerCase()) {
                    return -1; // Move the selected suggestion to the top
                }
                if (b.toLowerCase() === input.toLowerCase()) {
                    return 1; // Move the selected suggestion to the top
                }
                return a.localeCompare(b); // Sort the rest of the names alphabetically
            });

        const uniqueSuggestions = filteredSuggestions.filter((item) =>
            sortedUniqueNames.includes(item.name)
        );
        return uniqueSuggestions
    }

    // Handle user input change
    const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
        setInputValue(newInputValue);

        // Filter assets based on user input
        if (assets !== undefined) {
            const newFilteredAssets = filterAssets(newInputValue, assets!);
            setFilteredAssets(newFilteredAssets);
        }
    };

    const handleSelect = (event: React.ChangeEvent<{}>, newValue: Asset | null) => {
        // navigate to the symbol absolute path
        newValue && navigate("/" + newValue.symbol);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete<Asset>
                options={filteredAssets}
                getOptionLabel={(option) => option.name}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                renderOption={(props, option, { inputValue }) => (
                    <li {...props} key={option.symbol}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: option.name.replace(
                                    new RegExp(`(${inputValue})`, "i"),
                                    "<strong>$1</strong>"
                                ),
                            }}
                        />
                    </li>
                )}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        placeholder="Search"
                        inputProps={{ ...params.inputProps, 'aria-label': 'search' }}
                    />
                )}
                onChange={handleSelect}
            />
        </Search>
    );
};

export default SearchAppBar;
