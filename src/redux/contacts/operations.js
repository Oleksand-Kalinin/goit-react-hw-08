import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/operations';



export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get('contacts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contactData, thunkAPI) => {
        try {
            const response = await instance.post(`contacts`, contactData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            const response = await instance.delete(`contacts/${contactId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)