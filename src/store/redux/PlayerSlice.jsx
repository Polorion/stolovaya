import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const addUser = createAsyncThunk(
    "cart/addUser",
    async (params) => {
        console.log(params)

        const {data} = await axios.post(
            `http://localhost:3000/add-user`, {
                ...params
            }
        );
        return data;
    }
);
export const getUser = createAsyncThunk(
    "cart/getUser",
    async (params) => {
        console.log(params)

        const {data} = await axios.post(
            `http://localhost:3000/check-user`, {
                ...params
            }
        );
        return data;
    }
);
const PlayerSlice = createSlice({
    name: 'Player',
    initialState: {
        name: '',
        surname: '',
        job: '',
        request: '',
        saveLocal: false,
        isLogin: false,
        isLoad: false
    },
    extraReducers: (builder) => {


        builder.addCase(addUser.pending, (state, {payload}) => {
            state.isLoad = true;
        });
        builder.addCase(addUser.fulfilled, (state, {payload}) => {
            state.isLoad = false;
            state.request = payload
            if (payload !== 'Пользователь уже существует в базе') {

                state.isLogin = true;
                state.saveLocal = true;

                const objectToSave = {
                    name: state.name,
                    surname: state.surname,
                    job: state.job
                };
                const jsonObject = JSON.stringify(objectToSave);
                localStorage.setItem('dataUser', jsonObject);
            }

        });
        builder.addCase(addUser.rejected, (state, {payload}) => {
            state.isLoad = false;
            state.request = 'заполните все поля'
        });

        builder.addCase(getUser.pending, (state, {payload}) => {
            state.isLoad = true;
        });
        builder.addCase(getUser.fulfilled, (state, {payload}) => {
            state.isLoad = false;
            if (payload !== 'Пользователь не найден') {
                console.log(payload)
                state.name = payload.user.firstName
                state.surname = payload.user.lastName
                state.job = payload.user.organization
                state.isLogin = true
                const objectToSave = {
                    name: payload.user.firstName,
                    surname: payload.user.lastName,
                };
                const jsonObject = JSON.stringify(objectToSave);
                localStorage.setItem('dataUser', jsonObject);
            } else {
                state.request = payload
            }

        });
        builder.addCase(getUser.rejected, (state, {payload}) => {
            state.isLoad = false;
            state.request = 'заполните все поля'
        });
    },
    reducers: {

        setName: (state, {payload}) => {
            state.name = payload
        },
        setSurname: (state, {payload}) => {
            state.surname = payload
        },
        setJob: (state, {payload}) => {
            state.job = payload
        },
        setIsLogin: (state, {payload}) => {
            state.isLogin = false,
                state.name = '',
                state.surname = '',
                state.job = ''
            state.request = ''
        }
    }
})

export const {setName, setSurname, setJob, setIsLogin} = PlayerSlice.actions
export default PlayerSlice.reducer
