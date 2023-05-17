import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
    useLoginMutation,
    useRegisterMutation,
} from "../services/auth/authApi";
import { setCredentials } from "../services/auth/authSlice";
import Copyright from "../components/Copyright";
import ErrorMessage from "../components/ErrorMessage";

export default function SignUp() {
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [register] = useRegisterMutation();
    const [login] = useLoginMutation();

    const createUser = async (inputUser: FormData) => {
        const email = inputUser.get("email")!.toString();
        const password = inputUser.get("password")!.toString();

        try {
            await register({
                email: email,
                password: password,
                confirm_password: inputUser.get("confirm-password")!.toString(),

            });
        } catch (err: any) { }
        try {
            const token = await login({
                email: email,
                password: password,
            }).unwrap();
            const accessToken = token.access_token;
            dispatch(setCredentials({ email, accessToken }));
            navigate("/home");
        } catch (err: any) { }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputUserData = new FormData(event.currentTarget);
        const minPasswordLength = 5;
        const password = inputUserData.get("password")!.toString();

        if (password !== inputUserData.get("confirm-password")) {
            setErrorMessage("Ensure that password and confirm password match.");
        } else if (password.length < minPasswordLength) {
            setErrorMessage(
                `Password must be longer than ${minPasswordLength} characters.`
            );
        } else {
            createUser(inputUserData);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirm Password"
                                type="password"
                                id="confirm-password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{ marginTop: 2 }}>
                        {errorMessage && <ErrorMessage message={errorMessage} />}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright />
        </Container>
    );
}
