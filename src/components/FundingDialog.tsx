import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { toTitleCase } from '../utils/stringUtils';
import { FundingType } from './FundingButtons';
import { useState } from 'react';
import { useCreateJournalMutation } from '../services/fundingApi';
import { handleError } from '../services/api';
import { Alert } from '@mui/material';

export type FundingMethod = "ACH" | "Journal";

interface FundingDialogProps {
    open: boolean;
    close: () => void;
    fundingType: FundingType;
}

const FundingDialog = ({ open, fundingType, close }: FundingDialogProps) => {
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [successMessage, setSuccessMessage] = useState<null | string>(null);
    const [amount, setAmount] = useState<number>(0);
    const [createJournal] = useCreateJournalMutation();

    const fundingMethods: FundingMethod[] = Object.keys({ ACH: "", Journal: "" }) as FundingMethod[];

    const handleClose = () => {
        close();
        setSuccessMessage(null);
        setErrorMessage(null);
    }

    const handleSubmission = () => {
        const toUser = fundingType === "deposit";
        if (amount > 0) {
            try {
                createJournal({
                    to_user: toUser,
                    amount: amount,
                }).unwrap();
                setSuccessMessage(`${toTitleCase(fundingType)} entered.`);
            }
            catch (err: any) {
                setErrorMessage(handleError(err))
            }
        }
        else {
            setErrorMessage("The amount must be greater than 0.")
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
            <DialogTitle>{toTitleCase(fundingType)}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose a funding method and an amount.
                </DialogContentText>
                <TextField
                    id="funding-method"
                    select
                    label="Method"
                    defaultValue="Journal"
                    helperText="Please select a funding method"
                    sx={{ mt: 3 }}
                >
                    {fundingMethods.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="funding-amount"
                    type="number"
                    label="Amount"
                    helperText="Please enter a positive amount"
                    value={amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAmount(Number(event.target.value)) }}
                    sx={{ ml: 6, mt: 3 }}
                />
                {successMessage && <Alert severity='success'>{successMessage} </Alert>}
                {errorMessage && <Alert severity='error'>{errorMessage} </Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmission}>{fundingType}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FundingDialog;