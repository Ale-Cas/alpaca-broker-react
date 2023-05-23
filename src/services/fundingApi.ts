import { api } from "./api";

interface JournalRequest {
    to_user: boolean
    amount: number
}

const router = "funding/"

export const fundingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createJournal: builder.mutation<void, JournalRequest>({
            query: (journalRequest) => ({
                url: router + "journal",
                method: "POST",
                body: journalRequest
            }),
            invalidatesTags: ["AccountTrading", "PortfolioHistory", "Activities"]
        }),
    }),
});

export const { useCreateJournalMutation } = fundingApi;