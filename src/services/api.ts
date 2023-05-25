import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { toTitleCase } from '../utils/stringUtils';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000',
    credentials: 'include',
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

export const handleError = (err: any) => {
    console.log({
        status: err.status,
        title: "API Request Error",
        description: err.data.detail,
        isClosable: true,
    });
    if (err.status === 401) {
        return "Invalid authentication credentials. Try to login again."
    }
    else if (err.status === 422) {
        return "There is an error in the request parameters."
    }
    else if (err.status === 403) {
        return toTitleCase(err.data)
    }
    else {
        return err.data || "There was an unknown error during the request."
    }
}

export const api = createApi({
    baseQuery: baseQuery,
    tagTypes: [
        "AccountTrading",
        "Activities",
        "Assets",
        "Bars",
        "PortfolioHistory",
        "Orders"
    ],
    endpoints: builder => ({})
})