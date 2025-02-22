import * as React from 'react';
import S from './RegistrationPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addUser, getUser, setJob, setName, setSurname} from "../../store/redux/PlayerSlice.jsx";
import {useEffect, useState} from "react";

export const RegistrationPage = () => {
    const nameValue = useSelector(state => state.player.name)
    const surNameValue = useSelector(state => state.player.surname)
    const job = useSelector(state => state.player.job)
    const request = useSelector(state => state.player.request)
    const isLogin = useSelector(state => state.player.isLogin)
    const dispatch = useDispatch()


    function saveObjectToLocalStorage(name, surname, job) {
        try {
            // Создаем объект с тремя полями
            const objectToSave = {
                name: name,
                surname: surname,
                job: job
            };

            // Преобразуем объект в строку JSON
            const jsonObject = JSON.stringify(objectToSave);

            // Сохраняем данные в localStorage
            localStorage.setItem('dataUser', jsonObject);
            console.log('Объект успешно сохранен в localStorage.');
        } catch (error) {
            console.error('Ошибка при сохранении объекта в localStorage:', error);
        }
    }


    const setNameField = (value) => {
        dispatch(setName(value))
    }
    const setSurnameField = (value) => {
        dispatch(setSurname(value))
    }
    const setChecks = (number) => {
        dispatch(setJob(number))
    }
    const addUserFunc = () => {
        dispatch(addUser({firstName: nameValue, lastName: surNameValue, organization: job}))
    }
    const loginFunction = () => {
        dispatch(getUser({firstName: nameValue, lastName: surNameValue}))
    }
    return (
        <div className={S.body}>
            <div className={S.bodyField}>
                <div className={S.error}>{request}</div>
                <div className={S.inputField}>
                    <div className={S.name}>
                        <div className={S.nameText}>ведите свое имя</div>
                        <input value={nameValue} onInput={(el) => {
                            setNameField(el.target.value)
                        }} type="text"/>
                    </div>
                    <div className={S.surname}>
                        <div className={S.surnameText}>
                            введите свою фамилию
                        </div>
                        <input value={surNameValue} onInput={(el) => {
                            setSurnameField(el.target.value)
                        }} type="text"/>
                        <div className={S.checkBoxBody}>
                            <div className={`${S.checkBody} ${job === 'Альтаир' && S.checked} `}>
                                <div onClick={(el) => {
                                    setChecks(el.target.innerText)
                                }}>Альтаир
                                </div>
                            </div>
                            <div className={
                                `${S.checkBody} ${job === 'София' && S.checked} `}>
                                <div onClick={(el) => {

                                    setChecks(el.target.innerText)
                                }}>София
                                </div>
                            </div>
                            <div className={
                                `${S.checkBody} ${job === 'Бейкер' && S.checked} `}>
                                <div onClick={(el) => {
                                    setChecks(el.target.innerText)
                                }}>Бейкер
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className={S.button} onClick={addUserFunc}>Зарегестрироваться</button>
                <button className={S.button} onClick={loginFunction}>Войти</button>
            </div>
        </div>
    );
};