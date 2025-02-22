import * as React from 'react';
import S from './MainPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {Card} from "./Card/Card.jsx";
import {setIsLogin} from "../../store/redux/PlayerSlice.jsx";
import {getMenu, saveDailyData} from "../../store/redux/MenuSlice.jsx";
import {useEffect} from "react";
import UploadComponent from "./Card/adminComponent/adminComponent.jsx";

export const MainPage = () => {
    const menu = useSelector(state => state.menu.menu)
    const dispatch = useDispatch()
    const order = menu.filter(el => el.active).map(el => el.name
    )
    const data = JSON.parse(localStorage.getItem('dataUser'))
    console.log(menu)
    const isAdmin = data.name === 'artem' && data.surname === 'lopatkov'


    const sendOrder = () => {

        const {name, surname} = JSON.parse(localStorage.getItem('dataUser'))
        console.log(name)
        console.log(surname)
        dispatch(saveDailyData({
            "firstName": name,
            "lastName": surname,
            "items": order
        }))
    }
    useEffect(() => {
        dispatch(getMenu())
        setInterval(() => {
            dispatch(getMenu())
        }, 10000)
    }, [])


    return (
        <div className={S.body}>
            <button onClick={() => {
                dispatch(setIsLogin())
                localStorage.removeItem('dataUser')
            }}>exit
            </button>
            <div className={S.bodyMenu}>
                {menu.map(el => <Card isAdmin={isAdmin} active={el.active} key={el.name} img={el.image}
                                      name={el.text}/>)}
            </div>
            <div className={S.order} onClick={() => {
                sendOrder()
            }}>Заказать
            </div>
            {isAdmin && <div className={S.adminka}>
                <UploadComponent/>
            </div>}
        </div>
    );
};