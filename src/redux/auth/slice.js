import { createSlice } from "@reduxjs/toolkit"
import { apiLogin, apiLogout, apiRegister } from "./operations";

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
    extraReducers(builder) {

        builder

            // Registration user
            // .addCase(
            //     apiRegister.pending,
            //     (state, { payload }) => {
            //         state.isLoggedIn = true;
            //         state.token = payload.token;
            //         state.user = payload.user;
            //     })
            .addCase(
                apiRegister.fulfilled,
                (state, { payload }) => {
                    state.isLoggedIn = true;
                    state.token = payload.token;
                    state.user = payload.user;
                })
            // .addCase(
            //     apiRegister.rejected,
            //     (state, { payload }) => {
            //         state.isLoggedIn = true;
            //         state.token = payload.token;
            //         state.user = payload.user;
            //     })

            // Login user
            // .addCase(
            //     apiLogin.pending,
            //     (state, { payload }) => {
            //         state.isLoggedIn = true;
            //         state.token = payload.token;
            //         state.user = payload.user;
            //     })
            .addCase(
                apiLogin.fulfilled,
                (state, { payload }) => {
                    state.isLoggedIn = true;
                    state.token = payload.token;
                    state.user = payload.user;
                })
            // .addCase(
            //     apiLogin.rejected,
            //     (state, { payload }) => {
            //         state.isLoggedIn = true;
            //         state.token = payload.token;
            //         state.user = payload.user;
            //     })

            // Logout user
            .addCase(apiLogout.pending, (state) => {
                state.error = null;
            })
            .addCase(apiLogout.fulfilled, () => {
                return INITIAL_STATE;
            })
            .addCase(apiLogout.rejected, (state, { payload }) => {
                state.error = payload;
            })
    }
})

export const authReducer = authSlice.reducer;