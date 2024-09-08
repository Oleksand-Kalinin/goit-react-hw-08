import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
    baseURL: "https://connections-api.goit.global/",
})

const setAuthHeaders = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};



// Registration user
export const apiRegister = createAsyncThunk(
    "auth/register",
    async (formData, thunkApi) => {

        try {
            const { data } = await instance.post("users/signup", formData);
            setAuthHeaders(data.token);
            return data;

        } catch (error) {
            console.log(error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);



// Login user
export const apiLogin = createAsyncThunk(
    "auth/login",
    async (formData, thunkApi) => {
        try {
            const { data } = await instance.post("users/login", formData);
            setAuthHeaders(data.token);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);



// Logout user
export const apiLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
        try {
            await instance.post("/users/logout");
            setAuthHeaders("");
            return;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);



// Refresh user
export const apiRefreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState();
            const token = state.auth.token;
            setAuthHeaders(token);
            const { data } = await instance.get("users/current");
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, thunkApi) => {
            const state = thunkApi.getState();
            const token = state.auth.token;

            if (token) return true;

            return false;
        },
    }
);