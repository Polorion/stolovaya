import {MainPage} from "./components/MainPage/MainPage.jsx";
import {RegistrationPage} from "./components/RegistrationPage/RegistrationPage.jsx";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./store/redux/PlayerSlice.jsx";


function App() {
    const isLogin = useSelector(state => state.player.isLogin)
    const isLoad = useSelector(state => state.player.isLoad)

    const dispatch = useDispatch()
    const DataLocal = localStorage.getItem('dataUser')
    useEffect(() => {
        if (DataLocal) {

            const parseData = JSON.parse(DataLocal)
            dispatch(getUser({firstName: parseData.name, lastName: parseData.surname}))
        }
    }, [])


    return (
        <div className='bg'>
            {isLoad ? <div>Загрузка</div> : isLogin ? <MainPage/> : <RegistrationPage/>}
        </div>
    )
}

export default App
