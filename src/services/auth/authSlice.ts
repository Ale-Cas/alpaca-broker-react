import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserAuth {
    email: null | string
    accessToken: null | string
}

const initialState: UserAuth = { email: null, accessToken: null }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ email: string; accessToken: string }>) => {
            const { email, accessToken } = action.payload
            state.email = email
            state.accessToken = accessToken
        },
        logOut: () => initialState
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state: RootState) => state.auth.email
export const selectCurrentToken = (state: RootState) => state.auth.accessToken