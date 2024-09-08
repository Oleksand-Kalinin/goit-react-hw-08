import { createSlice } from "@reduxjs/toolkit"
import { apiLogin, apiLogout, apiRefreshUser, apiRegister } from "./operations";

const INITIAL_STATE = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        resetError(state) {
            state.error = null;
        },
    },

    extraReducers(builder) {

        builder

            // Registration user
            .addCase(
                apiRegister.pending,
                (state) => {
                    state.error = null;
                })
            .addCase(
                apiRegister.fulfilled,
                (state, { payload }) => {
                    state.isLoggedIn = true;
                    state.token = payload.token;
                    state.user = payload.user;
                })
            .addCase(
                apiRegister.rejected,
                (state, { payload }) => {
                    state.error = payload;
                })

            // Login user
            .addCase(
                apiLogin.pending,
                (state) => {
                    state.error = null;
                })
            .addCase(
                apiLogin.fulfilled,
                (state, { payload }) => {
                    state.isLoggedIn = true;
                    state.token = payload.token;
                    state.user = payload.user;
                })
            .addCase(
                apiLogin.rejected,
                (state, { payload }) => {
                    state.error = payload;
                })

            // Logout user
            .addCase(apiLogout.pending,
                (state) => {
                    state.error = null;
                })
            .addCase(apiLogout.fulfilled, () => {
                return INITIAL_STATE;
            })
            .addCase(apiLogout.rejected,
                (state, { payload }) => {
                    state.error = payload;
                })

            // Refresh user
            .addCase(apiRefreshUser.pending,
                (state) => {
                    state.error = null;
                    state.isRefreshing = true;
                })
            .addCase(apiRefreshUser.fulfilled,
                (state, { payload }) => {
                    state.isLoggedIn = true;
                    state.user = payload;
                    state.isRefreshing = false;
                })
            .addCase(apiRefreshUser.rejected,
                (state, { payload }) => {
                    state.error = payload;
                    state.isRefreshing = false;
                })
    }
})


export const { resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;