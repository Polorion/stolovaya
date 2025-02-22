import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Img from '/src/assets/background.webp'
import axios from "axios";
import {addUser} from "./PlayerSlice.jsx";

export const getMenu = createAsyncThunk(
    "cart/getMenu",
    async (params) => {

        const {data} = await axios.get(
            `http://localhost:3000/getMenu`
        );
        return data;
    }
);
export const saveDailyData = createAsyncThunk(
    "cart/save-daily-data",
    async (params) => {
        console.log(params)

        const {data} = await axios.post(
            `http://localhost:3000/save-daily-data`, {
                ...params
            }
        );
        return data;
    }
);
const MenuSlice = createSlice({
    name: 'Menu',
    initialState: {
        menu: []

    },
    extraReducers: (builder) => {


        builder.addCase(getMenu.pending, (state, {payload}) => {

        });
        builder.addCase(getMenu.fulfilled, (state, {payload}) => {
            console.log(payload)
            state.menu = [...payload]

        });
        builder.addCase(getMenu.rejected, (state, {payload}) => {

        });


    },

    reducers: {
        setChoice: (state, {payload}) => {
            state.menu = state.menu.map(el => {
                if (el.name === payload) {
                    return {...el, active: !el.active}
                }
                return el
            })
        },

    }
})

export const {setChoice} = MenuSlice.actions
export default MenuSlice.reducer
