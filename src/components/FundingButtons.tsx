import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";
import FundingDialog from "./FundingDialog";

const buttonStyle = { padding: 1, margin: 5, }

export type FundingType = "deposit" | "withdraw";


const FundingButtons = () => {
    const [open, setOpen] = useState(false);
    const [funding, setFunding] = useState<null | FundingType>(null);
    const buttons = [
        <Button key="deposit" color="success" sx={buttonStyle}
            onClick={() => {
                setOpen(true);
                setFunding("deposit");
            }}>
            Deposit
        </Button>,
        <Button key="withdraw" color="error" sx={buttonStyle}
            onClick={() => {
                setOpen(true);
                setFunding("withdraw");
            }}>
            Withdraw
        </Button>,
    ];
    return (<Box>
        <ButtonGroup size="large" aria-label="large button group" variant="contained" fullWidth sx={{ padding: 3 }} disableElevation>
            {buttons}
        </ButtonGroup>
        {funding && <FundingDialog open={open} fundingType={funding} close={() => setOpen(false)} />}
    </Box>
    );
}

export default FundingButtons;