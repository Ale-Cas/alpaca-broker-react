import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import { useOrderMutation } from "../services/ordersApi";
import { handleError } from "../services/api";
import Alert from "@mui/material/Alert";


export default function TradeCard() {

    const [symbol, setSymbol] = useState("AAPL");

    const [buyChecked, setBuyChecked] = useState(true);
    const [sellChecked, setSellChecked] = useState(false);

    const handleBuyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSellChecked(!event.target.checked);
        setBuyChecked(event.target.checked);
    };
    const handleSellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuyChecked(!event.target.checked);
        setSellChecked(event.target.checked);
    };
    const [notionalChecked, setNotionalChecked] = useState(true);
    const [qtyChecked, setQtyChecked] = useState(false);

    const handleNotionalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQtyChecked(!event.target.checked);
        setNotionalChecked(event.target.checked);
    };
    const handleQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotionalChecked(!event.target.checked);
        setQtyChecked(event.target.checked);
    };

    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [successMessage, setSuccessMessage] = useState<null | string>(null);
    const [createOrder] = useOrderMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const orderRequest = new FormData(event.currentTarget);
        console.log(orderRequest)
        const symbol: string = orderRequest.get("symbol")!.toString();
        const side: string = buyChecked ? "buy" : "sell";
        const type: string = orderRequest.get("type")!.toString().toLowerCase();
        const time_in_force: string = orderRequest.get("time_in_force")!.toString().toLowerCase();
        const qty: number | undefined = qtyChecked ? Number(orderRequest.get("qty")!) : undefined;
        const notional: number | undefined = notionalChecked ? Number(orderRequest.get("notional")!) : undefined;
        try {
            const orderResponse = createOrder({
                symbol: symbol,
                side: side,
                type: type,
                time_in_force: time_in_force,
                qty: qty,
                notional: notional,
            }).unwrap();
            console.log(orderResponse)
            setSuccessMessage("Order entered successfully!")
        } catch (err: any) {
            console.log(err)
            setErrorMessage(handleError(err))
        }
    }


    const orderTypes = ["MARKET", "LIMIT"];
    const timeInForce = ["DAY", "GTC", "IOC",];

    return (
        <Box>
            <Card variant="elevation">
                <CardContent sx={{ padding: 5 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "-apple-system" }}>
                            Enter an order
                        </Typography>
                        <Stack spacing={5}>
                            <TextField
                                id="symbol"
                                name="symbol"
                                type="text"
                                label="Ticker"
                                value={symbol}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSymbol(event.target.value.toLocaleUpperCase()) }}
                                helperText="Please select the ticker you want to trade"
                                sx={{ mt: 3 }}
                            />
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox
                                    checked={buyChecked}
                                    onChange={handleBuyChange}
                                />} label="Buy" />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={sellChecked}
                                        // TODO: if there are no posistions disable sell
                                        onChange={handleSellChange}
                                    />} label="Sell" />
                            </FormGroup>
                            <Stack direction="row" spacing={5}>
                                <TextField
                                    id="type"
                                    name="type"
                                    select
                                    label="Order type"
                                    defaultValue={orderTypes[0]}
                                    helperText="Please select the order type"
                                >
                                    {orderTypes.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="time_in_force"
                                    name="time_in_force"
                                    select
                                    label="Time in force"
                                    defaultValue={timeInForce[0]}
                                    helperText="Please select the time in force"
                                >
                                    {timeInForce.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox
                                    checked={notionalChecked}
                                    onChange={handleNotionalChange}
                                />} label="Notional" />
                                <FormControlLabel control={<Checkbox
                                    checked={qtyChecked}
                                    onChange={handleQtyChange}
                                />} label="Quantity" />
                            </FormGroup>
                            <TextField
                                id={qtyChecked ? "qty" : "notional"}
                                name={qtyChecked ? "qty" : "notional"}
                                type="number"
                                label={qtyChecked ? "Number of shares" : "Dollar amount"}
                                helperText="Please enter a positive amount"
                                sx={{ ml: 6, mt: 3 }}
                            />
                            {successMessage && <Alert severity='success'>{successMessage} </Alert>}
                            {errorMessage && <Alert severity='error'>{errorMessage} </Alert>}
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ textTransform: "none", maxWidth: 250, alignSelf: "center" }}
                            >
                                SUBMIT ORDER
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
