import * as React from 'react';
import S from './Card.module.scss'
import {useDispatch} from "react-redux";
import {setChoice} from "../../../store/redux/MenuSlice.jsx";
import axios from "axios";
import {useState} from "react";
import UploadComponent from "./adminComponent/adminComponent.jsx";

export const Card = ({name, img, active, isAdmin}) => {

    const dispatch = useDispatch()
    const setChoiceFunk = (name) => {
        dispatch(setChoice(name))
    }
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:3000/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    return (
        <div className={S.card}>
            <div onClick={() => {
                setChoiceFunk(name)
            }} className={`${S.bodyBorder} ${active && S.active}`}>
                <div className={S.body}>
                    <div className={S.name}>
                        {name}
                    </div>
                    {/*{isAdmin && <div className={S.adminka}>*/}
                    {/*    <UploadComponent/>*/}
                    {/*</div>}*/}
                    <img className={S.img} src={img} alt=""/>
                </div>
            </div>
        </div>
    );
};

