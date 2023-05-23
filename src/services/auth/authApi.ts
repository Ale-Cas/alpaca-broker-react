import { api } from "../api";

interface LoginResponse {
    access_token: string
    token_type: string
}

interface LoginRequest {
    email: string
    password: string
}

interface InputUser {
    email: string;
    password: string;
    confirm_password: string;
}

interface OutputUser {
    email: string;
}

const router = "users/"

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: router + "login",
                method: "POST",
                body: credentials
            })
        }),
        register: builder.mutation<OutputUser, InputUser>({
            query: (inputUser) => ({
                url: router + "register",
                method: "POST",
                body: inputUser
            })
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;